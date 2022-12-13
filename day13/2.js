var fs = require('fs')

let start = [];
let end = [];
let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.filter(l => l != '');

input.push('[[2]]');
input.push('[[6]]');

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

let parsed = input.map(i => parse(i, 0)[0]);
let sorted = parsed.sort((l, r) => compare(l, r));

let d1 = parse("[[2]]", 0)[0];
let d2 = parse("[[6]]", 0)[0];
let d1i, d2i;
for (i = 0; i < sorted.length; ++i) {
	if (d1i == null && 0 == compare(sorted[i], d1)) {
		d1i = i;
	}
	if (d2i == null && 0 == compare(sorted[i], d2)) {
		d2i = i;
	}
}

++d1i;
++d2i;
console.log(d1i, d2i, d1i * d2i);
