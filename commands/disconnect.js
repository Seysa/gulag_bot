const permissions = require('../utils/permissions');

module.exports = {
	name: 'disconnect',
	description: 'Disconnects the bot from current voice channel',
	usage: '`disconnect`. Bot needs to be in a voice channel. This command may not work if the bot crashed recently, in this case the bot will disconnect by himself after some time',
	permission: permissions.WHITELIST,
	execute(message, _args) {
		const channel = message.guild.me.voice.channel;
		if (channel) {
			message.channel.send(`Leaving channel "${channel.name}"`);
			channel.leave();
		}
	},
};
