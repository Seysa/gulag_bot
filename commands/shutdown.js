const permissions = require(`../utils/permissions`);
const { shutdown } = require(`../utils/up_utils`);

module.exports = {
	name: `shutdown`,
	description: `shuts down the bot`,
	usage: `\`shutdown\`. No arguments`,
	permission: permissions.ME,
	async execute(message, _args) {
		if(message) {
			await message.delete();
		}
		shutdown();
	},
};
