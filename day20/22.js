var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n")
	.map(Number)
	.map(i => i * 811589153);

let m = (l, r) => {let tmp = l % r; while (tmp < 0) tmp += r; return tmp;};

let w = input.length;
let i0;
let v = Array(w).fill(0).map((_, i) => {let ii = input[i]; if (ii == 0) i0 = i; return ii;} );
let l = Array(w).fill(0).map((_, i) => m((i - 1), w));
let r = Array(w).fill(0).map((_, i) => m((i + 1), w));

let dump = _ => {
	let i = 0
	let c = w;
	let x = [];
	while (c) {
		x.push('[' + i + ']' + v[i]);
		i = r[i];
		--c;
	}
	console.log('-----');
	console.log('  ', x.join(', '));
	console.log('r=', r.join(', '));
	console.log('l=', l.join(', '));
};

for (let round = 0; round < 10; ++round) {
  for (let i = 0; i < w; ++i) {
	  let s = i;
	  let vv = v[s];
	  vv = vv % (w - 1);
	  let d = vv > 0 ? 1 : vv < 0 ? -1 : 0;
	  let vvv = vv;
	  let j = s;
	  while (vvv != 0) {
		  if (d == 1) {
			  j = r[j];
		  } else {
			  j = l[j];
		  }
		  vvv += -d;
	  }
	  if (d == -1) j = l[j];
	  if (s != j) {
		// unlink
		let ls = l[s];
		let rs = r[s];
		r[ls] = rs;
		l[rs] = ls;
		// insert after j
		let rj = r[j];
		r[j] = s;
		r[s] = rj;
		l[rj] = s;
		l[s] = j;
	  }
  }
}

let c1k = 1000 % w;
let c2k = 2000 % w;
let c3k = 3000 % w;

let i1k = i0;
while (c1k--) {
	i1k = r[i1k];
}
let i2k = i0;
while (c2k--) {
	i2k = r[i2k];
}
let i3k = i0;
while (c3k--) {
	i3k = r[i3k];
}
console.log(v[i1k],v[i2k], v[i3k], 'sum=', v[i1k] + v[i2k] + v[i3k]);
