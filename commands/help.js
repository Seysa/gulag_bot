const permissions = require(`../utils/permissions`);

const { getCommands, getLongestCommandSize } = require(`../utils/main_utils`);
const { getLevelOfPermissionOfUser } = require(`../utils/main_utils`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `help`,
	description: `displays bot help`,
	usage: `\`help\` to display bot help`,
	permission: permissions.NONE,
	execute(message, args) {
		safeDelete(message);
		const permArray = [];
		let resultMessage = ``;
		const longestCommandSize = getLongestCommandSize();
		const commands = getCommands();
		for(const perm of permissions.values) {
			permArray[perm] = [];
			for(const command of commands) {
				const commandObject = command[1];
				if(commandObject.permission === perm) {
					permArray[perm].push(commandObject);
				}
			}
		}

		let permValues = [0, 1, 2];

		if(args[0] === `all` && getLevelOfPermissionOfUser(message) === permissions.ME) {
			permValues = permissions.values;
		}

		for(const i of permValues) {
			if(permArray[i].length === 0) {
				continue;
			}
			resultMessage += `__**${permissions.getName(i)}** permission needed:__\n`;
			for(const j of permArray[i]) {
				resultMessage += `\`${j.name}`;
				for(let k = j.name.length; k < longestCommandSize; k++) {
					resultMessage += ` `;
				}
				resultMessage += `\` | ${j.description}\n`;
			}
		}

		resultMessage += `\nIf you have any feedback, feel free to DM Garion#5133\n` +
        `(invite link is https://tinyurl.com/y2w9kwxp)\n` +
        `source code is available at https://github.com/Seysa/gulag_bot`;

		// TODO: center command names?

		message.author.send(resultMessage);
	},
};
