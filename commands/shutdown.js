const permissions = require(`../utils/permissions`);
const { shutdown } = require(`../utils/up_utils`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `shutdown`,
	description: `shuts down the bot`,
	usage: `\`shutdown\`. No arguments`,
	permission: permissions.ME,
	async execute(client, message, _args) {
		await safeDelete(message);
		shutdown();
	},
};
