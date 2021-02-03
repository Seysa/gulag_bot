const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `myid`,
	description: `shows user id`,
	usage: `\`myid\`. No arguments`,
	permission: permissions.NONE,
	execute(client, message, _args) {
		safeDelete(message);
		message.reply(`Your id is ` + message.author.id);
	},
};
