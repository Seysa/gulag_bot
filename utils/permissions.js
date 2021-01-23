module.exports = {
	NONE: 0,
	WHITELIST: 1,
	ADMIN: 2,
	ME: 3,
	values: [0, 1, 2, 3],
	getName: function(permissionNumber) {
		switch(permissionNumber) {
		case 0:
			return `no`;
		case 1:
			return `whitelist`;
		case 2:
			return `admin`;
		case 3:
			return `dev`;
		default:
			return `invalid number`;
		}
	},
};