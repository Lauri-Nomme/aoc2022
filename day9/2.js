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

	'2,-2': [1, -1],
	'-2,2': [-1, 1],
	'2,2': [1, 1],
	'-2,-2': [-1, -1],
};
let apply = (l, r) => l.map((e, i) => r[i] + e);
let distance = (h, t) => [h[0] - t[0], h[1] - t[1]];
let LEN = 10;
let rope = Array(LEN).fill([]).map(_ => [0, 0]);

let visit = {};
visit[rope[LEN - 1]] = 1;

let applyKnot = (i, d) => {
	rope[i] = apply(rope[i], d);
	if (i > 0) {
		let dist = distance(rope[i], rope[i - 1]);
		let followD = f[dist];
		if (followD) {
			applyKnot(i - 1, followD);
		} else if (Math.abs(dist[0]) + Math.abs(dist[1]) >= 3) {
			console.log('FAIL', dist, rope[i], rope[i - 1]);
			process.exit(1);
		}
	} else {
		visit[rope[i]] = 1;
	}
};

for (move of input) {
	let moveD = d[move[0]];
	for (i = 0; i < move[1]; ++i) {
		applyKnot(LEN - 1, moveD);
	}
}

console.log(visit);
console.log(Object.keys(visit).length);
