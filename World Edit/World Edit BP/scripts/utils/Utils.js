const Utils = {
	rad2deg: function(angle) {
		return angle * (180 / Math.PI);
	},

	deg2rad: function(angle) {
		return angle * (Math.PI / 180);
	},

	wrap: function(x, a, b) {
		return Utils.mod(x - a, b - a) + a;
	},

	lerp: function(a, b, t) {
		return (b - a) * t + a;
	},

	random: function(a, b) {
		let min = 0;
		let max = 0;
		if (b) {
			min = a;
			max = b
		} else {
			max = a;
		}
		return (Math.random() * (max - min)) + min;
	},

	mod: function(a, b) {
		var c = a;
		while (c > b) {
			c -= b;
		}
		while (c < 0) {
			c += b;
		}
		return c;
	},

	clamp: function(x, a, b) {
		return Math.min(Math.max(x, Math.min(a, b)), Math.max(a, b));
	},

	average: function() {
		return ([...arguments].reduce((a, b) => a + b, 0)) / arguments.length;
	}
}

export default Utils;