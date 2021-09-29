const cfg = require(`../utils/config_utils`);
const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `serverinfo`,
	description: `gives current server info the bot has`,
	usage: `\`serverinfo\`. No arguments`,
	permission: permissions.WHITELIST,
	async execute(client, message, _args) {
		safeDelete(message);
		const config = cfg.getConfigObject();
		for (const server of config.servers) {
			if (server.id === message.guild.id) {
				return await message.author.send(`\`\`\`json\n${JSON.stringify(server, null, 2)}\`\`\``);
			}
		}
		await message.reply(`Your server is not configurated yet`);
	},
};