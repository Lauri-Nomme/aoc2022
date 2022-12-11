var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd()
	.split("\n\n").map(l => l.split("\n").map(l => l.trimStart().split(' ')));

let getOp = s => {
	switch(s[4]) {
		case '*': {
			let a = Number(s[5]);
			return s[5] == 'old' ? o => o * o : o => o * a;
		}

		case '+': {
			let a = Number(s[5]);
			return s[5] == 'old' ? o => o + o : o => o + a;
		}
			
		default:
			throw 'unhandled op ' + s;
	}
};

let getLcm = arr => {
	let gcd = (a, b) => {
        return !b ? a : gcd(b, a % b);
    }

    let lcm = (a, b) => {
        return (a * b) / gcd(a, b);   
    }

    let multiple = arr.shift();
    arr.forEach(n => {
        multiple = lcm(multiple, n);
    });
	return multiple;
};

let monkeys = [];

for (monkeyS of input) {
	let monkey = {
		items: monkeyS[1].slice(2).map(i => Number(i.replace(',', ''))),
		op: getOp(monkeyS[2]),
		test: Number(monkeyS[3][3]),
		targetT: Number(monkeyS[4][5]),
		targetF: Number(monkeyS[5][5])
	};
	monkeys.push(monkey);
};

console.log(monkeys);
let inspections = Array(monkeys.length).fill(0);

let lcmM = getLcm(monkeys.map(m => m.test));
console.log('lcm', lcmM);

for (round = 0; round < 10000; ++round) {
	for (mi = 0; mi < monkeys.length; ++mi) {
		let m = monkeys[mi];
		let itemI = 0;
		while (m.items.length) {
			++inspections[mi];
			let item = m.items.shift();
			item = m.op(item);
			item = item % lcmM;
			let target = item % m.test == 0 ? m.targetT : m.targetF;
			monkeys[target].items.push(item);
		}
	}
	monkeys.map(m => console.log(m.items));
}

console.log(inspections);
let si = inspections.sort((l, r) => r - l);
console.log(si);
console.log(si[0] * si[1]);
