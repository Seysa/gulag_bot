const permissions = require(`../utils/permissions`);
const Discord = require(`discord.js`);
const { safeDelete } = require(`../utils/message_utils`);

module.exports = {
	name: `survey`,
	description: `Creates a survey`,
	usage: `\`survey <Question>\``,
	permission: permissions.NONE,
	async execute(message, args) {
		safeDelete(message);
		if(!args[0]) {
			return message.reply(`The survey needs a question as an argument`);
		}
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor(`#0099ff`)
			.setTitle(args.join(` `))
			.setAuthor(`Question by ` + message.author.username)
			.setTimestamp()
			.setFooter(`Gulag bot survey`);

		const sentMessage = (await message.channel.send(exampleEmbed));
		sentMessage.react(`👍`);
		sentMessage.react(`👎`);
	},
};
