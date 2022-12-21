var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => {
		let t = l.split(': ');
		let w = t[1].split(' ');
		let r = [t[0]];
		r.push(...(w.length == 1 ? [Number(w)] : w));
		return r;
	})
	.reduce((acc, cur) => {acc[cur[0]] = cur.slice(1); return acc;}, {});
console.log(input);

let op = {
	'+': (l, r) => l + r,
	'-': (l, r) => l - r,
	'*': (l, r) => l * r,
	'/': (l, r) => l / r,
};
let m = {};
let eval = id => {
	let i = input[id];
	console.log('eval', id, i);
	if (i.length == 1) {
		return i[0];
	}
	if (m[id] != undefined) {
		return m[id];
	}

	return op[i[1]](eval(i[0]), eval(i[2]));

	m[id] = res;
};

console.log(eval('root'));
