const permissions = require(`../utils/permissions`);
const axios = require(`axios`);

module.exports = {
	name: `python`,
	description: `Prints given python output`,
	usage: `\`python <command>\`. Command can be any valid python syntax.`,
	permission: permissions.NONE,
	async execute(client, message, args) {
		if(!args[0]) {
			return await message.reply(`An operation is needed as an argument`);
		}
		const argsString = args.join(` `);
		console.log(argsString);

		console.log(`Query...`);
		axios.post(`https://emkc.org/api/v1/piston/execute`, {
			language:`python3`,
			source:`${argsString}`,
			args: [],
		}).then(async res => {
			console.log(`Response received`);
			if(!res.data.output) {
				await message.reply(`No output for this code`);
			}
			else {
				await message.channel.send(res.data.output);
			}
		}).catch(async error => {
			console.log(`Error received`);
			await message.channel.send(`Error: ` + error);
		});
	},
};
