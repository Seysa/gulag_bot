const permissions = require('../utils/permissions');

module.exports = {
	name: 'orkaaam',
	description: 'not yet implemented',
	usage: '',
	permission: permissions.ME,
	async execute(client, message, _args) {
		message.reply('Command orkaaam is not implemented yet');
	},
};
