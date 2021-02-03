const permissions = require(`../utils/permissions`);

module.exports = {
	name: `test`,
	description: `for test purpose`,
	usage: `depends on the test case`,
	permission: permissions.ME,
	execute(client, message, _args) {
		message.channel.send(`Nothing to see here`);
	},
};
