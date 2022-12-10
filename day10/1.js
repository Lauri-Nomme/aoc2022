var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split(' ').map((e, i) => i == 1 ? Number(e) : e));

let cycle = 1;
let x = 1;

let dbgsum = 0;
let dbgbp = 20;

let step = () => {
	++cycle;
	console.log('[' + cycle + ']', x);
	if (cycle == dbgbp) {
		dbgsum += x * cycle;
		console.log('BP', dbgbp, x, x * cycle, dbgsum);
		if (dbgbp == 220) {
			dbgbp == -1;
		} else {
			dbgbp += 40;
		}
	}
};

for (ins of input) {
	switch (ins[0]) {
		case 'noop':
			step();
			break;

		case 'addx':
			step();
			x += ins[1];
			step();
			break;
	}
}
