function safeDelete(message) {
	try {
		message.delete();
	}
	catch (e) {
		console.log(e);
	}
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
};