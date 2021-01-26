const { exec } = require(`child_process`);
const os = require(`os`);

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
};