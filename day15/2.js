var fs = require('fs')

let c = i => Number(i.split('=')[1].replace(',', '').replace(':', ''));

let md = (c1, c2) => {
	return Math.abs(c1[0] - c2[0]) + Math.abs(c1[1] - c2[1]);
}

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => {
		l = l.split(" ");
		let s = [c(l[2]), c(l[3])];
		let b = [c(l[8]), c(l[9])];
		return [s, b, md(s, b)];
	});


/*let xmin = 0;
let xmax = 20;
let ymin = 0;
let ymax = 20;*/

let xmin = 0;
let xmax = 4000000;
let ymin = 0;
let ymax = 4000000;

let tests = 0;

let blocked = c => {
	if (c[0] < xmin || c[0] > xmax || c[1] < ymin || c[1] > ymax) {
		return true;
	}
	++tests;
	if (tests % 100000 == 0) {
		console.log('%', tests);
	}
	for (t of input) {
		let d = md(c, t[0]);
		if (d <= t[2]) {
			return true;
		}
	}
	return false;
};

for (t of input) {
	console.log('check', t);
	let s = t[0];
	let d = t[2];
	console.log(s, t);
	for (let y = s[1] - d - 1, x = s[0]; y <= s[1] && x >= xmin; ++y, --x) {
		if (!blocked([x, y])) {
			console.log(x, y);
			process.exit(1);
		}
	}
	for (let y = s[1] + d + 1, x = s[0]; y > s[1] && x >= xmin; --y, --x) {
		if (!blocked([x, y])) {
			console.log(x, y);
			process.exit(1);
		}
	}
	for (let y = s[1] - d - 1, x = s[0]; y <= s[1] && x <= xmax; ++y, ++x) {
		if (!blocked([x, y])) {
			console.log(x, y);
			process.exit(1);
		}
	}
	for (let y = s[1] + d + 1, x = s[0]; y > s[1] && x <= xmax; --y, ++x) {
		if (!blocked([x, y])) {
			console.log(x, y);
			process.exit(1);
		}
	}
}

console.log(tests);
