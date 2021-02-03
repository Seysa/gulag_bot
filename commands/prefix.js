const cfg = require(`../utils/config_utils`);

const permissions = require(`../utils/permissions`);
const { hasLetters } = require(`../utils/message_utils`);

module.exports = {
	name: `prefix`,
	description: `(is supposed to change prefix, not yet implemented)`,
	usage: `\`prefix <new_prefix>\`. It changes the current prefix to new_prefix. new_prefix needs to be symbols only, min 1 character and max 3 characters`,
	permission: permissions.ME,
	execute(client, message, args) {
		const configObject = cfg.getConfigObject();
		let currentPrefix = cfg.getFromServer(configObject, message.guild.id, `prefix`);
		if (args[0]) {
			if (args[0].length >= 1 && args[0].length <= 3) {
				if (!hasLetters(args[0])) {
					message.channel.send(`This doesnt have letters`);
					currentPrefix = args[0];
					console.log(configObject);
					cfg.writeConfigObject(configObject);
				}
				else {
					message.reply(`Prefix cannot be letters`);
				}
			}
			else {
				message.reply(`Prefix must be 3 characters maximum`);
			}
		}
		else {
			message.channel.send(`Current prefix is: ` + currentPrefix);

		}
		return;
	},
};
