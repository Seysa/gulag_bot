const permissions = require(`../utils/permissions`);
const { getUserFromMention } = require(`../utils/message_utils`);
const { safeDelete } = require(`../utils/message_utils`);
module.exports = {
	name: `avatar`,
	description: `Gets the avatar of the tagged user`,
	usage: `\`avatar\` to get your own avatar or \`avatar @user\` to get the avatar of the tagged user`,
	permission: permissions.NONE,
	execute(message, args) {
		safeDelete(message);
		if (args[0]) {
			const user = getUserFromMention(args[0]);
			if (!user) {
				message.reply(`Please use a proper mention if you want to see someone elses avatar.`);
			}
			return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		}
		message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
	},
};
