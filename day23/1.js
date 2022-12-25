var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n").map(l => l.split(''));
let m = {};

let bx = [+Infinity, -Infinity];
let by = [+Infinity, -Infinity];
for ([y, r] of input.entries()) {
	for ([x, c] of r.entries()) {
		if (c == '#') {
			m[[x, y]] = [x, y];
			bx = [Math.min(bx[0], x), Math.max(bx[1], x)];
			by = [Math.min(by[0], y), Math.max(by[1], y)];
		}
	}
}

let dump = (bx, by, m) => {
	console.log(bx[0], by[0]);
	for (let y = Math.min(0, by[0]); y <= by[1]; ++y) {
		let row = '';
		for (let x = Math.min(0, bx[0]); x <= bx[1]; ++x) {
			row += m[[x, y]] ? '#' : '.';
		}
		console.log(row);
	}
};
let D = [/*N*/[0, -1], /*NE*/[1, -1], /*E*/[1, 0], /*SE*/[1, 1], /*S*/[0, 1], /*SW*/[-1, 1], /*W*/[-1, 0], /*NW*/[-1, -1]];
let add = (l, r) => [l[0] + r[0], l[1] + r[1]];
let mod = (l, r) => { let t = l % r; if (t < 0) t += r; return t; };

let adjacentm = p => {
	return D.reduce((acc, cur, i) => m[add(p, cur)] ? acc.add(i/* + ' ' + add(p, cur)*/) : acc, new Set());	
}

dump(bx, by, m);
let directions = [0, 4, 6, 2];
let direction = 0;
let cycle = 0;
let moves = 0;
do {
	let p = {};
	let pc = {};
	for ([k, v] of Object.entries(m)) {
		let a = adjacentm(v);
		console.log(k, v, a);
		if (a.size) {
			for (let i = 0; i < 4; ++i) {
				let d = directions[(direction + i) % directions.length];
				//console.log('for move', d);
				if (![-1, 0, 1].some(dd => {let x = mod(d + dd, D.length); /*console.log('  check', x);*/return a.has(x);})) {
					let np = add(v, D[d]);
					console.log('direction free', d, D[d], np);
					p[k] = np;
					pc[np] = (pc[np] || 0) + 1;
					break;
				}
			}
		}
	}
	console.log(p);
	console.log(pc);
	bx = [+Infinity, -Infinity];
	by = [+Infinity, -Infinity];
	let nm = {};
	moves = 0;
	for ([k, v] of Object.entries(m)) {
		let np = p[k];
		if (np && pc[np] == 1) {
			np = np;
			++moves;
		} else {
			np = v;
		}
		nm[np] = np;
		bx = [Math.min(bx[0], np[0]), Math.max(bx[1], np[0])];
		by = [Math.min(by[0], np[1]), Math.max(by[1], np[1])];
	}
	m = nm;
	console.log('CYCLE', cycle, 'moves', moves);
	dump(bx, by, nm);
	direction = (direction + 1) % directions.length;
	console.log('direction', direction, directions[direction]);
	cycle++;
} while (moves && cycle < 10);


let empty = 0;
for (let y = by[0]; y <= by[1]; ++y) {
	for (let x = bx[0]; x <= bx[1]; ++x) {
		empty += m[[x, y]] ? 0 : 1;
	}
}
console.log('EMPTY', empty);
