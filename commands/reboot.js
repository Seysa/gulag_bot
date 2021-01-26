const permissions = require(`../utils/permissions`);
const { reboot } = require(`../utils/up_utils`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `reboot`,
	description: `reboots bot`,
	usage: `\`reboot\`. No arguments`,
	permission: permissions.ME,
	async execute(message, _args) {
		await safeDelete(message);
		reboot();
	},
};
