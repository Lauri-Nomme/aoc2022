var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split('').map(Number));

let totalVisible = 0;
let leftMaxHeight = -1;
let rightMaxHeight = -1;
let topMaxHeight = -1;
let bottomMaxHeight = -1;
let visible = Array(input.length).fill([]).map(_ => Array(input[0].length).fill(0));

for (y = 0; y < input.length; ++y) {
	leftMaxHeight = -1;
	rightMaxHeight = -1;
	let row = input[y];
	let rl = row.length;

	for (x = 0; x < rl; ++x) {
		if (leftMaxHeight < 9) {
			let l = row[x];
			if (!visible[y][x] && l > leftMaxHeight) {
				++visible[y][x];
				++totalVisible;
			}
			leftMaxHeight = Math.max(leftMaxHeight, l);
		}
		if (rightMaxHeight < 9) {
			let rx = rl - 1 - x;
			let r = row[rx];
			if (!visible[y][rx] && r > rightMaxHeight) {
				++visible[y][rx];
				++totalVisible;
			}
			rightMaxHeight = Math.max(rightMaxHeight, r);
		}
		if (leftMaxHeight == 9 && rightMaxHeight == 9) {
			break;
		}
	}
}

let cl = input.length;
for (x = 0; x < input[0].length; ++x) {
	topMaxHeight = -1;
	bottomMaxHeight = -1;

	for (y = 0; y < cl; ++y) {
		if (topMaxHeight < 9) {
			let t = input[y][x];
			if (!visible[y][x] && t > topMaxHeight) {
				++visible[y][x];
				++totalVisible;
			}
			topMaxHeight = Math.max(topMaxHeight, t);
		}
		if (bottomMaxHeight < 9) {
			let by = cl - 1 - y;
			let b = input[by][x];
			if (!visible[by][x] && b > bottomMaxHeight) {
				++visible[by][x];
				++totalVisible;
			}
			bottomMaxHeight = Math.max(bottomMaxHeight, b);
		}
		if (topMaxHeight == 9 && bottomMaxHeight == 9) {
			break;
		}
	}
}

console.log(input);
console.log(visible);
console.log(totalVisible);
