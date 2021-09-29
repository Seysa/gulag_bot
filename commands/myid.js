const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `myid`,
	description: `shows user id`,
	usage: `\`myid\`. No arguments`,
	permission: permissions.NONE,
	async execute(client, message, _args) {
		safeDelete(message);
		await message.reply(`Your id is ` + message.author.id);
	},
};
