var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trim().split("\n");
let x = {A: 1, B: 2, C: 3};
let y = {
	X: {1: 3, 2: 1, 3: 2}, // lose
	Y: {1: 1, 2: 2, 3: 3}, // draw
	Z: {1: 2, 2: 3, 3: 1}, // win
};
let decrypt = i => x[i];
let play = (opponent, outcome) => y[outcome][opponent];
let decryptAndPlay = moveOutcome => [decrypt(moveOutcome[0]), play(decrypt(moveOutcome[0]), moveOutcome[1])];

let rounds = input.map(i => decryptAndPlay(i.split(" ")));

let defeats = (l, r) => (l == 1 && r == 3) || (l == 3 && r == 2) || (l == 2 && r == 1);
let score = lr => lr[1] + (defeats(lr[1], lr[0]) ? 6 : (defeats(lr[0], lr[1]) ? 0 : 3));

let scores = rounds.map(score);
let totalScore = scores.reduce((a, c) => a + c, 0);
console.log(totalScore);
