const permissions = require(`../utils/permissions`);

module.exports = {
	name: `sleepytime`,
	description: `not yet implemented`,
	usage: ``,
	permission: permissions.ME,
	execute(message, _args) {
		message.reply(`Command sleepytime is not implemented yet`);
	},
};