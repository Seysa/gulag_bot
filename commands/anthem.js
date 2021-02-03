const permissions = require(`../utils/permissions`);
const { audioCommandHandler } = require(`../utils/audio_utils`);

module.exports = {
	name: `anthem`,
	description: `Plays the russian anthem into your channel`,
	usage: `\`anthem\`. You need to be in a voice channel`,
	permission: permissions.WHITELIST,
	async execute(client, message, args) {
		audioCommandHandler(message, args, `anthem.mp3`);
	},
};
