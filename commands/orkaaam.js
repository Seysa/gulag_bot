const permissions = require(`../utils/permissions`);
const { audioCommandHandler } = require(`../utils/audio_utils`);
const fs = require(`fs`);
const { getRandomInt } = require(`../utils/message_utils`);

module.exports = {
	name: `orkaaam`,
	description: `not yet implemented`,
	usage: ``,
	permission: permissions.ME,
	async execute(client, message, args) {
		const filesInDir = fs.readdirSync(`audios/orkaaam`);
		const fileToPlay = `orkaaam/` + filesInDir[getRandomInt(filesInDir.length)];
		console.log(fileToPlay);
		audioCommandHandler(message, args, fileToPlay);
	},
};
