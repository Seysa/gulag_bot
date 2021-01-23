const permissions = require(`../utils/permissions`);
const { hasLetters, getRandomInt } = require(`../utils/message_utils`);
module.exports = {
	name: `dde`,
	description: `rolls dices`,
	usage: `\`dde <number_of_faces> <number_of_dice_rolls>\`\nNumber of faces is a number between 2 and 50'000; Number of dice rolls is a number between 1 and 100`,
	permission: permissions.NONE,
	execute(message, args) {
		let diceOf = 12;
		if (args[0]) {
			const argValue = parseInt(args[0]);
			if (argValue <= 50000 && argValue >= 2 && !hasLetters(args[0])) {
				diceOf = argValue;
			}
			else {
				return message.reply(`First argument is the number of faces of the dice, which is a number between 2 and 50'000`);
			}
		}
		if (args[1]) {
			if ((parseInt(args[1]) <= 100) && (parseInt(args[1]) >= 1) && !hasLetters(args[1])) {
				let result = ``;
				for (let i = 0; i < parseInt(args[1]); i++) {
					result += ` ` + (getRandomInt(diceOf) + 1);
				}
				const messageToSend = `Output for dice with ${diceOf} faces ${parseInt(args[1])} times:\n\`\`\`${result}\`\`\``;
				return message.channel.send(messageToSend);
			}
			else {
				return message.reply(`Second argument is the number of rolls, which is a number between 1 and 100`);
			}
		}

		const messageToSend = `Output for dice with ${diceOf} faces:\n${getRandomInt(diceOf) + 1}`;
		return message.channel.send(messageToSend);
	},
};
