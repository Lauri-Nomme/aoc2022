var fs = require('fs')

let input = ("\n" + fs.readFileSync(process.argv[2] || 'input.txt').toString()).split("\n$");
input.push('cd /');

let cwd = [];
let sizes = [];
let size = 0;
let allSizes = [];

let TOTAL_CAPACITY = 70000000;
let REQUIRED_FREE = 30000000;

function up() {
	cwd.pop();
	let parentSize = sizes.pop();
	console.log('<<', 'parentSize', parentSize, 'size', size);
	allSizes.push(size);
	size += parentSize;
}

for (exec of input) {
	let lines = exec.split("\n");
	let [cmd, arg] = lines[0].trim().split(" ");
	console.log("> " + exec + "!", "[" + cmd + "]", "[" + arg + "]");
	switch (cmd) {
		case '':
			break;

		case 'cd':
			if (arg == '/') {
				while (cwd.length > 0) {
					up();
				}
			} else if (arg == '..') {
				up();
			} else {
				cwd.push(arg);
				sizes.push(size);
				size = 0;
			}
			console.log('* cwd ', cwd);
			break;

		case 'ls':
			size = lines.slice(1)
							.map(e => e.split(' ')[0])
							.filter(s => s != 'dir')
							.map(Number)
							.reduce((acc, cur) => acc + cur, 0);
			break;

		default:
			throw 'unhandled cmd ' + cmd;
	}

	console.log('sizes', sizes);
}

let toDelete = REQUIRED_FREE - (TOTAL_CAPACITY - size);
allSizes.push(size);
console.log('END', cwd, 'size', size, 'toDelete', toDelete);
let res = allSizes
	.filter(s => s >= toDelete)
	.reduce((acc, cur) => cur < acc ? cur : acc, Number.MAX_VALUE);
console.log(res);
