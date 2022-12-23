var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n\n");
let map = input[0].split("\n").map(l => l.split(''));


let re = new RegExp("([0-9]+|R|L)", "g")
let path = [];
while (m = re.exec(input[1])) {
	path.push(m[0]);
};

let F = 50;
let FF = [
	[0, 1, 2],
	[0, 3, 0],
	[4, 5, 0],
	[6, 0, 0]
];
let FP = [[]];
for (let y = 0; y < FF.length; ++y) {
	for (let x = 0; x < FF[0].length; ++x) {
		let f = FF[y][x];
		if (f) {
			FP.push([F * x, F * y]);
		}
	}
};

let face = p => {
	let [x, y] = [Math.floor(p[0] / F), Math.floor(p[1] / F)];

	return [
		FF[y][x],
		p[0] % F,
		p[1] % F
	];
};

let RIGHT = 0, DOWN = 1, LEFT = 2, UP = 3;
let wrap = (o, p, d) => {
	let res;
	if (	p[0] < 0 || p[0] >= map[0].length || 
			p[1] < 0 || p[1] >= map.length || 
			map[p[1]][p[0]] == ' ' || map[p[1]][p[0]] == undefined
	   ) {
		let [f, dx, dy] = face(o);
		//console.log('wrap', o, p, d, 'face=', f, 'dx=', dx, 'dy=', dy); 
		if        (f == 1 && d == UP) {
			let nf = 6;
			res = [[FP[nf][0] +  0, FP[nf][1] + dx], RIGHT]; // 6 right
		} else if (f == 6 && d == LEFT) {
			let nf = 1;
			res = [[FP[nf][0] + dy, FP[nf][1] +  0], DOWN]; // 1 down
		} else if (f == 6 && d == RIGHT) {
			let nf = 5;
			res = [[FP[nf][0] + dy, FP[nf][1] +  F - 1], UP]; // 5 up
		} else if (f == 5 && d == DOWN) {
			let nf = 6;
			res = [[FP[nf][0] + F - 1, FP[nf][1] +  dx], LEFT]; // 6 left
		} else if (f == 6 && d == DOWN) {
			let nf = 2;
			res = [[FP[nf][0] + dx, FP[nf][1] +   0], DOWN]; // 2 down
		} else if (f == 2 && d == UP) {
			let nf = 6;
			res = [[FP[nf][0] + dx, FP[nf][1] + F - 1], UP]; // 6 up
		} else if (f == 1 && d == LEFT) {
			let nf = 4;
			res = [[FP[nf][0] + 0, FP[nf][1] + F - 1 - dy], RIGHT]; // 4 right
		} else if (f == 4 && d == LEFT) {
			let nf = 1;
			res = [[FP[nf][0] + 0, FP[nf][1] + F - 1 - dy], RIGHT]; // 1 right
		} else if (f == 4 && d == UP) {
			let nf = 3;
			res = [[FP[nf][0] + 0, FP[nf][1] + dx], RIGHT]; // 3 right
		} else if (f == 5 && d == RIGHT) {
			let nf = 2;
			res = [[FP[nf][0] + F - 1, FP[nf][1] + F - 1 - dy], LEFT]; // 2 left
		} else if (f == 2 && d == RIGHT) {
			let nf = 5;
			res = [[FP[nf][0] + F - 1, FP[nf][1] + F - 1 - dy], LEFT]; // 5 left
		} else if (f == 2 && d == DOWN) {
			let nf = 3;
			res = [[FP[nf][0] + F - 1, FP[nf][1] + dx], LEFT]; // 3 left
		} else if (f == 3 && d == LEFT) {
			let nf = 4;
			res = [[FP[nf][0] + dy, FP[nf][1]], DOWN]; // 4 down
		} else if (f == 3 && d == RIGHT) {
			let nf = 2;
			res = [[FP[nf][0] + dy, FP[nf][1] + F - 1], UP]; // 2 up
		} else {
			throw 'nope';
		}
		//console.log('\t', res);
		return res;
	}

	return [p, d];
};

let D = [[1, 0], [0, 1], [-1, 0], [0, -1]];
let d = 0;
let p = [0, 0];
while (map[p[1]][p[0]] == ' ') p[0]++;
/*p = [57, 0];*/
/*path = ['L', 7];*/
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
			let np = [p[0] + D[d][0], p[1] + D[d][1]];
			[np, nd] = wrap(p, np, d);
			if (map[np[1]][np[0]] == '#') {
				//console.log('blocked@', np, nd);
				break;
			}
			p = np;
			d = nd;
			//console.log('  ', i, p, d);
		}
		//console.log('  ', i, p, d);
	}
}

console.log('END', p, d, 1000 * (p[1] + 1) + 4 * (p[0] + 1) + d);
