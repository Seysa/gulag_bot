const permissions = require(`../utils/permissions`);
const { audioCommandHandler } = require(`../utils/audio_utils`);

module.exports = {
	name: `grostas`,
	description: `makes the bot say gros tas`,
	usage: `\`grostas\` or \`grostas @user\`. Yourself or your target needs to be in a voice channel`,
	permission: permissions.NONE,
	async execute(message, args) {
		audioCommandHandler(message, args, `grostas.mp3`);
	},
};
