var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split(' ').map((e, i) => i == 1 ? Number(e) : e));

let cycle = 0;
let x = 1;
let screen = [];

let step = () => {
	let px = Math.abs((cycle % 40) - x) <= 1 ? '#' : '.';
	++cycle;
	screen.push(px);
	//console.log('[' + cycle + ']', x);
};

step();

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

while (screen.length) {
	let row = screen.slice(0, 40);
	console.log(row.join(''));
	screen = screen.slice(40);
}
