const permissions = require(`../utils/permissions`);

module.exports = {
	name: `ping`,
	description: `tests if the bot is online`,
	usage: `\`ping\`. No arguments`,
	permission: permissions.NONE,
	async execute(client, message, _args) {
		const msg = await message.channel.send(`🏓 Pinging....`);
		msg.edit(`🏓 Pong!
        Ping is ${Math.round(client.ws.ping)}ms`);
	},
};