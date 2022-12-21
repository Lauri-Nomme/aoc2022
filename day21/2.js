var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => {
		let t = l.split(': ');
		let w = t[1].split(' ');
		let r = [t[0]];
		r.push(...(w.length == 1 ? [Number(w)] : w));
		return r;
	})
	.reduce((acc, cur) => {acc[cur[0]] = cur.slice(1); return acc;}, {});
//console.log(input);

let op = {
	'+': (l, r) => l + r,
	'-': (l, r) => l - r,
	'*': (l, r) => l * r,
	'/': (l, r) => l / r,
};
let m = {};
let eval = id => {
	if (id == 'humn') {
		throw 'human';
	}
	let i = input[id];
	//console.log('eval', id, i);
	if (i.length == 1) {
		return i[0];
	}
	if (m[id] != undefined) {
		return m[id];
	}

	return op[i[1]](eval(i[0]), eval(i[2]));

	m[id] = res;
};

let sym = id => {
	if (id == 'humn') {
		return ['HUMN'];
	}
	let i = input[id];
	if (i.length == 1) {
		return i[0];
	}
	let lhs = sym(i[0]);
	let rhs = sym(i[2]);
	if (typeof(lhs) == 'number' && typeof(rhs) == 'number') {
		return op[i[1]](lhs, rhs);
	}
	console.log(typeof(lhs), typeof(rhs));
	return [i[1], lhs, rhs];
}

let sol = (c, i) => {
	console.log(c, '==', i);
	switch (i[0]) {
		case '*':
			if (typeof(i[1]) == 'number') {
				return sol(c / i[1], i[2]);
			} else if (typeof(i[2]) == 'number') {
				return sol(c / i[2], i[1]);
			}
			throw 'cant * ' + i;
		case '+':
			if (typeof(i[1]) == 'number') {
				return sol(c - i[1], i[2]);
			} else if (typeof(i[2]) == 'number') {
				return sol(c - i[2], i[1]);
			}
			throw 'cant + ' + i;
		case '/':
			if (typeof(i[1]) == 'number') {
				return sol(i[1] / c, i[2]);
			} else if (typeof(i[2]) == 'number') {
				return sol(i[2] * c, i[1]);
			}
			throw 'cant + ' + i;
		case '-':
			if (typeof(i[1]) == 'number') {
				return sol(i[1] - c, i[2]);
			} else if (typeof(i[2]) == 'number') {
				return sol(c + i[2], i[1]);
			}
			throw 'cant + ' + i;
		default:
			throw 'cant ' + i;
	}
}

let rhs = eval(input['root'][2]);
console.log(rhs);
//console.log(eval(input['root'][2]));
console.log(sol(rhs, sym(input['root'][0])));
