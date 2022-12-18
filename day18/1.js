var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split(",").map(Number));

console.log(input);
let sd = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
let p = (l, r) => [l[0] + r[0], l[1] + r[1], l[2] + r[2]];

let g = new Set();
input.forEach(c => g.add('' + c));

console.log(sd);

let res = input.reduce((acc, cur) => {
	let sidesE = sd.reduce((sacc, s) => {
		let n = p(cur, s);
		let coll = g.has('' + n);
		return sacc + (coll ? 0 : 1);
	}, 0);
	return acc + sidesE;
}, 0);
console.log(res);
