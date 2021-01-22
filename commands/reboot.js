const { exit } = require('process');
const permissions = require('../utils/permissions');
const { reboot } = require('../utils/up_utils');

module.exports = {
	name: 'reboot',
	description: 'reboots bot',
	usage: '`reboot`. No arguments',
	permission: permissions.ME,
	async execute(message, _args) {
		await message.delete();
		reboot();
	},
};
