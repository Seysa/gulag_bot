const permissions = require(`../utils/permissions`);
const { exec } = require(`child_process`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `temp`,
	description: `Gives current server temperature`,
	usage: `\`temp\`. No arguments`,
	permission: permissions.ME,
	async execute(client, message, _args) {
		await safeDelete(message);
		exec(`vcgencmd measure_temp`, async (err, stdout, _stderr) => {
			if(err) {
				message.reply(`Something wrong happened. Error code is ` + err);
			}
			const number = stdout.split(`=`)[1];
			await message.reply(`Temp is ` + number);
		});
	},
};
