const permissions = require(`../utils/permissions`);
const { audioCommandHandler } = require(`../utils/audio_utils`);

module.exports = {
	name: `merci`,
	description: `Makes the bot sing merci aux clients fidèles`,
	usage: `\`merci\` or \`merci @user\``,
	permission: permissions.NONE,
	execute(client, message, args) {
		audioCommandHandler(message, args, `merci.mp3`);
	},
};
