const { addInWhiteList, removeInWhiteListById, getFromNewServer } = require('../utils/config_utils');
const { getUserFromMention } = require('../utils/message_utils');
const permissions = require('../utils/permissions');

module.exports = {
	name: 'whitelist',
	description: 'whitelist management',
	usage: '`whitelist <action>`. action can be : `add` | `remove` | `clear` | `list`.\n' +
		'__Add__: `whitelist add @user`. Adds user if user isn\'t already in the whitelist\n' +
		'__Remove__:`whitelist remove @user`. Removes user from whitelist if user is already in the whitelist\n' +
		'__Clear__: `whitelist clear`. Removes everyone in the whitelist. You need to be administrator to clear the whitelist.\n' +
		'__List__: `whitelist list`. Shows the names of everyone in the whitelist.',
	permission: permissions.WHITELIST,
	execute(message, args) {
		if (args[0]) {
			if (args[0] === 'add') {
				if (args[1]) {
					const mentionedUser = message.guild.members.resolve(getUserFromMention(args[1]));
					if (mentionedUser) {
						const added = addInWhiteList(message.guild.id, mentionedUser.user.tag, mentionedUser.id);
						if (added) {
							message.channel.send(`${mentionedUser.user.username} was added to the whitelist`);
						}
						else {
							message.reply(`${mentionedUser.user.username} is already in the whitelist`);
						}
					}
					else {
						message.reply('Couldn\'t identify the user');
					}
				}
				else {
					message.reply('You need to mention the user you want to add to the whitelist');
				}
			}
			else if (args[0] === 'remove') {
				if (args[1]) {
					const mentionedUser = message.guild.members.resolve(getUserFromMention(args[1]));
					if (mentionedUser) {
						const removed = removeInWhiteListById(message.guild.id, mentionedUser.id);
						if (removed) {
							message.channel.send(`${mentionedUser.user.username} was removed from the whitelist`);
						}
						else {
							message.reply(`${mentionedUser.user.username} is not in the whitelist`);
						}
					}
				}
			}
			else if (args[0] === 'list') {
				const whitelist = getFromNewServer(message.guild.id, 'whitelist');
				if (whitelist.length) {
					let result = 'Whitelist users:';
					for (const user of whitelist) {
						result += `\n\t- ${user.name}`;
					}
					message.channel.send(result);
				}
				else {
					message.reply('Whitelist is empty');
				}
			}
			else if (args[0] === 'clear') {
				if (message.member.hasPermission('ADMINISTRATOR')) {
					for (const user of getFromNewServer(message.guild.id, 'whitelist')) {
						removeInWhiteListById(message.guild.id, user.id);
					}
					message.channel.send('Whitelist is now empty');
				}
				else {
					message.reply('You need to be server administrator to clear the whitelist');
				}
			}
			else {
				message.reply('Invalid argument, try one of those: add | remove | list | clear');
			}
		}
		else {
			message.reply('You need to specify an argument: add | remove | list | clear');
		}
	},
};
