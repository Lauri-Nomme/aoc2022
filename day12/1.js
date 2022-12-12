var fs = require('fs')

let start = [];
let end = [];
let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map((l, y) => l.split("").map((c, x) => {
			if (c == 'S') {
				start = [y, x];
				c = 'a';
			} else if (c == 'E') {
				end = [y, x];
				c = 'z';
			}
			return c.charCodeAt() - 'a'.charCodeAt();
		})
	);
let my = input.length;
let mx = input[0].length;

let ds = c => {
	let res = [];
	if (c[0] > 0) res.push([c[0] - 1, c[1]]);
	if (c[0] + 1 < my) res.push([c[0] + 1, c[1]]);
	if (c[1] > 0) res.push([c[0], c[1] - 1]);
	if (c[1] + 1 < mx) res.push([c[0], c[1] + 1]);

	return res;
};

let i = 0;
let visit = (q, v) => {
	let res = Number.MAX_VALUE;
	while (q.length > 0) {
		let [c, l] = q.pop();
		if (++i % 10000 == 0)
			console.log(q.length, Object.keys(v).length, res);
		if (c[0] == end[0] && c[1] == end[1]) {
			res = Math.min(res, l);
		} else {
			let ch = input[c[0]][c[1]];
			for (d of ds(c)) {
				let vv = v['' + d];
				if (!vv || vv > l + 1) {
					if ((input[d[0]][d[1]] - ch) <= 1) {
						v['' + d] = l + 1;
						q.push([d, l + 1]);
					}
				}
			}
		}
	}

	return res;
};

console.log(start, end);
console.log(my, mx);

let res = visit([[start, 0]], {});
console.log(res); 

