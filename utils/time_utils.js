function format(_seconds) {
	// Max number of days = depends, so whatever
	const days = Math.floor(_seconds / (3600 * 24));
	// Max number of hours = 24
	const hours = Math.floor(_seconds / (60 * 60) % 24);
	// Max number of minutes = 60
	const minutes = Math.floor(_seconds / 60 % 60);
	// Max number of seconds = 60
	const seconds = Math.floor(_seconds % 60);

	let result = ``;

	if(days) {
		result += days + `d `;
	}
	if(hours) {
		result += hours + `h `;
	}
	if(minutes) {
		result += minutes + `m `;
	}
	if(seconds) {
		result += seconds + `s`;
	}

	return result;
}

module.exports = {
	format:format,
};
