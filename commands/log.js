const permissions = require('../utils/permissions');
const fs = require('fs');

module.exports = {
	name: 'log',
	description: 'Shows all server logs',
	usage: '`log. No arguments`',
	permission: permissions.ME,
	async execute(message, _args) {
		try {
			const data = fs.readFileSync('output.log', 'utf8');
			message.channel.send(' ' + data);
		} catch(e) {
			message.channel.send('Encountered an error reading logs');
			console.log(e);
		}
	},
};
