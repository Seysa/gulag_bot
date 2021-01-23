const permissions = require(`../utils/permissions`);

module.exports = {
	name: `python`,
	description: `Prints given python output`,
	usage: `\`python <command>\`. Command can be any valid python syntax.`,
	permission: permissions.NONE,
	execute(message, args) {
		if(!args[0]) {
			return message.reply(`An operation is needed as an argument`);
		}
		const argsString = args.join(` `);
		console.log(argsString);
		const axios = require(`axios`);

		console.log(`Query...`);
		axios.post(`https://emkc.org/api/v1/piston/execute`, {
			language:`python3`,
			source:`${argsString}`,
			args: [],
		}).then(res => {
			console.log(`Response received`);
			if(!res.data.output) {
				message.reply(`No output for this code`);
			}
			else {
				message.channel.send(res.data.output);
			}
		}).catch(error => {
			console.log(`Error received`);
			message.channel.send(`Error: ` + error);
		});
	},
};
