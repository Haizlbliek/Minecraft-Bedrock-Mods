import { world, system, Entity, EntityComponentTypes } from '@minecraft/server';
import Vector3 from "./Vector3.js";

class EntityHelper {
	constructor(entity) {
		this.entity = entity;
	}

	get dimension() { return this.entity.dimension; }
	get id() { return this.entity.id; }
	get typeId() { return this.entity.typeId; }
	get scoreboardIdentity() { return this.entity.scoreboardIdentity; }

	get location() { return Vector3.from(this.entity.location); }
	get position() { return Vector3.from(this.entity.location); }

	get nameTag() { return this.entity.nameTag; }
	set nameTag(value) { return this.entity.nameTag = value; }

	get isClimbing()  { return this.entity.isClimbing;  }
	get isFalling()   { return this.entity.isFalling;   }
	get isInWater()   { return this.entity.isInWater;   }
	get isOnGround()  { return this.entity.isOnGround;  }
	get isSleeping()  { return this.entity.isSleeping;  }
	get isSprinting() { return this.entity.isSprinting; }
	get isSwimming()  { return this.entity.isSwimming;  }

	get isSneaking() { return this.entity.isSneaking; }
	set isSneaking(value) { return this.entity.isSneaking = value; }

	addEffect(effectType, duration, options = null) { return this.entity.addEffect(effectType, duration, options); }
	addTag(tag) { return this.entity.addTag(tag); }
	applyDamage(amount, options = null) { return this.entity.applyDamage(amount, options); }
	applyKnockback(directionX, directionZ, horizontalStrength, verticalStrength) { this.entity.applyKnockback(directionX, directionZ, horizontalStrength, verticalStrength); }
	clearDynamicProperties() { this.entity.clearDynamicProperties(); }
	extinguishFire(useEffects = true) { return this.entity.extinguishFire(useEffects); }
	getBlockFromViewDirection(options = null) { return this.entity.getBlockFromViewDirection(options); }
	getComponent(componentId) { return this.entity.getComponent(componentId); }
	getComponents() { return this.entity.getComponents(); }
	getDynamicProperty(identifier) { return this.entity.getDynamicProperty(identifier); }
	getDynamicPropertyIds() { return this.entity.getDynamicPropertyIds(); }
	getDynamicPropertyTotalByteCount() { return this.entity.getDynamicPropertyTotalByteCount(); }
	getEffect(effect) { return this.entity.getEffect(effect); }
	getEffects() { return this.entity.getEffects(); }
	getEntitiesFromViewDirection(options = null) { return this.entity.getEntitiesFromViewDirection(options); }
	getHeadLocation() { return Vector3.from(this.entity.getheadLocation()); }
	getProperty(identifier) { return this.entity.getProperty(identifier); }
	getTags() { return this.entity.getTags(); }
	getViewDirection() { return Vector3.from(this.entity.getViewDirection()); }
	hasComponent(componentId) { return this.entity.hasComponent(componentId); }
	hasTag(tag) { return this.entity.hasTag(tag); }
	matches(options) { return this.entity.matches(options); }
	playAnimation(animationName, options = null) { this.entity.playAnimation(animationName, options); }
	removeEffect(effect) { return this.entity.removeEffect(effect); }
	removeTag(tag) { return this.entity.removeTag(tag); }
	resetProperty(identifier) { return this.entity.resetProperty(identifier); }
	setDynamicProperty(identifier, value) { this.entity.setDynamicProperty(identifier, value); }
	setOnFire(seconds, useEffects = true) { this.entity.setOnFire(seconds, useEffects); }
	setProperty(identifier, value) { this.entity.setProperty(identifier, value) }
	teleport(location, teleportOptions = null) { this.entity.teleport(location, teleportOptions); }
	triggerEvent(eventName) { this.entity.triggerEvent(eventName); }
	tryTeleport(location, teleportOptions = null) { return this.entity.tryTeleport(location, teleportOptions); }

	get valid() { return this.isValid(); }
	get invalid() { return this.isInvalid(); }
	isValid() { return this.entity.isValid(); }
	isInvalid() { return !this.entity.isValid(); }

	get velocity() { return this.getVelocity(); }
	clearVelocity() { this.entity.clearVelocity(); }
	getVelocity() { return Vector3.from(this.entity.getVelocity()); }
	applyImpulse(vector) { this.entity.applyImpulse(vector); }

	get rotation() { return this.getRotation(); }
	set rotation(value) { this.setRotation(value); }
	getRotation() { return this.entity.getRotation(); }
	setRotation(rotation) { this.entity.setRotation(rotation); }

	kill() { return this.entity.kill(); }
	remove() { this.entity.remove(); }

	runCommand(commandString) { return this.entity.runCommand(commandString); }
	runCommandAsync(commandString) { return this.entity.runCommandAsync(commandString); }

	// Custom
	get nextLocation() {
		return this.location.added(this.velocity);
	}

	get inventory() { // TODO: Verify
		return this.entity.getComponent(EntityComponentTypes.Inventory);
	}

	getMainHandItem() { // TODO: Verify
  	const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
  	const mainHandItem = equipmentCompPlayer.getEquipment(EquipmentSlot.Mainhand)?.typeId ?? "minecraft:air";

  	return mainHandItem;
	}

	// Beta
	get fallDistance() { return this.entity.fallDistance; }
	get lifetimeState() { return this.entity.lifetimeState; }
	get target() { return new EntityHelper(this.entity.target); }
}

export { EntityHelper };