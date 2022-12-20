var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => {let w = l.split(" "); return [w[6], w[12], w[18], w[21], w[27], w[30]].map(Number);});
let COO = 0, CCO = 1, CBO = 2, CBC = 3, CGO = 4, CGB = 5;
let O = 0, C = 1, B = 2, G = 3;

let visit = (cost, start) => {
	console.log(cost);
	let res = -1;
	let i = 0;
	let q = [start];
	let v = new Set();
	let maxcost0 =  Math.max(cost[0], cost[1], cost[2], cost[4]);
	while (q.length) {
		++i;
		let [m, r, t] = q.pop();
		/*if (t == 24 - 7) {
			console.log('STATE', i, res, q.length, m, r, t);
		}*/
		if (v.has('' + [m, r, t])) {
			//console.log('dupe', m, r, t);
			continue;
		}
		v.add('' + [m, r, t]);
		if (i % 1000000 == 0) {
			console.log(i, res, q.length, m, r, t);
		}
		if (t == 0) {
			if (m[G] > res) {
				res = Math.max(res, m[G]);
				console.log('MAX', i, res, q.length, v.size, m, r, t);
			}
		} else {
			let nextm = [m[0] + r[0], m[1] + r[1], m[2] + r[2], m[3] + r[3]];
			/**/
			nextm[0] = Math.min(nextm[0], t * maxcost0);
			nextm[1] = Math.min(nextm[1], t * cost[3]);
			nextm[2] = Math.min(nextm[2], t * cost[5]);
			/**/
			let s0 = [nextm, r, t-1];
			!v.has('' + s0) && q.push(s0);

			if (t > 1) {
			  if (nextm[0] + r[0] * t < maxcost0 * t && m[O] >= cost[COO]) {
				  let s1 = [[nextm[0] - cost[COO], nextm[1], nextm[2], nextm[3]], [r[0] + 1, r[1], r[2], r[3]], t - 1];
				  /*!v.has('' + s1) &&*/ q.push(s1);
			  }
			  if (nextm[1] + r[1] * t < cost[CBC] * t && m[0] >= cost[CCO]) {
				  let s2 = [[nextm[0] - cost[CCO], nextm[1], nextm[2], nextm[3]], [r[0], r[1] + 1, r[2], r[3]], t - 1];
				  /*!v.has('' + s2) &&*/ q.push(s2);
			  }
			  if (nextm[2] + r[2] * t < cost[CGB] * t && m[0] >= cost[CBO] && m[C] >= cost[CBC]) {
				  let s3 = [[nextm[0] - cost[CBO], nextm[1] - cost[CBC], nextm[2], nextm[3]], [r[0], r[1], r[2] + 1, r[3]], t - 1];
				  /*!v.has('' + s3) &&*/ q.push(s3);
			  }
			  if (m[0] >= cost[CGO] && m[B] >= cost[CGB]) {
				  let s4 = [[nextm[0] - cost[CGO], nextm[1], nextm[2] - cost[CGB], nextm[3]], [r[0], r[1], r[2], r[3] + 1], t - 1];
				  /*!v.has('' + s4) &&*/ q.push(s4);
			  }
			}
		}
	}
	return res;
};

let si = 1;
let ans = 1;
input = input.slice(0, 3);
for (s of input) {
	let res = visit(s, [[0, 0, 0, 0], [1, 0, 0, 0], 32]);
	ans *= res;
	console.log(si, res, ans);
	++si;
}

console.log(ans);
