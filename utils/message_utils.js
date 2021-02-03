async function safeDelete(message) {
	try {
		await message.delete();
	}
	catch (e) {
		console.log(e);
	}
}

function parseMessage(message) {
	let prefix = require(`./config_utils`).getFromNewServer(message.guild.id, `prefix`);
	if (!prefix) {
		prefix = `=`;
		const client = require(`../main`);
		console.log(`Couldn't load prefix for the server ${client.guilds.resolve(message.guild.id).name}`);
	}
	const split = message.content.slice(prefix.length).split(/ +/);
	const command = split[0].toLowerCase();
	const args = split.slice(1);
	return {
		"command":command,
		"args":args,
	};
}

function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);
	// If supplied arg was not a mention, matches will be null instead of an array.
	if (!matches) return;
	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];
	return getUserFromId(id);
}

function getUserFromId(id) {
	return require(`../main`).users.cache.get(id);
}

function getIdFromMention(mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	// If supplied arg was not a mention, matches will be null instead of an array.
	if (!matches) return;

	return matches[1];
}

function hasLetters(str) {
	return str.match(/[a-z]/i) !== null;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
	getUserFromMention:getUserFromMention,
	getIdFromMention:getIdFromMention,
	hasLetters:hasLetters,
	getRandomInt:getRandomInt,
	getUserFromId:getUserFromId,
	safeDelete:safeDelete,
	parseMessage:parseMessage,
};
