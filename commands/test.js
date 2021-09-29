const permissions = require(`../utils/permissions`);

module.exports = {
	name: `test`,
	description: `for test purpose`,
	usage: `depends on the test case`,
	permission: permissions.ME,
	async execute(client, message, _args) {
		await message.channel.send(`Nothing to see here`);
	},
};
