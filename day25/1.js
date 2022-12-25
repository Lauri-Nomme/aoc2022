var fs = require('fs')

let s2d = i => {
	switch (i) {
	  case '0': return 0;
	  case '1': return 1;
	  case '2': return 2;
	  case '-': return -1;
	  case '=': return -2;
	  default: throw 'nope ' + i;
  };
};
let d2s = i => {
	switch (i) {
		case 0: return '0';
		case 1: return '1';
		case 2: return '2';
		case -1: return '-';
		case -2: return '=';
		default: throw 'nope ' + i;
	}
};

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n").map(l => l.split('').map(i => s2d(i)));

let res1 = input.reduce((acc, cur) => {
	for (let i = cur.length - 1, j = 0; i >= 0; --i, ++j) {
		acc[j] = (acc[j] || 0) + cur[i];	
	}
	return acc;
}, []);

console.log(res1);
let i = 0;
while (i < res1.length) {
	while (res1[i] > 2) {
		res1[i] -= 5;
		res1[i + 1] = (res1[i + 1] || 0) + 1;
	}
	while (res1[i] < -2) {
		res1[i] += 5;
		res1[i + 1] = (res1[i + 1] || 0) - 1;
	}
	++i;
}

console.log(res1);
console.log(res1.map(i => d2s(i)).reverse().join(''));
