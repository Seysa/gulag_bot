const { getUserFromMention } = require('../utils/message_utils');
const { launchFartAt } = require('../utils/audio_utils');
const permissions = require('../utils/permissions');


module.exports = {
	name: 'fart',
	description: 'makes the bot fart into your channel',
	usage: '`fart` to make the bot fart into your voice channel, `fart @user` to make the bot fart in the voice channel of the user.\n' +
		'`fart @user <times>` to make the bot fart the given number of times in tagged user\'s voice channel.\n' +
		'The \'victim\' needs to be in a voice channel',
	permission: permissions.NONE,
	execute(message, args) {
		const channel = message.guild.me.voice.channel;
		if (channel) {
			message.delete();
			return;
		}
		let channelOfUser = undefined;
		if (args[0]) {
			const targetedUser = message.guild.members.resolve(getUserFromMention(args[0]));
			if (!targetedUser) {
				return message.reply('Couldn\'t find user you tagged');
			}
			channelOfUser = targetedUser.voice.channel;
			if (!channelOfUser) {
				return message.reply('Target is not in a voice channel');
			}
		}
		else {
			channelOfUser = message.member.voice.channel;
			if (!channelOfUser) {
				return message.reply('You are not in a voice channel');
			}
		}
		message.delete();

		let times = 1;
		if (args[1]) {
			times = parseInt(args[1]);
			// if letters and couldnt parse any int
			if (!times) {
				return message.reply('Invalid parameter ' + args[1]);
			}
			if (times < 0 || times > 10) {
				return message.reply('Invalid times (must be over 0 or under 10)');
			}
		}

		launchFartAt(message, channelOfUser, times);
	},
};
