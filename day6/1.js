var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trim().split("");
console.log(input);

let counts = {};
let marker = [];
let i = 0;
for (c of input) {
	++i;
	console.log('--- process ' + c);
	if (marker.length == 4) {
		let retire = marker.shift();
		console.log('retire ', retire);
		if (0 == --counts[retire]) {
			delete counts[retire];
		}
	}
	marker = marker.concat(c);
	counts[c] = (counts[c] || 0) + 1;
	console.log(marker);
	let lenCounts = Object.keys(counts).length;
	if (lenCounts == 4) {
		console.log(i);
		break;
	}
	console.log('counts', counts, lenCounts);
}
