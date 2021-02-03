const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `sleepytime`,
	description: `not yet implemented`,
	usage: ``,
	permission: permissions.ME,
	execute(client, message, _args) {
		safeDelete(message);
		message.reply(`Command sleepytime is not implemented yet`);
	},
};