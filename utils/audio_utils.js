const { safeDelete, getIdFromMention } = require(`./message_utils`);

function joinAndPlayAudio(message, voiceChannel, audioName) {
	const currentVoiceChannel = voiceChannel.join();
	currentVoiceChannel.then(connection => {
		const currentAudio = connection.play(`audios/${audioName}`);
		currentAudio.on(`finish`, () => {
			const channel = message.guild.me.voice.channel;
			if (channel) {
				channel.leave();
			}
			if(currentAudio) {
				currentAudio.destroy();
			}
		});
	});
}

function audioCommandHandler(message, args, audioName) {
	safeDelete(message);

	// If bot is already in a voice channel
	const channel = message.guild.me.voice.channel;
	if (channel) {
		return message.reply(`Already in a channel, please disconnect me first`);
	}

	// If there is an argument, it's a tagged user
	if (args[0]) {
		const taggedId = getIdFromMention(args[0]) || args[0];
		const user = message.guild.members.resolve(taggedId);
		if(!user) {
			return message.reply(`Couldn't find the user you specified, try again`);
		}
		joinAndPlayAudio(message, user.voice.channel, audioName);
	}
	// else join author
	else {
		const voiceChannel = message.member.voice.channel;
		if(voiceChannel === null) {
			return message.reply(`You are not in a voice channel`);
		}
		else {
			joinAndPlayAudio(message, message.member.voice.channel, audioName);
		}
	}
}

module.exports = {
	joinAndPlayAudio:joinAndPlayAudio,
	audioCommandHandler:audioCommandHandler,
};
