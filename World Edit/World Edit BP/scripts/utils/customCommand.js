import { world, system } from '@minecraft/server';
import { PlayerHelper } from "./PlayerHelper.js";

const customCommands = {
	commands: {
		list: function (player) {
			player.sendMessage("Commands: ");
			for (let key in customCommands.commands) player.sendMessage("" + key);
		}
	},
	commandPrefix: "!"
};

function registerCustomCommand(name, callback) {
	customCommands.commands[name] = callback;
}

function setCommandPrefix(prefix) {
	customCommands.commandPrefix = ("" + (prefix || "!")) || "!";
}

world.beforeEvents.chatSend.subscribe((eventData) => {
	const player = eventData.sender;
	const message = eventData.message;
	const command = message.split(" ")[0];
	for (let commandName in customCommands.commands) {
		if (customCommands.commandPrefix + commandName == command) {
			eventData.cancel = true;
			
			system.run(() => customCommands.commands[commandName](new PlayerHelper(player), message.split(" ")));

			return;
		}
	}

	if (eventData.cancel) return;

	eventData.cancel = true;
	world.sendMessage("<" + eventData.sender.nameTag + "§r§f> " + eventData.message);
});

export { registerCustomCommand, setCommandPrefix };