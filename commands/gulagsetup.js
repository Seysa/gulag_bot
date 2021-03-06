const cfg = require(`../utils/config_utils`);
const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `gulagsetup`,
	description: `setups the goulag channel`,
	usage: `\`goulagsetup here\` for the bot to assign the current voice channel as the goulag channel, where the goulag command will place them in, or \`goulagsetup <voice_channel_id>\``,
	permission: permissions.WHITELIST,
	execute(client, message, args) {
		safeDelete(message);
		if (args[0]) {
			// Try to resolve channel id in the server to check if it is a valid ID, if it returns something its valid
			const channel = message.guild.channels.resolve(args[0]);
			// is an ID
			if (channel) {
				message.reply(`Goulag channel is now '${channel.name}'`);
				cfg.writeServerGoulagId(message.guild.id, args[0]);
			}
			else {
				return message.reply(`Couldn't identify voice channel id`);
			}
		}
		else {
			const userInGuild = message.guild.members.resolve(message.author.id);
			const voiceId = userInGuild.voice.channelID;
			if (voiceId) {
				cfg.writeServerGoulagId(message.guild.id, voiceId);
				return message.channel.send(`Goulag channel set at your location (` + userInGuild.voice.channel.name + `)`);
			}
			else {
				return message.reply(`You are not in a voice channel`);
			}
		}
	},
};
