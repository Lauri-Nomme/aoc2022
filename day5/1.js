var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd().split("\n\n");

let stacks = [];
let initialRows = input[0].split("\n");
for (row of initialRows) {
	let i = 1;
	do {
		let col = row.slice(0, 4);
		row = row.slice(4);
		let crate = col[1];
		if (col[0] == '[' && crate != ' ') {
			if (!stacks[i]) {
				stacks[i] = [];
			}
			stacks[i].unshift(crate);
		}
		++i;
	} while (row != '');
}

let dump = x => x.forEach((y, i) => console.log(i, ' ', y.join("")));

let moves = input[1].split("\n");
let re = new RegExp("move ([0-9]+) from ([0-9+]) to ([0-9]+)", "");
for (move of moves) {
	//console.log(move);
	let [count, from, to] = re.exec(move).slice(1, 4).map(x => parseInt(x));
	for (i = 0; i < count; ++i) {
		//dump(stacks);
		let crate = stacks[from].pop();
		stacks[to].push(crate);
		//dump(stacks);
	}
}

console.log(stacks.map(stack => stack.pop()).join(""));
