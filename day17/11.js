var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(l => l.split(""));
let jet = input[0];

let shapec = [
[[0, 0], [1, 0], [2, 0], [3, 0]],
[[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
[[2, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
[[0, 0], [0, 1], [0, 2], [0, 3]],
[[0, 0], [0, 1], [1, 0], [1, 1]],
];

['_', '+', 'J', '|', 'o'].forEach((c, i) => shapec[i].name = c);
for (shape of shapec) {
	shape.h = 1 + shape.reduce((acc, cur) => Math.max(acc, cur[1]), 0);
}

console.log(shapec);

let field = new Set();
let screen = [];
let full = (x, y) => {console.log('full', x, y); return x < 0 || x >= 7 || y <= 0 || field.has('' + [x, y])};
let fill = (x, y) => {console.log('fill', x, y); field.add('' + [x, y]); 
	screen[y] = screen[y] || Array(7).fill('.'); 
	screen[y][x] = '#';
}
let dump = _ => {
	for (i = screen.length - 1; i >= 0; --i) {
		console.log((screen[i] || []).join(''));
	}
};

let shapei = 0;
let jeti = 0;
let numDropped = 0;
let maxy = 0;
do {
	let s = shapec[shapei++ % shapec.length];
	console.log('DROP', s);
	let dx = 2;
	let dy = 3 + s.h + maxy;

	let collides = false;
	
	do {
	    console.log('****', 'dx', dx, 'dy', dy);
	    let j = jet[jeti++ % jet.length];
	    let dj = j == '>' ? 1 : -1;
	    console.log(j, dj, dx + dj);
	    
		let jcollides = s.some(cur => full(cur[0] + dx + dj, dy - cur[1]));
		console.log('jcollides', jcollides);
	    if (!jcollides) {
		    dx += dj;
	    } 
	    console.log('dx', dx, 'dy', dy);
	    collides = s.some(cur => full(cur[0] + dx, dy - 1 - cur[1]));
	    console.log('collides: ', collides);
	    !collides && --dy;
	} while (!collides);
	console.log('!!!!', 'dx', dx, 'dy', dy);
	maxy = Math.max(maxy, dy);
	s.reduce((_, cur) => fill(cur[0] + dx, dy - cur[1]), 0);
	console.log('maxy', maxy);
	//dump();
} while(++numDropped < Number(process.argv[3] || 2022));

console.log('res', maxy);
