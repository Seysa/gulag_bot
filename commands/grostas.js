const permissions = require(`../utils/permissions`);
const { audioCommandHandler } = require(`../utils/audio_utils`);

module.exports = {
	name: `grostas`,
	description: `not yet implemented`,
	usage: ``,
	permission: permissions.ME,
	async execute(message, args) {
		audioCommandHandler(message, args, `grostas.mp3`);
	},
};
