import { world, system, BlockPermutation } from "@minecraft/server";
import { MinecraftBlockTypes } from "vanilla.js";
import Vector3 from "utils/Vector3.js";
import { registerCustomCommand } from "utils/customCommand.js";
import config from "config.js";

world.beforeEvents.playerBreakBlock.subscribe((event) => {
	if (!event.itemStack) return;
	if (event.itemStack.typeId != "minecraft:wooden_axe") return;

	event.cancel = true;

	const location = event.block.location;
	event.player.setDynamicProperty("editStart", location);
	event.player.sendMessage("Set start position.");
});

world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
	if (!event.itemStack) return;
	if (event.itemStack.typeId != "minecraft:wooden_axe") return;

	event.cancel = true;

	const location = event.block.location;
	event.player.setDynamicProperty("editEnd", location);
	event.player.sendMessage("Set end position.");
});

function getAxisOfDirection(direction) {
	let x = Math.abs(direction.x);
	let y = Math.abs(direction.y);
	let z = Math.abs(direction.z);
	let max = Math.max(x, y, z);

	if (x == max) return new Vector3(Math.sign(direction.x), 0, 0);
	if (y == max) return new Vector3(0, Math.sign(direction.y), 0);
	if (z == max) return new Vector3(0, 0, Math.sign(direction.z));

	return new Vector3(0, 0, 0);
}

function parseError(message) {
	return "§c" + message;
}

registerCustomCommand("clearsel", function (player, args) {
	player.setDynamicProperty("editStart", undefined);
	player.setDynamicProperty("editEnd", undefined);
});

registerCustomCommand("pos1", function (player, args) {
	player.setDynamicProperty("editStart", Vector3.from(player.location).floor());
});

registerCustomCommand("pos2", function (player, args) {
	player.setDynamicProperty("editEnd", Vector3.from(player.location).floor());
});

registerCustomCommand("stack", function (player, args) {
	if (args.length < 2) {
		player.sendMessage("Canceling stack...");
		return;
	}

	const start = player.getDynamicProperty("editStart");
	const end   = player.getDynamicProperty("editEnd");
	const min = new Vector3(
		Math.min(start.x, end.x),
		Math.min(start.y, end.y),
		Math.min(start.z, end.z),
	);
	const max = new Vector3(
		Math.max(start.x, end.x),
		Math.max(start.y, end.y),
		Math.max(start.z, end.z)
	);
	const size = max.subtracted(min);
	size.x += 1;
	size.y += 1;
	size.z += 1;
	const stackCount = +args[1];

	if (stackCount > config.MAX_STACK_COUNT) {
		player.sendMessage(parseError("stackCount exceed the max stack count of " + config.MAX_STACK_COUNT + "."));
		return;
	}

	if (start == undefined || end == undefined) return;

	const direction = getAxisOfDirection(player.getViewDirection());
	const dimension = player.dimension;
	const toMin = min.clone();
	const offset = size.multiplied(direction);
	for (let i = 0; i < stackCount; i++) {
		toMin.add(offset);
		for (let x = 0; x < size.x; x++) {
			for (let y = 0; y < size.y; y++) {
				for (let z = 0; z < size.z; z++) {
					dimension.setBlockPermutation(
						{
							x: toMin.x + x,
							y: toMin.y + y,
							z: toMin.z + z,
						},
						dimension.getBlock({
							x: min.x + x,
							y: min.y + y,
							z: min.z + z,
						}).permutation
					);
				}
			}
		}
	}
});

registerCustomCommand("move", function (player, args) {
	if (args.length < 2) {
		player.sendMessage("Canceling move...");
		return;
	}

	const start = player.getDynamicProperty("editStart");
	const end   = player.getDynamicProperty("editEnd");
	const min = new Vector3(
		Math.min(start.x, end.x),
		Math.min(start.y, end.y),
		Math.min(start.z, end.z),
	);
	const max = new Vector3(
		Math.max(start.x, end.x),
		Math.max(start.y, end.y),
		Math.max(start.z, end.z)
	);
	const size = max.subtracted(min);
	size.x += 1;
	size.y += 1;
	size.z += 1;
	const moveCount = +args[1];

	if (start == undefined || end == undefined) return;

	const direction = getAxisOfDirection(player.getViewDirection());
	const dimension = player.dimension;
	const toMin = min.clone();
	const offset = direction.multipliedScalar(moveCount);
	toMin.add(offset);

	const permutations = [];

	for (let x = 0; x < size.x; x++) {
		for (let y = 0; y < size.y; y++) {
			for (let z = 0; z < size.z; z++) {
				permutations.push(dimension.getBlock({
					x: min.x + x,
					y: min.y + y,
					z: min.z + z,
				}).permutation);
				dimension.setBlockType(
					{
						x: min.x + x,
						y: min.y + y,
						z: min.z + z,
					},
					"minecraft:air"
				);
			}
		}
	}

	for (let x = 0; x < size.x; x++) {
		for (let y = 0; y < size.y; y++) {
			for (let z = 0; z < size.z; z++) {
				dimension.setBlockPermutation(
					{
						x: toMin.x + x,
						y: toMin.y + y,
						z: toMin.z + z,
					},
					permutations.shift()
				);
			}
		}
	}

	start.x += offset.x;
	start.y += offset.y;
	start.z += offset.z;
	end.x += offset.x;
	end.y += offset.y;
	end.z += offset.z;

	player.setDynamicProperty("editStart", start);
	player.setDynamicProperty("editEnd", end);
});

system.runInterval(() => {
	const players = world.getAllPlayers();

	for (let player of players) {
		const start = player.getDynamicProperty("editStart");
		const end   = player.getDynamicProperty("editEnd");

		if (start == undefined || end == undefined) continue;

		let delay = player.getDynamicProperty("editDelay") ?? 0;
		delay--;
		player.setDynamicProperty("editDelay", delay);

		if (delay <= 0) {
			player.setDynamicProperty("editDelay", 20);
		} else {
			continue;
		}

		const min = {
			x: Math.min(start.x, end.x),
			y: Math.min(start.y, end.y),
			z: Math.min(start.z, end.z),
		};
		const max = {
			x: Math.max(start.x, end.x) + 1,
			y: Math.max(start.y, end.y) + 1,
			z: Math.max(start.z, end.z) + 1
		};

		for (let x = min.x; x <= max.x; x++) {
			player.spawnParticle("we:selection", {
				x: x,
				y: min.y,
				z: min.z
			});
			player.spawnParticle("we:selection", {
				x: x,
				y: min.y,
				z: max.z
			});
			player.spawnParticle("we:selection", {
				x: x,
				y: max.y,
				z: min.z
			});
			player.spawnParticle("we:selection", {
				x: x,
				y: max.y,
				z: max.z
			});
		}
		for (let y = min.y; y <= max.y; y++) {
			player.spawnParticle("we:selection", {
				x: min.x,
				y: y,
				z: min.z
			});
			player.spawnParticle("we:selection", {
				x: min.x,
				y: y,
				z: max.z
			});
			player.spawnParticle("we:selection", {
				x: max.x,
				y: y,
				z: min.z
			});
			player.spawnParticle("we:selection", {
				x: max.x,
				y: y,
				z: max.z
			});
		}
		for (let z = min.z; z <= max.z; z++) {
			player.spawnParticle("we:selection", {
				x: min.x,
				y: min.y,
				z: z
			});
			player.spawnParticle("we:selection", {
				x: min.x,
				y: max.y,
				z: z
			});
			player.spawnParticle("we:selection", {
				x: max.x,
				y: min.y,
				z: z
			});
			player.spawnParticle("we:selection", {
				x: max.x,
				y: max.y,
				z: z
			});
		}
	}
});