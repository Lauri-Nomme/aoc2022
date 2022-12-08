var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split('').map(Number));

let scores = Array(input.length).fill([]).map(_ => Array(input[0].length).fill([]).map(_ => []));

let range = (f, t) => [...Array(t + 1).keys()].slice(f);
let coordByH = (a, h, c) => c(...range(h, 9).map(h => a[h]));

let height = input.length;
let width = input[0].length;

let topMaxYByXH = Array(width).fill([]).map(_ => Array(10).fill(0));
let botMinYByXH = Array(width).fill([]).map(_ => Array(10).fill(height - 1));

let scored = 0;

for (y = 0; y < height; ++y) {
	let leftMaxXByH = Array(10).fill(0);
	let rightMinXByH = Array(10).fill(width - 1);
	
	for (x = 0; x < width; ++x) {
		// left
		let h = input[y][x];
		let lmx = coordByH(leftMaxXByH, h, Math.max);
		leftMaxXByH[h] = Math.max(leftMaxXByH[h], x);
		let score = x - lmx;
		scores[y][x][0] = score;

		// right
		let rx = width - 1 - x;
		h = input[y][rx];
		let rmx = coordByH(rightMinXByH, h, Math.min);
		rightMinXByH[h] = Math.min(rightMinXByH[h], rx);
		score = rmx - rx;
		scores[y][rx][1] = score;

		// top
		h = input[y][x];
		let tmy = coordByH(topMaxYByXH[x], h, Math.max);
		topMaxYByXH[x][h] = Math.max(topMaxYByXH[x][h], y);
		score = y - tmy;
		scores[y][x][2] = score;

		// bottom
		let by = height - 1 - y;
		h = input[by][x];
		let bmy = coordByH(botMinYByXH[x], h, Math.min);
		botMinYByXH[x][h] = Math.min(botMinYByXH[x][h], by);
		score = bmy - by;
		scores[by][x][3] = score;
	}
}

let maxScore = -1;
for (a of scores) {
	for (b of a) {
		let score = b.reduce((acc, cur) => acc * cur, 1);
		maxScore = Math.max(maxScore, score);
	}
}

console.log(maxScore);
