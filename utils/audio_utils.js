const { getRandomInt } = require('./message_utils');

function joinAndPlayAudio(voiceChannel, audioName, onStart, onFinish) {
	const currentVoiceChannel = voiceChannel.join();
	currentVoiceChannel.then(connection => {
		const currentAudio = connection.play(`audios/${audioName}`);
		currentAudio.on('start', onStart);
		currentAudio.on('finish', () => {
			currentAudio.destroy();
			if (voiceChannel) {
				voiceChannel.leave();
			}
			onFinish();
		});
	});
}

function joinAndPlayAudioFromMessage(message, audioName, onStart, onFinish) {
	const channel = message.guild.me.voice.channel;
	if (channel) {
		return message.reply('Already in a channel, please disconnect me first');
	}

	if(message.member.voice.channel === null) {
		return message.reply('You are not in a voice channel');
	}

	joinAndPlayAudio(message.member.voice.channel, audioName, onStart, onFinish);
}

function launchFartAt(message, channelOfUser, times) {
	const currentVoiceChannel = channelOfUser.join();
	currentVoiceChannel.then(connection => {
		const currentAudio = connection.play(`audios/farts/fart_${getRandomInt(5) + 1}.mp3`);
		currentAudio.on('finish', () => {
			times = times - 1;
			if (currentAudio) { currentAudio.destroy(); }
			if (times) {
				// eslint-disable-next-line no-unused-vars
				launchFartAt(message, channelOfUser, times);
			}
			else {
				const channel = message.guild.me.voice.channel;
				if (channel) { channel.leave(); }
			}
		});
	});
}

module.exports = {
	joinAndPlayAudio:joinAndPlayAudio,
	joinAndPlayAudioFromMessage:joinAndPlayAudioFromMessage,
	launchFartAt:launchFartAt,
};