var fs = require('fs')


let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n").map(l => l.split(''));

let mod = (l, r) => {
	let t = l % r;
	if (t < 0) {
		t += r;
	}
	return t;
};

let W = input[0].length - 2;
let H = input.length - 2;

let blizzards = input => {
	let br = [];
	let bl = [];
	let bu = [];
	let bd = [];
	for ([y1, r] of input.entries()) {
		let y = y1 - 1;
		for ([x1, c] of r.entries()) {
			let x = x1 - 1;
			switch (c) {
				case '>': br.push([x, y]); break;
				case '<': bl.push([x, y]); break;
				case '^': bu.push([x, y]); break;
				case 'v': bd.push([x, y]); break;
				case '#':
				case '.':
					break;
				default: throw 'nope ' + c;
			}
		}
	}
	return [br, bl, bu, bd];
}

let blizzardmap = ([br, bl, bu, bd]) => {
	let m = new Set();
	for ([i, r] of br.entries()) {
		m.add('' + r);
		br[i] = [(r[0] + 1) % W, r[1]];
	}
	for ([i, l] of bl.entries()) {
		m.add('' + l);
		bl[i] = [mod(l[0] - 1, W), l[1]];
	}
	for ([i, u] of bu.entries()) {
		m.add('' + u);
		bu[i] = [u[0], mod(u[1] - 1, H)];
	}
	for ([i, d] of bd.entries()) {
		m.add('' + d);
		bd[i] = [d[0], (d[1] + 1) % H];
	}
	return m;
};

let blizzardmaps = bs => {
	let ma = [];
	for (let i = 0; i < W * H; ++i) {
		let m = blizzardmap(bs);
		ma.push(m);
	};
	
	return ma;
};

let [br, bl, bu, bd] = blizzards(input);

let ms = blizzardmaps([br, bl, bu, bd]);
console.log(ms.length);

let S = [0, -1];
let E = [W - 1, H];
console.log('W', W, 'H', H, 'S', S, 'E', E);
let D = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let add = (l, r) => [l[0] + r[0], l[1] + r[1]];

let solve = (q0, target) => {
	let v = {};
	let q = [q0];
	let iter = 0;
	let minsteps = +Infinity;
	while (q.length) {
		++iter;
		let [p, steps] = q.shift();
		if (iter % 10000 == 0) {
			console.log(iter, 'p', p, 'steps', steps, 'minsteps', minsteps, 'v', Object.keys(v).length);
		}
		if (steps + 1 > minsteps) {
			//console.log('bail', steps + 1, minsteps);
			continue;
		}
		if (!ms[(steps + 1) % ms.length].has('' + p)) {
		  let key = '' + [(steps + 1) % (W * H), p];
		  let vv = v[key];
		  if (vv == undefined || vv > steps + 1) {
			  v[key] = steps + 1;
			  q.push([p, steps + 1]);
		  }
		}

		for (d of D) {
			let np = add(p, d);
			if (np[0] == target[0] && np[1] == target[1]) {
				if (steps + 1 < minsteps) {
					console.log('SOL', iter, steps + 1, minsteps, np);
					minsteps = steps + 1;
				}
				continue;
			} 

			if (np[0] < 0 || np[0] >= W || np[1] < 0 || np[1] >= H) {
				continue;
			}

			key = '' + [(steps + 1) % (W * H), np];
			vv = v[key];
			if (vv != undefined && vv <= steps + 1) {
				continue;
			}

			if (ms[(steps + 1) % ms.length].has('' + np)) {
				continue;
			}
		
			v[key] = steps + 1;	
			q.push([np, steps + 1]);
		}

		/*if (iter > 2) {
			process.exit(1);
		}*/
	}
	return minsteps;
}

let res = solve([[0, -1], 0], E);
console.log(res);
res = solve([E, res], S);
console.log(res);
res = solve([S, res], E);
console.log(res);
