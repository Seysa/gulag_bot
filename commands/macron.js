const permissions = require('../utils/permissions');
const { joinAndPlayAudioFromMessage } = require('../utils/audio_utils');

module.exports = {
	name: 'macron',
	description: 'plays macron explosion in your channel',
	usage: '`macron`. You need to be in a voice channel.',
	permission: permissions.NONE,
	execute(message, _args) {
		joinAndPlayAudioFromMessage(
			message,
			'macron_explosion.mp3',
			() => message.channel.send('Starting explosion'),
			() => message.channel.send('Ending explosion'),
		);
	},
};
