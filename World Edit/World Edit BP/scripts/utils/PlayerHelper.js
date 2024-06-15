import { world, system, Player } from '@minecraft/server';
import { EntityHelper } from "./EntityHelper.js";

function parsePlayers(players) {
	return players.map((player) => new PlayerHelper(player));
}

class PlayerHelper extends EntityHelper {
	constructor(player) {
		super(player);
	}

	get camera() { return this.entity.camera; }
	get isEmoting() { return this.entity.isEmoting; }
	get isFlying() { return this.entity.isFlying; }
	get isGliding() { return this.entity.isGliding; }
	get isJumping() { return this.entity.isJumping; }
	get level() { return this.entity.level; }
	get name() { return this.entity.name; }
	get onScreenDisplay() { return this.entity.onScreenDisplay; }
	get totalXpNeededForNextLevel() { return this.entity.totalXpNeededForNextLevel; }
	get xpEarnedAtCurrentLevel() { return this.entity.xpEarnedAtCurrentLevel; }

	addExperience(amount) { return this.entity.addExperience(amount); }
	addLevels(amount) { return this.entity.addLevels(amount); }
	getTotalXp() { return this.entity.getTotalXp(); }
	resetLevel() { this.entity.resetLevel(); }

	get spawnPoint() { return this.getSpawnPoint(); }
	set spawnPoint(spawnPoint) { this.setSpawnPoint(spawnPoint); }
	getSpawnPoint() { return this.entity.getSpawnPoint(); }
	setSpawnPoint(spawnPoint) { this.entity.setSpawnPoint(spawnPoint); }
	
	playMusic(trackId, musicOptions = null) { this.entity.playMusic(trackId, musicOptions); }
	queueMusic(trackId, musicOptions = null) { this.entity.queueMusic(trackId, musicOptions); }
	stopMusic() { this.entity.stopMusic(); }

	playSound(soundId, soundOptions = null) { this.entity.playSound(soundId, soundOptions); }

	sendMessage(message) { this.entity.sendMessage(message); }


	// Beta
	get inputPermissions() { return this.entity.inputPermissions; }
	setInputPermission(permission, value) {
		switch (permission) {
			case "camera":
				this.inputPermissions.cameraEnabled = value;
				break;
			case "movement":
				this.inputPermissions.movementEnabled = value;
				break;
		}
	}
	getInputPermission(permission) {
		switch (permission) {
			case "camera":
				return this.inputPermissions.cameraEnabled;
			case "movement":
				return this.inputPermissions.movementEnabled;
		}

		return null;
	}

	get selectedSlotIndex() { return this.entity.selectedSlotIndex; }
	set selectedSlotIndex(value) { return this.entity.selectedSlotIndex = value; }

	set gameMode(value) { return this.setGameMode(value); }
	get gameMode() { return this.getGameMode(); }
	setGameMode(value) { return this.entity.setGameMode(value); }
	getGameMode() { return this.entity.getGameMode(); }

	get op() { return this.isOp(); }
	set op(value) { this.setOp(value); }
	isOp() { return this.entity.isOp(); }
	setOp(value) { this.entity.setOp(value); }

	eatItem(itemStack) { this.entity.eatItem(itemStack); }

	postClientMessage(id, value) { this.entity.postClientMessage(id, value); }

	spawnParticle(effectName, location, molangVariables = null) { this.entity.spawnParticle(effectName, location, molangVariables); }

	getItemCooldown(cooldownCategory) { return this.entity.getItemCooldown(cooldownCategory); }
	startItemCooldown(cooldownCategory, tickDuration) { this.entity.startItemCooldown(cooldownCategory, tickDuration); }
}

export { PlayerHelper, parsePlayers };