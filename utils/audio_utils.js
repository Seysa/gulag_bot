const { getRandomInt, safeDelete } = require(`./message_utils`);
const { getUserFromMention } = require(`../utils/message_utils`);

function joinAndPlayAudio(message, audioName) {
	const currentVoiceChannel = message.member.voice.channel.join();
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

function joinAndPlayAudioFromMessage(message, audioName) {
	const channel = message.guild.me.voice.channel;
	if (channel) {
		return message.reply(`Already in a channel, please disconnect me first`);
	}

	if(message.member.voice.channel === null) {
		return message.reply(`You are not in a voice channel`);
	}

	joinAndPlayAudio(message, audioName);
}

function audioCommandHandler(message, args, audioName) {
	safeDelete(message);
	const channel = message.guild.me.voice.channel;
	if (channel) {
		return;
	}
	let channelOfUser = undefined;
	if (args[0]) {
		const targetedUser = message.guild.members.resolve(getUserFromMention(args[0]));
		if (!targetedUser) {
			return message.reply(`Couldn't find user you tagged`);
		}
		channelOfUser = targetedUser.voice.channel;
		if (!channelOfUser) {
			return message.reply(`Target is not in a voice channel`);
		}
	}
	else {
		channelOfUser = message.member.voice.channel;
		if (!channelOfUser) {
			return message.reply(`You are not in a voice channel`);
		}
	}
	joinAndPlayAudioFromMessage(message, audioName);
}

function launchFartAt(message, channelOfUser, times) {
	const currentVoiceChannel = channelOfUser.join();
	currentVoiceChannel.then(connection => {
		const currentAudio = connection.play(`audios/farts/fart_${getRandomInt(5) + 1}.mp3`);
		currentAudio.on(`finish`, () => {
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
	audioCommandHandler:audioCommandHandler,
};
