const cfg = require('../utils/config_utils');
const permissions = require('../utils/permissions');

module.exports = {
	name: 'serverinfo',
	description: 'gives current server info the bot has',
	usage: '`serverinfo`. No arguments',
	permission: permissions.WHITELIST,
	execute(message, _args) {
		const config = cfg.getConfigObject();
		for (const server of config.servers) {
			if (server.id === message.guild.id) {
				return message.channel.send(`\`\`\`json\n${JSON.stringify(server, null, 2)}\`\`\``);
			}
		}
		message.reply('Your server is not configurated yet');
	},
};