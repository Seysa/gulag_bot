const fs = require(`fs`);

// GETTERS

function getConfigObject() {
	return JSON.parse(fs.readFileSync(`config/config.json`, `utf8`));
}

function writeConfigObject(object) {
	fs.writeFileSync(`config/config.json`, JSON.stringify(object, null, `\t`), `utf8`);
}

function getToken() {
	return JSON.parse(fs.readFileSync(`./token.json`, `utf8`)).token;
}

function getFromServer(config_object, server_id, attribute) {
	for (const server of config_object.servers) {
		if (server.id === server_id) {
			return server[attribute];
		}
	}
}

function modifyInServer(server_id, attribute, value) {
	const configObject = getConfigObject();
	for (const server of configObject.servers) {
		if (server.id === server_id) {
			server[attribute] = value;
			return configObject;
		}
	}
}

function getFromNewServer(server_id, attribute) {
	const configObject = getConfigObject();
	for (const server of configObject.servers) {
		if (server.id === server_id) {
			return server[attribute];
		}
	}
	return undefined;
}

function changeAmongUsCode(server_id, code) {
	const newObject = modifyInServer(server_id, `amongUsCode`, code);
	writeConfigObject(newObject);
}


function getAmongUsCode(server_id) {
	const amongUsCode = getFromNewServer(server_id, `amongUsCode`);
	if (amongUsCode) {
		return `Code is __**${amongUsCode}**__`;
	}
	return `No AmongUs code registered for this server yet`;
}

// from server
function userInWhiteList(server_id, user_id) {
	const serverWhiteList = getFromNewServer(server_id, `whitelist`);
	if (!serverWhiteList) {
		return false;
	}
	for (const user of serverWhiteList) {
		if (user.id === user_id) {
			return true;
		}
	}
	return false;
}

function addInWhitelist(server_id, name, user_id) {
	if (userInWhiteList(server_id, user_id)) {
		return false;
	}
	const toAdd = { 'name': name, 'id': user_id };
	const configObject = getConfigObject();
	for (const server of configObject.servers) {
		if (server.id === server_id) {
			const whitelist = server.whitelist;
			whitelist.push(toAdd);
			writeConfigObject(configObject);
			return true;
		}
	}
}

function removeServerFromConfig(server_id) {
	const configObject = getConfigObject();
	for (let i = 0; i < configObject.servers.length; i++) {
		if (configObject.servers[i].id === server_id) {
			// remove 1 element at spot i
			configObject.servers.splice(i, 1);
			writeConfigObject(configObject);
			return true;
		}
	}
	return false;
}

function addServerToConfig(server_id, server_name) {
	const configObject = getConfigObject();

	if (!configObject.servers) {
		const toAddFirst = {
			'servers': [{
				'name': server_name,
				'id': server_id,
				'prefix': `=`,
				'amongUsCode': {
					'code': ``,

				},
				'whitelist': [],
				'goulagChannelId': `0`,

			}],
		};
		writeConfigObject(toAddFirst);
	}

	const toAdd = {
		'name': server_name,
		'id': server_id,
		'prefix': `=`,
		'amongUsCode': {
			'code': ``,
			'time': ``,

		},
		'whitelist': [],
		'goulagChannelId': `0`,

	};
	configObject.servers.push(toAdd);
	writeConfigObject(configObject);
}

function removeByAttr(arr, attr, value) {
	let i = arr.length;
	while (i--) {
		if (arr[i]
            && Object.prototype.hasOwnProperty.call(arr[i], attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {
			arr.splice(i, 1);
		}
	}
	return arr;
}

function removeInWhiteListById(server_id, user_id) {
	if (!userInWhiteList(server_id, user_id)) {
		return false;
	}
	const myConfig = getConfigObject();
	for (const server of myConfig.servers) {
		if (server.id === server_id) {
			server.whitelist = removeByAttr(server.whitelist, `id`, user_id);
			writeConfigObject(myConfig);
			return true;
		}
	}
	return false;
}

function getServerGoulagId(server_id) {
	return getFromNewServer(server_id, `goulagChannelId`);
}

function writeServerGoulagId(server_id, goulag_id) {
	const myConfig = getConfigObject();
	for (const server of myConfig.servers) {
		if (server.id === server_id) {
			server.goulagChannelId = goulag_id;
			writeConfigObject(myConfig);
		}
	}
}


module.exports = {
	getFromServer: getFromServer,
	getFromNewServer: getFromNewServer,
	getToken: getToken,
	getConfigObject: getConfigObject,
	writeConfigObject: writeConfigObject,
	userInWhiteList: userInWhiteList,
	addInWhiteList: addInWhitelist,
	removeInWhiteListById: removeInWhiteListById,
	addServerToConfig: addServerToConfig,
	removeServerFromConfig: removeServerFromConfig,
	changeAmongUsCode: changeAmongUsCode,
	getAmongUsCode: getAmongUsCode,
	getServerGoulagId: getServerGoulagId,
	writeServerGoulagId: writeServerGoulagId,
};