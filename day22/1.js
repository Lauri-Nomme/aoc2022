var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n\n");
let map = input[0].split("\n").map(l => l.split(''));

let re = new RegExp("([0-9]+|R|L)", "g")
let path = [];
while (m = re.exec(input[1])) {
	path.push(m[0]);
}

let wrap = (p, d) => {
	let pi = p;
	do {
	  if (p[0] < 0 || p[0] >= map[0].length) {
		  p[0] = d == 0 ? 0 : map[0].length - 1;
	  } else if (p[1] < 0 || p[1] >= map.length) {
		  p[1] = d == 1 ? 0 : map.length - 1;
	  }
	  if (map[p[1]][p[0]] == ' ' || map[p[1]][p[0]] == undefined) {
		  p = [p[0] + D[d][0], p[1] + D[d][1]];
	  } else {
		  return p;
	  }
	} while (true);
};
let D = [[1, 0], [0, 1], [-1, 0], [0, -1]];
let d = 0;
let p = [0, 0];
while (map[p[1]][p[0]] == ' ') p[0]++;
console.log('START', p, d);


let ii = 0;
for (i of path) {
	//console.log('\nSTEP', ii++, '[' + i + ']', p, d);
	if (i == 'R') {
		d = ++d % D.length;
		//console.log(' ', i, d);
	} else if (i == 'L') {
		d = --d % D.length;
		while (d < 0) d += D.length;
		//console.log(' ', i, d);
	} else {
		//console.log(i);
		while (i--) {
			//console.log('  d', d);
			let n = [p[0] + D[d][0], p[1] + D[d][1]];
			n = wrap(n, d);
			if (map[n[1]][n[0]] == '#') {
				break;
			}
			p = n;
			//console.log('  ', i, p);
		}
		//console.log('  ', i, p);
	}
}

console.log('END', p, d, 1000 * (p[1] + 1) + 4 * (p[0] + 1) + d);
