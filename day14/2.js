var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n");

let sign = x => x > 0 ? 1 : (x < 0 ? -1 : 0);

let field = [];
let height = 0;

let empty = c => {
	if (c[0] < 0) {
		return false;
	}

	if (c[1] >= height) {
		console.log('returning floor @ ', c);
		return false;
	}

	if (!field[c[1]]) {
		return true;
	}
	let s = field[c[1]][c[0]];
	//console.log('read', s);
	return s != '#' && s != 'o';
};

for (line of input) {
	let segments = line.split(' -> ').map(s => s.split(',').map(Number));
	let prev = segments.shift();
	while (segments.length) {
		let curr = segments.shift();
		let d = [curr[0] - prev[0], curr[1] - prev[1]];
		d = [sign(d[0]), sign(d[1])];
		let i = [prev[0], prev[1]];
		do {
			field[i[1]] = field[i[1]] || [];
			field[i[1]][i[0]] = '#';
			i[0] += d[0];
			i[1] += d[1];
			field[i[1]] = field[i[1]] || [];
			field[i[1]][i[0]] = '#';
		} while (i[0] != curr[0] || i[1] != curr[1]);

		prev = curr;
	}
}
height = field.length + 1;

let drop = (x, y) => {
	let c = [x, y];

	do {
		//console.log('curr', c);
			if (!(c[1] + 1 < height + 2)) {
				console.log('fall out');
				return false;
			}
			let down = [c[0], c[1] + 1];
			let left = [c[0] - 1, c[1] + 1];
			let right = [c[0] + 1, c[1] + 1];
			if (empty(down)) {
				//console.log('down');
				c = down;
			} else if (empty(left)) {
				//console.log('left');
				c = left;
			} else if (empty(right)) {
				//console.log('right');
				c = right;
			} else {
				//console.log('break');
				break;
			}
	} while (true);
	console.log('final', c);

	field[c[1]] = field[c[1]] || [];
	field[c[1]][c[0]] = 'o';

	if (c[0] == 500 && c[1] == 0) {
		console.log('blocked');
		return false;
	}
	return true;
};

console.log(field);
let grain = 0;
for (grain = 0; ; ++grain) {
	console.log('drop', grain);
	if (!drop(500, 0)) {
		break;
	}
}
console.log('grain', grain);
