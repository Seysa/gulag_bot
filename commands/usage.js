const permissions = require(`../utils/permissions`);
const { getCommands } = require(`../utils/main_utils`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `usage`,
	description: `shows how to use command given in parameter (not yet implemented)`,
	usage: `\`usage\`. No arguments`,
	permission: permissions.NONE,
	async execute(client, message, args) {
		await safeDelete(message);
		if(args[0]) {
			const commands = getCommands();
			if(commands.has(args[0])) {
				const commandUsage = commands.get(args[0]).usage;
				console.log(commandUsage);
				await message.channel.send(commandUsage);
			}
			else {
				await message.reply(`Couldn't find this command`);
			}
		}
		else {
			await message.reply(`This command needs a parameter, the command for which you want to know the usage`);
		}
	},
};
