const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `douze`,
	description: `12`,
	usage: `\`douze <times>\`. This command needs an argument, which is the number of times you want the bot to write '12'. Argument is a number between 0 and 144`,
	permission: permissions.NONE,
	execute(client, message, args) {
		safeDelete(message);
		const upperLimit = 144;
		const max = parseInt(args[0]);
		let result = ``;
		if (max && max > 0 && max <= upperLimit) {
			for (let i = 0; i < max; i++) {
				result += `12\n`;
			}
			message.channel.send(result);
		}
		else {
			message.reply(`First argument must be a number (more than 0 and less or equal than ${upperLimit})`);
		}
	},
};
