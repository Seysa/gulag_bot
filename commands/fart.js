const { audioCommandHandler } = require(`../utils/audio_utils`);
const permissions = require(`../utils/permissions`);
const { getRandomInt } = require(`../utils/message_utils`);


module.exports = {
	name: `fart`,
	description: `makes the bot fart into your channel`,
	usage: `\`fart\` to make the bot fart into your voice channel, \`fart @user\` to make the bot fart in the voice channel of the user.\n` +
		`The 'victim' needs to be in a voice channel`,
	permission: permissions.NONE,
	execute(client, message, args) {
		const fartFile = `farts/fart_${getRandomInt(5) + 1}.mp3`;
		audioCommandHandler(message, args, fartFile);
	},
};
