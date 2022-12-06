var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd().split("\n");

let dup = (l, r) => {
	let ls = l.split("").reduce((a, c) => a.add(c), new Set());
	for (c of r) {
		if (ls.has(c)) {
			return c;
		}
	}

	return null;
};

let prio = c => { 
	let cc = c.charCodeAt();
	return cc >= 97 ? cc - 96 : cc - 38;
}

let res = input.reduce((acc, cur) => {
	let len = cur.length / 2;
	let l = cur.slice(0, len);
	let r = cur.slice(len);

	return acc + prio(dup(l, r));
}, 0);

console.log(res);
