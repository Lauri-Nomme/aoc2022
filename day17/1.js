var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split(""));
let jet = input[0];

let shape=[
[['#', '#', '#','#']],
[
	[' ', '#', ' '],
	['#', '#', '#'],
	[' ', '#', ' ']
],
[
	[' ', ' ', '#'],
	[' ', ' ', '#'],
	['#', '#', '#']
],
[
	['#'],
	['#'],
	['#'],
	['#']
],
[
	['#', '#'],
	['#', '#']
]
];

let shapec = [
[[0, 0], [1, 0], [2, 0], [3, 0]],
[[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
[[2, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
[[0, 0], [0, 1], [0, 2], [0, 3]],
[[0, 0], [0, 1], [1, 0], [1, 0]],
];

for (s of shape) {
	s.w = s.reduce((acc, l) => Math.max(acc, l.length), 0);
	s.b = Array(s.w).fill(0).map((_, i) => s.reduce((acc, l, j) => l[i] == '#' ? j : acc, 0));
	s.t = Array(s.w).fill(0).map((_, i) => s.reduce((acc, l, j) => l[i] == '#' ? Math.min(acc, j) : acc, 9));
}
console.log(shapec);

let maxy = [0, 0, 0, 0, 0, 0, 0];
let field = new Set();
let full = (x, y) => {console.log('full', x, y); return x < 0 || x >= 7 || y <= 0 || field.has('' + [x, y])};
let fill = (x, y) => {console.log('fill', x, y); field.add('' + [x, y]);}

let shapei = 0;
let jeti = 0;
let numDropped = 0;
do {
	let sc = shapec[shapei % shapec.length];
	let s = shape[shapei++ % shape.length];
	console.log(s);
	let dx = 2;
	let dy = 3 + s.length + maxy.reduce((acc, cur) => Math.max(acc, cur), 0);

	let collides = false;
	do {
	    console.log('****', 'dx', dx, 'dy', dy);
	    let j = jet[jeti++ % jet.length];
	    let dj = j == '>' ? 1 : -1;
	    console.log(j, dj, dx + dj, dx + s.w - 1 + dj);
	    // todo: check move into terrain
		let jcollides = sc.reduce((acc, cur) => acc || full(cur[0] + dx + dj, dy - cur[1]), false);
		console.log('jcollides', jcollides);
	    if (!jcollides) {
		    dx += dj;
	    } 
	    console.log('dx', dx, 'dy', dy);
	    collides = sc.reduce((acc, cur) => acc || full(cur[0] + dx, dy - 1 - cur[1]), false);
	    console.log('collides: ', collides);
	    !collides && --dy;
	} while (!collides);
	console.log('!!!!', 'dx', dx, 'dy', dy);
	for (x = 0; x < s.w; ++x) {
		maxy[dx + x] = Math.max(maxy[dx + x], dy - s.t[x] );
	}
	sc.reduce((_, cur) => fill(cur[0] + dx, dy - cur[1]), 0);
	console.log('maxy', maxy);
} while(++numDropped < 2022);

console.log('res', maxy.reduce((acc, cur) => Math.max(acc, cur), 0), maxy);
