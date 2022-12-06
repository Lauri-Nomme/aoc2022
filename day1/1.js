var fs = require('fs')

let input = fs.readFileSync('input.txt').toString().split("\n\n");
let foodPerElf = input.map(foodsStr => foodsStr
	.split("\n")
	.map(f => parseInt(f))
	.reduce((a, c) => a + c, 0)
);

let one = foodPerElf.reduce((a, c) => c > a ? c : a, -1);
console.log(one);

let two = foodPerElf.reduce((a, c) => c != NaN && c > a[2] ? a.concat(c)
	.sort((l, r) => r - l) 
	.slice(0, 3)
	: a, 
	[-1, -1, -1]
);
console.log(two);


