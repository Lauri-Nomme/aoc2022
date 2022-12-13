var fs = require('fs')

let start = [];
let end = [];
let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n\n");

let parse = (s, i) => {
	if (s[i] == '[') {
		++i;
		let res = [];
		while (s[i] != ']') {
			let item = parse(s, i);
			res.push(item[0]);
			i = item[1];
			if (s[i] == ',') {
				++i;
			}
		}
		return [res, ++i];
	}

	let res = 0;
	while ('0' <= s[i] && s[i] <= '9') {
		res = res * 10 + (s[i] - '0');
		++i;
	}
	return [res, i];
}

let compare = (l, r) => {
	if (!Array.isArray(l) && !Array.isArray(r)) {
		return l - r;
	}

	if (Array.isArray(l) && Array.isArray(r)) {
		let limit = Math.min(l.length, r.length);
		for (let i = 0; i < limit; ++i) {
			let res = compare(l[i], r[i]);
			if (res != 0) {
				return res;
			}
		}

		return l.length - r.length;
	}

	if (!Array.isArray(l)) {
		return compare([l], r);
	}

	if (!Array.isArray(r)) {
		return compare(l, [r]);
	}
};

let sumOrderedI = 0;
let pairI = 0;
for (pair of input) {
	++pairI;
	let [i1, i2] = pair.split("\n");
	i1 = parse(i1, 0)[0];
	i2 = parse(i2, 0)[0];
	let cmp = compare(i1, i2);;
	if (cmp < 0) {
		sumOrderedI += pairI;
	}
	console.log(i1, '###', i2, '=>', cmp);
}

console.log(sumOrderedI);
