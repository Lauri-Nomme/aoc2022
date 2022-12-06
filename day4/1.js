var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trimEnd().split("\n");

let re = new RegExp("([0-9]+)-([0-9]+),([0-9]+)-([0-9]+)", "");
let res = input.reduce((acc, ass) => {
	let [af, at, bf, bt] = re.exec(ass).slice(1, 5).map(x => parseInt(x));
	let contained = (af >= bf && at <= bt) || (bf >= af && bt <= at);
	return acc + (contained ? 1 : 0);
}, 0);

console.log(res);

