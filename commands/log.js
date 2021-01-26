const permissions = require(`../utils/permissions`);
const fs = require(`fs`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `log`,
	description: `Shows all server logs`,
	usage: `\`log. No arguments\``,
	permission: permissions.ME,
	async execute(message, _args) {
		safeDelete(message);
		try {
			const data = fs.readFileSync(`output.log`, `utf8`);
			if(!data) {
				message.channel.send(`log file is empty`);
			}
			else {
				message.channel.send(data);
			}
		}
		catch(e) {
			message.reply(`Encountered an error reading logs`);
			console.log(e);
		}
	},
};
