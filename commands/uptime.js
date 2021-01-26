const permissions = require(`../utils/permissions`);
const { format } = require(`../utils/time_utils`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `uptime`,
	description: `Gives server and bot uptime`,
	usage: `\`uptime\`. No arguments`,
	permission: permissions.ME,
	execute(message, _args) {
		safeDelete(message);
		let result = ``;
		result += `__Server uptime:__ ${format(require(`os`).uptime())}`;
		result += `\n__Bot uptime:__ ${format(process.uptime())}`;
		message.channel.send(result);
	},
};
