const permissions = require(`../utils/permissions`);
const { exec } = require(`child_process`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `temp`,
	description: `Gives current server temperature`,
	usage: `\`temp\`. No arguments`,
	permission: permissions.ME,
	execute(message, _args) {
		safeDelete(message);
		exec(`vcgencmd measure_temp`, (err, stdout, _stderr) => {
			if(err) {
				message.reply(`Something wrong happened. Error code is ` + err);
			}
			const number = stdout.split(`=`)[1];
			message.reply(`Temp is ` + number);
		});
	},
};
