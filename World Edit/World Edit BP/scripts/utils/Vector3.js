import Utils from "./Utils.js";

export default class Vector3 {
	constructor(x, y, z) {
		if (typeof x == "object") {
			this.x = x.x ?? 0;
			this.y = x.y ?? 0;
			this.z = x.z ?? 0;
		} else {
			this.x = x ?? 0;
			this.y = y ?? 0;
			this.z = z ?? 0;
		}
	}

// Setting
	set(x, y, z) {
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;

		return this;
	}

	setX(x) {
		this.x = x;

		return this;
	}

	setY(y) {
		this.y = y;

		return this;
	}

	setZ(z) {
		this.x = z;

		return this;
	}

// Standard
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;

		return this;
	}

	subtract(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		this.z -= vector.z;

		return this;
	}

	multiply(vector) {
		this.x *= vector.x;
		this.y *= vector.y;
		this.z *= vector.z;

		return this;
	}

	divide(vector) {
		this.x /= vector.x;
		this.y /= vector.y;
		this.z /= vector.z;

		return this;
	}

// Scalars
	multiplyScalar(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;
	}

	divideScalar(scalar) {
		if (scalar == 0) {
			this.x = 0;
			this.y = 0;
			this.z = 0;

			return this;
		}

		this.x /= scalar;
		this.y /= scalar;
		this.z /= scalar;

		return this;
	}

// Scaled
	addScaledVector(vector, scale) {
		this.x += vector.x * scale;
		this.y += vector.y * scale;
		this.z += vector.z * scale;

		return this;
	}
	
	subtractScaledVector(vector, scale) {
		this.x -= vector.x * scale;
		this.y -= vector.y * scale;
		this.z -= vector.z * scale;

		return this;
	}

// New Vector
	added(vector) {
		return new Vector3(
			this.x + vector.x,
			this.y + vector.y,
			this.z + vector.z,
		);
	}

	subtracted(vector) {
		return new Vector3(
			this.x - vector.x,
			this.y - vector.y,
			this.z - vector.z,
		);
	}

	multiplied(vector) {
		return new Vector3(
			this.x * vector.x,
			this.y * vector.y,
			this.z * vector.z,
		);
	}

	divided(vector) {
		return new Vector3(
			this.x / vector.x,
			this.y / vector.y,
			this.z / vector.z,
		);
	}

// New Vector Values
	addedValues(x, y, z) {
		return new Vector3(
			this.x + x,
			this.y + y,
			this.z + z
		);
	}

// New Vector Scalar
	multipliedScalar(scalar) {
		return new Vector3(
			this.x * scalar,
			this.y * scalar,
			this.z * scalar
		);
	}

	dividedScalar(scalar) {
		if (scalar == 0) return new Vector3(0, 0, 0);

		return new Vector3(
			this.x / scalar,
			this.y / scalar,
			this.z / scalar
		);
	}

// Math
	normalize() {
		return this.setLength(1);
	}

	normalized() {
		const length = this.length();

		if (length == 0) return new Vector3();

		return new Vector3(
			this.x / length,
			this.y / length,
			this.z / length,
		);
	}

	distanceTo(vector) {
		return Math.sqrt((this.x - vector.x) ** 2 + (this.y - vector.y) ** 2 + (this.z - vector.z) ** 2);
	}

	distance2dTo(vector) {
		return Math.sqrt((this.x - vector.x) ** 2 + (this.z - vector.z) ** 2);
	}

	length() {
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
	}

	dot(vector) {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	}

	lerp(to, weight) {
		this.x = Utils.lerp(this.x, to.x, weight);
		this.y = Utils.lerp(this.y, to.y, weight);
		this.z = Utils.lerp(this.z, to.z, weight);

		return this;
	}

	lerpVectors(a, b, weight) {
		this.x = Utils.lerp(a.x, b.x, weight);
		this.y = Utils.lerp(a.y, b.y, weight);
		this.z = Utils.lerp(a.z, b.z, weight);

		return this;
	}

	copy(vector) {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;

		return this;
	}

	setLength(toLength) {
		const length = this.length();

		if (length == 0) return;

		this.x = this.x / length * toLength;
		this.y = this.y / length * toLength;
		this.z = this.z / length * toLength;

		return this;
	}

	clampLength(min, max) {
		const length = this.length();

		if (length < min) this.setLength(min);
		if (length > max) this.setLength(max);

		return this;
	}

	clone() {
		return new Vector3(this.x, this.y, this.z);
	}

	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);

		return this;
	}
}

Vector3.UP   = new Vector3(0, 1, 0);
Vector3.DOWN = new Vector3(0, -1, 0);

Vector3.from = function (vector) {
	return new Vector3(vector?.x, vector?.y, vector?.z);
}