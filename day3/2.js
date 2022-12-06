var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd().split("\n");

let toSet = l => l.split("").reduce((a, c) => a.add(c), new Set());
let intersect = (a, b) => new Set(
	  Array.from(a).filter(x => b.has(x))
);

let prio = c => { 
	let cc = c.charCodeAt();
	return cc >= 97 ? cc - 96 : cc - 38;
}

let res = input.reduce((acc, cur) => {
	let s = toSet(cur);
	switch (acc[0]) {
		case 0:
			return [1, acc[1], s];

		case 1:
			return [2, acc[1], intersect(s, acc[2])];

		case 2:
			let i = intersect(s, acc[2]).values().next().value;
			console.log(s, acc[2], i);
			return [0, acc[1] + prio(i), null];

	}
}, [0, 0, null]);

console.log(res);
