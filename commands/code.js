const { getAmongUsCode } = require('../utils/config_utils.js');
const permissions = require('../utils/permissions');

module.exports = {
	name: 'code',
	description: 'shows Among Us code',
	usage: '`code`. It is used to get last among Us code written in the server',
	permission: permissions.NONE,
	execute(message, _args) {
		message.channel.send(getAmongUsCode(message.guild.id));
	},
};
