const permissions = require(`../utils/permissions`);
const { format } = require(`../utils/time_utils`);
const { safeDelete } = require(`../utils/message_utils`);
const os = require(`os`);

module.exports = {
	name: `uptime`,
	description: `Gives server and bot uptime`,
	usage: `\`uptime\`. No arguments`,
	permission: permissions.ME,
	async execute(client, message, _args) {
		await safeDelete(message);
		let result = ``;
		result += `:white_check_mark: __**Server uptime:**__ ${format(os.uptime())}`;
		result += `\n:white_check_mark: __**Program uptime**:__ ${format(process.uptime())}`;
		// client uptime is in ms
		result += `\n:white_check_mark: __**Bot uptime:**__ ${format(client.uptime / 1000)}`;
		await message.channel.send(result);
	},
};
