const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `disconnect`,
	description: `Disconnects the bot from current voice channel`,
	usage: `\`disconnect\`. Bot needs to be in a voice channel. This command may not work if the bot crashed recently, in this case the bot will disconnect by himself after some time`,
	permission: permissions.WHITELIST,
	execute(client, message, _args) {
		safeDelete(message);
		const channel = message.guild.me.voice.channel;
		if (channel) {
			channel.leave();
		}
		else {
			message.channel.send(`I am not in a voice channel`);
		}
	},
};
