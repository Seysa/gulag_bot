import sys

if(len(sys.argv) < 2):
	print(f'usage: {sys.argv[0]} <file_name>')
	exit(1)

command = sys.argv[1]
path = f'./commands/{command}.js'
file = open(path, "w")
string = "\
const permissions = require('../utils/permissions');\n\n\
module.exports = {\n\
\tname: '" + command + "',\n\
\tdescription: 'not yet implemented',\n\
\tusage: '',\n\
\tpermission: permissions.ME,\n\
\tasync execute(client, message, _args) {\n\
\t\tmessage.reply('Command " + command + " is not implemented yet');\n\
\t},\n\
};\n"

file.write(string)
print('done')
