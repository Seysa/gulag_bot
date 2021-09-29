const permissions = require(`../utils/permissions`);
const fs = require(`fs`);
const { safeDelete } = require(`../utils/message_utils`);

const MAX_LENGTH = 2000 - 6; // backquotes

function split_at_index(value, index) {
	return [value.substring(0, index), value.substring(index)];
}

function getIndexOfLastLine(string) {
	let newLineLastPos = 0;
	for(let i = 0; i < MAX_LENGTH; i++) {
		if(string[i] === `\n`) {
			newLineLastPos = i;
		}
	}
	return newLineLastPos;


}

module.exports = {
	name: `log`,
	description: `Shows all server logs`,
	usage: `\`log. No arguments\``,
	permission: permissions.ME,
	async execute(client, message, _args) {
		safeDelete(message);
		try {
			const data = fs.readFileSync(`/home/pi/gulag_bot/output.log`, `utf8`);
			if(!data) {
				await message.channel.send(`Output file is empty`);
			}
			else if(data.length > MAX_LENGTH) {
				let toAnalyze = data;
				while(toAnalyze.length > MAX_LENGTH) {
					const splitted = split_at_index(toAnalyze, getIndexOfLastLine(toAnalyze));
					await message.channel.send(`\`\`\`` + splitted[0] + `\`\`\``);
					console.log(splitted[0]);
					toAnalyze = splitted[1];
				}
				await message.channel.send(`\`\`\`` + toAnalyze + `\`\`\``);
			}
			else {
				await message.channel.send(`\`\`\`` + data + `\`\`\``);
			}
		}
		catch(e) {
			await message.reply(`Encountered an error reading logs`);
			console.log(e);
		}
	},
};