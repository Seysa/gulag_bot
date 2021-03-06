const { getAmongUsCode } = require(`../utils/config_utils.js`);
const permissions = require(`../utils/permissions`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `code`,
	description: `shows Among Us code`,
	usage: `\`code\`. It is used to get last among Us code written in the server`,
	permission: permissions.NONE,
	execute(client, message, _args) {
		safeDelete(message);
		message.channel.send(getAmongUsCode(message.guild.id));
	},
};
