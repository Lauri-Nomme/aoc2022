var fs = require('fs')

let starts = [];
let end = [];
let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map((l, y) => l.split("").map((c, x) => {
			if (c == 'S') {
				starts.push([y, x]);
				c = 'a';
			} else if (c == 'E') {
				end = [y, x];
				c = 'z';
			} else if (c == 'a') {
				starts.push([y, x]);
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
		let ch = input[c[0]][c[1]];
		if (ch == 0) {
			res = Math.min(res, l);
			console.log('found solution', res, l);
		} else {
			for (d of ds(c)) {
				let vv = v['' + d];
				if (!vv || vv > l + 1) {
					if ((ch - input[d[0]][d[1]]) <= 1) {
						v['' + d] = l + 1;
						q.push([d, l + 1]);
					}
				}
			}
		}
	}

	return res;
};

console.log(starts, end);
console.log(my, mx);

let res = visit([[end, 0]], {});
console.log(res); 

