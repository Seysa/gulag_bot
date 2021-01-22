const permissions = require('../utils/permissions');
const { exec } = require('child_process');

module.exports = {
	name: 'temp',
	description: 'Gives current server temperature',
	usage: '`temp`. No arguments',
	permission: permissions.ME,
	execute(message, _args) {
		exec('vcgencmd measure_temp', (err, stdout, _stderr) => {
			if(err) {
				message.reply('Something wrong happened. Error code is ' + err);
			}
			const number = stdout.split('=')[1];
			message.channel.send('Temp is ' + number);
		});
	},
};
