var fs = require('fs')

let input = fs.readFileSync(process.argv[2] || 'input.txt').toString().trim().split("\n");
let x = {A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3};
let decrypt = i => x[i];

let rounds = input.map(i => i.split(" ").map(decrypt));

let defeats = (l, r) => (l == 1 && r == 3) || (l == 3 && r == 2) || (l == 2 && r == 1);
let score = lr => lr[1] + (defeats(lr[1], lr[0]) ? 6 : (defeats(lr[0], lr[1]) ? 0 : 3));

let scores = rounds.map(score);
let totalScore = scores.reduce((a, c) => a + c, 0);
console.log(totalScore);
