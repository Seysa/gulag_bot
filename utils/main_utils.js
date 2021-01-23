const { hasLetters } = require(`./message_utils`);
const permissions = require(`./permissions`);
const fs = require(`fs`);
const { userInWhiteList } = require(`./config_utils`);

function getCommands() {
	const collection = new Map();

	const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		collection.set(command.name, command);
	}

	return collection;
}

function getLongestCommandSize() {
	const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith((`.js`))).map(filename => filename.slice(0, -3));
	let longestName = 0;
	for(const filename of commandFiles) {
		if(filename.length > longestName) {
			longestName = filename.length;
		}
	}
	return longestName;
}


function timeLog(message, content) {
	const d = new Date();
	const time = `${d.toLocaleDateString()} @ ${d.toLocaleTimeString()}`;
	process.stdout.write(`[${time}][${message.guild.name}][${message.channel.name}][${message.author.tag}] ${content} `);
}

function logPrivateMessage(message) {
	const d = new Date();
	message = `[${d.toLocaleDateString()} @ ${d.toLocaleTimeString()}]${message}`;
	console.log(message);
	fs.appendFileSync(`logs/private.log`, `${message}\n`, `utf8`);
}

async function parseAndTryCommand(message, commands, command, args) {
	if (!commands.has(command)) {
		timeLog(message, `No command ${command}\n`);
		return;
	}
	try {
		timeLog(message, `=${command} ${args.join(` `)}`);
		const clientCommand = commands.get(command);
		if (getLevelOfPermissionOfUser(message) >= clientCommand.permission) {
			console.log(`| executing`);
			clientCommand.execute(message, args);
		}
		else {
			console.log(`| not executing`);
		}
	}
	catch (error) {
		console.error(error);
		message.reply(`there was an error trying to execute that command!`);
		if(command === `calc`) {
			message.channel.send(`` + error);
		}
	}
}


function isAmongUsCode(string) {
	if (string.length === 6) {
		for (const letter of string) {
			if (!hasLetters(letter) || (letter !== letter.toUpperCase())) {
				return false;
			}
		}
		return true;
	}
	return false;
}

function isMe(user_id) {
	return user_id === `180044865067810816`;
}

function getLevelOfPermissionOfUser(message) {
	if (isMe(message.author.id)) {
		return permissions.ME;
	}
	else if (message.member.hasPermission(`ADMINISTRATOR`)) {
		return permissions.ADMIN;
	}
	else if (userInWhiteList(message.guild.id, message.author.id)) {
		return permissions.WHITELIST;
	}
	else {
		return permissions.NONE;
	}
}

module.exports = {
	getCommands:getCommands,
	timeLog:timeLog,
	logPrivateMessage:logPrivateMessage,
	parseAndTryCommand:parseAndTryCommand,
	isAmongUsCode:isAmongUsCode,
	isMe:isMe,
	getLevelOfPermissionOfUser:getLevelOfPermissionOfUser,
	getLongestCommandSize:getLongestCommandSize,
};
