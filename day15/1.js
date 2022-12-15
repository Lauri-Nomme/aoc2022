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

let blocked = new Set();
let beacons = new Set();
let y = 2000000;
for (i of input) {
	if (i[1][1] == y) {
		beacons.add('' + i[1]);
	}
}

for (i of input) {
	if (true/*i[0][0] == 8 && i[0][1] == 7*/) {
		let xd = i[2] - Math.abs(i[0][1] - y);
		let xl = i[0][0] - xd;
		let xr = i[0][0] + xd;
		for (let x = xl; x <= xr; ++x) {
			if (!beacons.has('' + [x, y])) {
				blocked.add('' + [x, y]);
			}
		}
	}
}

//console.log(blocked);
console.log(blocked.size);
