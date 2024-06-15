import { world, system, BlockPermutation, BlockComponentTypes, Player } from '@minecraft/server';
// import * as GameTest from "@minecraft/server-gametest";

const commandsToRun = [];

function spawnEntity(type, position, dimension = "overworld") {
	return world.getDimension(dimension).spawnEntity(type, position);
}

function spawnParticle(type, position) {
	commandsToRun.push("particle " + type + " " + position.x.toFixed(3) + " " + position.y.toFixed(3) + " " + position.z.toFixed(3));
}

function playSound(id, selector = "@a") {
	commandsToRun.push("playsound " + id + " " + selector);
}

// function spawnSimulatedPlayer(target, callback) {
//   const testClassName = "Jayly";
// 	const testName = "SpawnSimulatedPlayer";

// 	if (!(target instanceof Player)) throw new TypeError("Native type conversion failed.");

// 	GameTest.registerAsync(testClassName, testName, async function (test) {
// 		let simulatedplayer = test.spawnSimulatedPlayer({ x: 0, y: 1, z: 0, });
// 		simulatedplayer.despawn = () => test.removeSimulatedPlayer(simulatedplayer);
// 		callback(simulatedplayer);
// 	})
// 		.structureName("DebugTests:always_succeed")
// 		.tag(GameTest.Tags.suiteDefault)
// 		.maxTicks(0x7fffffff);
// 	target.runCommandAsync(`gametest run ${testClassName}:${testName}`);
// }

function updateCommands() {
	for (let command of commandsToRun) {
		world.getDimension("overworld").runCommand(command);
	}

	commandsToRun.length = 0;
}

export { spawnEntity, spawnParticle, updateCommands, playSound, spawnSimulatedPlayer };