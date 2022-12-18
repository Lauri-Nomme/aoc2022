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
	shape.w = shape.reduce((acc, cur) => Math.max(acc, cur[0]), 0);
	shape.hx = Array(shape.w + 1).fill(0).map((_, x) => shape.reduce((acc, cur) => cur[0] == x ? Math.min(acc, cur[1]) : acc, 9999));
}

//console.log(shapec);

//let field = new Set();
//let screen = [];
let full = (field, x, y) => {/*console.log('full', x, y);*/ return x < 0 || x >= 7 || y <= 0 || field.has(x + 10 * y)};
let fill = (field, x, y) => {/*console.log('fill', x, y);*/ field.add(x + 10 * y); 
	/*screen[y] = screen[y] || Array(7).fill('.'); 
	screen[y][x] = '#';*/
}
/*let dump = _ => {
	for (i = screen.length - 1; i >= 0; --i) {
		console.log((screen[i] || []).join(''));
	}
};*/

let limit = Number(process.argv[3] || 1000000000000);
let m = {};
let hit = 0;
let repeatstart;
let repeatmid;
let repeatd;

let findRepeat = (shapei, jeti, maxysr, maxy, numDropped) => {
	  let key = '' + [shapei, jeti, maxysr];
	  if (m[key] == 1 && hit < 1) {
		  console.log('HIT', shapei, jeti, 'maxy', maxy, 'dropped', numDropped, maxysr.join('-'));
		  repeatstart = {shapei, jeti, maxy, numDropped, maxysr};
		  hit = 1;
		  m[key] = 2;
	  } else if (m[key] == 2) { 
		  console.log('HIT2', shapei, jeti, 'maxy', maxy, 'dropped', numDropped, maxysr.join('-'));
		  repeatmid = {shapei, jeti, maxy, numDropped, maxysr};
		  repeatd = {maxy: maxy - repeatstart.maxy, numDropped: numDropped - repeatstart.numDropped};
		  hit = 2;
		  m[key] = 3;
	  } else if (m[key] == 3) { 
		  console.log('HIT3', shapei, jeti, 'maxy', maxy, 'dropped', numDropped, maxysr.join('-'));
		  console.log(repeatd);
		  let repeatv = {maxy: maxy - repeatmid.maxy, numDropped: numDropped - repeatmid.numDropped};
		  console.log(repeatv);
		  if (repeatv.maxy != repeatd.maxy || repeatv.numDropped != repeatd.numDropped) {
			  console.log('nooooes!');
			  process.exit(1);
		  }
		  return {repeatstart, repeatd};
	  } else {
		  m[key] = 1;
	  }
};

let ffs = (shapei, jeti, numDropped, maxys, maxysr, maxy, field, aux) => {
  do {
	  let r = aux(shapei, jeti, maxysr, maxy, numDropped);
	  if (r) {
		return r;
	  }
	  let s = shapec[shapei++ % shapec.length];
	  shapei %= shapec.length;
	  //console.log('DROP', s);
	  let dx = 2;
	  let dy = 3 + s.h + maxy;

	  let collides = false;
	  do {
		  //console.log('****', 'dx', dx, 'dy', dy);
		  let j = jet[jeti++ % jet.length];
		  jeti %= jet.length;
		  let dj = j == '>' ? 1 : -1;
		  //console.log(j, dj, dx + dj);
		  
		  let jcollides = s.some(cur => full(field, cur[0] + dx + dj, dy - cur[1]));
		  /*let jjc = s.some(cur => cur[0] + dx + dj < 0 || cur[0] + dx + dj >= 7);
		  if (jcollides ^ jjc) {
			  console.log('mismatch', jjc, jcollides, s.map(cur => cur[0] + dx + dj).join(' '));
		  }*/
		  //console.log('jcollides', jcollides);
		  if (!jcollides) {
			  dx += dj;
		  } 
		  //console.log('dx', dx, 'dy', dy);
		  collides = s.some(cur => full(field, cur[0] + dx, dy - 1 - cur[1]));
		  //console.log('collides: ', collides);
		  !collides && --dy;
	  } while (!collides);
	  //console.log('!!!!', 'dx', dx, 'dy', dy);
	  maxy = Math.max(maxy, dy);
	  for (i = 0; i <= s.w; ++i) {
		  maxys[dx + i] = Math.max(maxys[dx + i], dy - s.hx[i]);
	  }
	  maxysr = maxys.map(y => maxy - y);
	  s.reduce((_, cur) => fill(field, cur[0] + dx, dy - cur[1]), 0);
	  //console.log('maxy', maxy, maxys);
	  //process.exit(1);
	  //dump();
  } while(++numDropped < limit);

	return {maxy, numDropped};
}

let res = ffs(0, 0, 0, Array(7).fill(0), Array(7).fill(0), 0, new Set(), findRepeat);
console.log('res', res);
let repeats = Math.floor((limit - res.repeatstart.numDropped) / res.repeatd.numDropped);
console.log('repeats', repeats);

let maxy = res.repeatstart.maxy + res.repeatd.maxy * repeats;
let numDropped = res.repeatstart.numDropped + res.repeatd.numDropped * repeats;
let maxys = res.repeatstart.maxysr.map(yr => maxy - yr);

let field = maxys.reduce((acc, y, x) => acc.add(x + 10 * y), new Set());
console.log('field setup', field);

res = ffs(
	res.repeatstart.shapei, 
	res.repeatstart.jeti,
	numDropped,
	res.repeatstart.maxysr.map(yr => maxy - yr),
	res.repeatstart.maxysr,
	maxy,
	field,
	_ => {}
);
console.log(res);
	
