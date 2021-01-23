const permissions = require(`../utils/permissions`);

module.exports = {
	name: `myid`,
	description: `shows user id`,
	usage: `\`myid\`. No arguments`,
	permission: permissions.NONE,
	execute(message, _args) {
		message.channel.send(`Your id is ` + message.author.id);
	},
};
