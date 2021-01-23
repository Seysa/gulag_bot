const { exit } = require(`process`);

function reboot() {
	require(`../main`).destroy();
	exit(5);
}

function shutdown() {
	require(`../main`).destroy();
	exit(0);
}

module.exports = {
	reboot:reboot,
	shutdown:shutdown,
};