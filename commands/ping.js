const permissions = require(`../utils/permissions`);

module.exports = {
	name: `ping`,
	description: `tests if the bot is online`,
	usage: `\`ping\`. No arguments`,
	permission: permissions.NONE,
	execute(message, _args) {
		message.reply(`pong`);
	},
};