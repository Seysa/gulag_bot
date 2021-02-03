const { exec } = require(`child_process`);
const os = require(`os`);
const { getToken } = require(`./config_utils`);

let connected = false;

function setConnected(bool) {
	connected = bool;
}

function destroyBot(client) {
	if(connected) {
		client.destroy();
	}
	else {
		process.exit();
	}
}

function tryToLogin(client) {
	console.log(`Trying to login...`);
	client.login(getToken()).catch(() => {
		const seconds = 30;
		console.log(`Failed, retrying in ${seconds}s...`);
		setTimeout(() => tryToLogin(client), seconds * 1000);
	});
}

function reboot() {
	if(os.platform() === `linux`) {
		exec(`sudo systemctl restart gulag-bot`);
	}
	else {
		process.exit(0);
	}
}

function shutdown() {
	if(os.platform() === `linux`) {
		exec(`sudo systemctl stop gulag-bot`);
	}
	else {
		process.exit(0);
	}
}

module.exports = {
	reboot:reboot,
	shutdown:shutdown,
	setConnected:setConnected,
	destroyBot:destroyBot,
	tryToLogin:tryToLogin,
};