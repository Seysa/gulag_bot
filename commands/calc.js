const permissions = require(`../utils/permissions`);

function tokenize(code) {
	const results = [];
	const tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;

	let m;
	while ((m = tokenRegExp.exec(code)) !== null) {results.push(m[1]);}
	return results;
}


function parse(code) {

	function isNumber(token) {
		return token !== undefined && token.match(/^[0-9]+$/) !== null;
	}

	function isName(token) {
		return token !== undefined && token.match(/^[A-Za-z]+$/) !== null;
	}

	const tokens = tokenize(code);
	let position = 0;

	function peek() {
		return tokens[position];
	}

	function consume() {
		position++;
	}


	function parsePrimaryExpr() {
		const t = peek();

		if (isNumber(t)) {
			consume();
			return { type: `number`, value: t };
		}
		else if (isName(t)) {
			consume();
			return { type: `name`, id: t };
		}
		else if (t === `(`) {
			consume();
			const expr = parseExpr();
			if (peek() !== `)`) {throw new SyntaxError(`expected )`);}
			consume();
			return expr;
		}
		else {
			throw new SyntaxError(`expected a number, a variable, or parentheses`);
		}
	}

	function parsePowExpr() {
		let expr = parsePrimaryExpr();
		let t = peek();
		while (t === `^`) {
			consume();
			const rhs = parsePrimaryExpr();
			expr = { type: t, left: expr, right: rhs };
			t = peek();
		}
		return expr;
	}

	function parseMulExpr() {
		let expr = parsePowExpr();
		let t = peek();
		while (t === `*` || t === `/`) {
			consume();
			const rhs = parsePowExpr();
			expr = { type: t, left: expr, right: rhs };
			t = peek();
		}
		return expr;
	}

	function parseExpr() {
		let expr = parseMulExpr();
		let t = peek();
		while (t === `+` || t === `-`) {
			consume();
			const rhs = parseMulExpr();
			expr = { type: t, left: expr, right: rhs };
			t = peek();
		}
		return expr;
	}

	const result = parseExpr();
	if (position !== tokens.length) {
		throw new SyntaxError(`unexpected '` + peek() + `'`);
	}

	return result;
}

function evaluateAsFloatHistory(code) {
	let history = ``;
	const variables = Object.create(null);
	variables.e = Math.E;
	variables.pi = Math.PI;

	function evaluate(obj) {
		function printOperation(result) {
			history += (`${left} ${obj.type} ${right} = ${result}\n`);
		}
		if(obj.type === `number`) {
			return parseInt(obj.value);
		}
		else if (obj.type === `name`) {
			return variables[obj.id] || 0;
		}
		const left = evaluate(obj.left);
		const right = evaluate(obj.right);
		if(obj.type === `+`) {
			const result = left + right;
			printOperation(result);
			return result;
		}
		else if (obj.type === `-`) {
			const result = left - right;
			printOperation(result);
			return result;
		}
		else if (obj.type === `*`) {
			const result = left * right;
			printOperation(result);
			return result;
		}
		else if (obj.type === `/`) {
			const result = left / right;
			printOperation(result);
			return result;
		}
		else if (obj.type === `^`) {
			const result = Math.pow(left, right);
			printOperation(result);
			return result;
		}
	}
	const result = evaluate(parse(code));
	return { history:history, result:result };
}

module.exports = {
	name: `calc`,
	description: `Performs an operation on the given argument`,
	usage: `\`calc <operation>\`. Operation cannot contain letters.`,
	permission: permissions.NONE,
	async execute(client, message, args) {
		if(!args[0]) {
			return await message.reply(`An operation is needed as an argument`);
		}

		const allArgs = args.join(``);
		const object = evaluateAsFloatHistory(allArgs);
		const result = (object.history.length > 0) ? object.history : `Result is ` + object.result;
		await message.channel.send(result);
	},
};
