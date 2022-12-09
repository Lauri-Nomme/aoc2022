var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split(' ').map((e, i) => i == 1 ? Number(e) : e));

let d = {
	'R': [1, 0],
	'L': [-1, 0],
	'U': [0, -1],
	'D': [0, 1],
};
let f = {
	'2,0': [1, 0],
	'-2,0': [-1, 0],
	'0,2': [0, 1],
	'0,-2': [0, -1],

	'1,-2': [1, -1],
	'1,2': [1, 1],
	'-1,2': [-1, 1],
	'-1,-2': [-1, -1],
	'-2,-1': [-1, -1],
	'-2,1': [-1, 1],
	'2,1': [1, 1],
	'2,-1': [1, -1],
};
let apply = (l, r) => l.map((e, i) => r[i] + e);
let distance = (h, t) => [h[0] - t[0], h[1] - t[1]];
let tail = [0, 0];
let head = [0, 0];
let visit = {};
visit[tail] = 1;

for (move of input) {
	let moveD = d[move[0]];
	for (i = 0; i < move[1]; ++i) {
		head = apply(head, moveD);
		let dist = distance(head, tail);
		let followD = f[dist];
		if (followD) {
			tail = apply(tail, followD);
			visit[tail] = 1;
		} else {
		}
	}
}

console.log(visit);
console.log(Object.keys(visit).length);
