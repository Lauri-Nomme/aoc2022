var fs = require('fs')

let input = ("\n" + fs.readFileSync(process.argv[2] || 'input.txt').toString()).split("\n$");
input.push('cd /');

let cwd = [];
let sizes = [];
let size = 0;

let aggSizeBelowThreshold = 0;

function up() {
	cwd.pop();
	let parentSize = sizes.pop();
	console.log('<<', 'parentSize', parentSize, 'size', size);
	if (size <= 100000) {
		console.log('#', 'aggSizeBelowThreshold', aggSizeBelowThreshold, ' += ', size);
		
		aggSizeBelowThreshold += size;	
	}
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

console.log('END', cwd, 'aggSizeBelowThreshold', aggSizeBelowThreshold);
