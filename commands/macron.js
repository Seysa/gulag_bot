const permissions = require(`../utils/permissions`);
const { audioCommandHandler } = require(`../utils/audio_utils`);

module.exports = {
	name: `macron`,
	description: `plays macron explosion in your channel`,
	usage: `\`macron\`. You need to be in a voice channel.`,
	permission: permissions.NONE,
	execute(message, _args) {
		audioCommandHandler(message, _args, `macron_explosion.mp3`);
	},
};
