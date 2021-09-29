const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `bold`,
	description: `returns text underlined and bold`,
	usage: `\`usage <text>\` this command needs an argument, which is the text you want underlined and in bold`,
	permission: permissions.NONE,
	async execute(client, message, args) {
		await safeDelete(message);
		if (args[0]) {
			await message.channel.send(`__**${args.join(` `)}**__`);
		}
		else {
			await message.reply(`Bold needs an argument`);
		}
	},
};
