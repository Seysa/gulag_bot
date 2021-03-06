// Import discord.js and create the client
const Discord = require(`discord.js`);
const { safeDelete } = require(`./utils/message_utils`);
const {
	getAmongUsCode,
	getFromNewServer,
	changeAmongUsCode,
	removeServerFromConfig,
	addServerToConfig,
} = require(`./utils/config_utils.js`);

const {
	parseAndTryCommand,
	timeLog,
	isAmongUsCode,
	getCommands,
} = require(`./utils/main_utils`);
const {
	setConnected,
	tryToLogin,
	destroyBot,
} = require(`./utils/up_utils`);


const client = new Discord.Client();
const commands = getCommands();

// Register an event to handle incoming messages
client.on(`message`, async (message) => {
	if (message.author.bot) return;
	// Logs private messages to bot
	if (message.guild == null) {
		return message.reply(`Bot doesn't take commands from private message`);
	}

	let prefix = getFromNewServer(message.guild.id, `prefix`);
	if (!prefix) {
		prefix = `=`;
		console.log(`Couldn't load prefix for the server ${client.guilds.resolve(message.guild.id).name}`);
	}

	if (isAmongUsCode(message.content)) {
		changeAmongUsCode(message.guild.id, message.content);
		timeLog(message, `entered AmongUs code: ${message.content}\n`);
		return message.channel.send(getAmongUsCode(message.guild.id));
	}

	// is DOUZOS NACHOS written in the message
	if (message.content.indexOf(`DOUZOS NACHOS`) !== -1) {
		await message.channel.send(`Code is __**DOUZOS NACHOS**__`);
		await message.react(`🇳`);
		await message.react(`🇦`);
		await message.react(`🇨`);
		await message.react(`🇭`);
		await message.react(`🇴`);
		await message.react(`🇸`);
		return;
	}

	if (!message.content.startsWith(prefix)) {
		return;
	}
	const split = message.content.slice(prefix.length).split(/ +/);
	const command = split[0].toLowerCase();
	const args = split.slice(1);

	// TypeScript?
	try {
		await parseAndTryCommand(client, message, commands, command, args);
	}
	catch(e) {
		console.log(`Error catched in main: ` + e);
	}

});


client.on(`ready`, () => {
	setConnected(true);
	console.log(`Logged in as ${client.user.tag}`);
	console.log(`I am logged on ${client.guilds.cache.size} server(s)`);
	client.guilds.cache.forEach((guild) => {
		changeAmongUsCode(guild.id, ``);
		console.log(`- ${guild.name}`);
	});
	console.log(`----------------`);
	client.user.setActivity(`=help | =usage <command>`);
});


// joined a server
client.on(`guildCreate`, (guild) => {
	console.log(`Joined a new guild: ` + guild.name);
	addServerToConfig(guild.id, guild.name);
});

// removed from a server
client.on(`guildDelete`, (guild) => {
	if (!guild.available) {
		console.log(`${guild.name} couldn't be reached for now`);
	}
	else {
		console.log(`server ${guild.name} left`);
		removeServerFromConfig(guild.id);

	}

});

tryToLogin(client);

module.exports = client;


for(const sig of [`SIGTERM`, `SIGINT`]) {
	process.on(sig, () => {
		console.log(sig + ` received, exiting`);
		destroyBot(client);
	});
}
