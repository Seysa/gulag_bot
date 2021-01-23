const { joinAndPlayAudioFromMessage } = require(`../utils/audio_utils`);
const permissions = require(`../utils/permissions`);

module.exports = {
	name: `anthem`,
	description: `Plays the russian anthem into your channel`,
	usage: `\`anthem\`. You need to be in a voice channel`,
	permission: permissions.WHITELIST,
	execute(message, _args) {
		joinAndPlayAudioFromMessage(
			message,
			`anthem.mp3`,
			() => message.channel.send(`Starting anthem`),
			() => message.channel.send(`Ending anthem`),
		);
	},
};
