var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split(",").map(Number));

let sd = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
let p = (l, r) => [l[0] + r[0], l[1] + r[1], l[2] + r[2]];

let g = new Set();
let x = [Number.MAX_VALUE, Number.MIN_VALUE];
let y = [Number.MAX_VALUE, Number.MIN_VALUE];
let z = [Number.MAX_VALUE, Number.MIN_VALUE];

for (i of input) {
	g.add('' + i);
	x[0] = Math.min(x[0], i[0]);
	x[1] = Math.max(x[1], i[0]);
	y[0] = Math.min(y[0], i[1]);
	y[1] = Math.max(y[1], i[1]);
	z[0] = Math.min(z[0], i[2]);
	z[1] = Math.max(z[1], i[2]);
}

x[0]--;
x[1]++;
y[0]--;
y[1]++;
z[0]--;
z[1]++;

//console.log(x, y, z);
let inbounds = c => 
	x[0] <= c[0] && c[0] <= x[1] &&
	y[0] <= c[1] && c[1] <= y[1] &&
	z[0] <= c[2] && c[2] <= z[1];

let q = [[x[0], y[0], z[0]]];
let visited = new Set(q[0]);
let steps = 0;
let sides = 0;
while (q.length) {
	++steps;
	let c = q.pop();
	sides = sd.reduce((acc, s) => {
		let next = p(c, s);
		let nextkey = '' + next;
		if (inbounds(next)) {
			if (g.has(nextkey)) {
				++acc;
			} else {
			  if (!visited.has(nextkey)) {
				q.push(next);
				visited.add(nextkey);
			  }
			}
		}
		return acc;
	}, sides);
}

console.log(sides, steps, visited.size);
