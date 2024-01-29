import * as fs from 'node:fs';
import * as path from 'path';

const args = process.argv;
const year = args[args.length - 1];

// First, validate that we received a valid year
if (isNaN(year)) {
    console.log('Please make sure that the first param is a valid year');
    console.log(`Expected a year but got: ${year}`);
    process.exit();
}

const matchups = [];
const seedingOrder = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];

let increment = 32;
let teamIndex = 1;
let seedingIndex = 0;
// Fill in the first round
for (let i = 1; i <= 32; i++) {
    matchups.push({
        id: `matchup-${i}`,
        topTeam: {
            seed: seedingOrder[seedingIndex],
            name: `Team${teamIndex}`,
            record: '0-0',
        },
        bottomTeam: {
            seed: seedingOrder[seedingIndex + 1],
            name: `Team${teamIndex + 1}`,
            record: '0-0',
        },
        topScore: 0,
        bottomScore: 0,
        winner: null,
        evaluated: false,
        nextMatchup: `matchup-${i + increment}`,
    });
    if (i % 2 === 1) {
        increment--;
    }
    if (seedingIndex < seedingOrder.length - 2) {
        seedingIndex += 2;
    } else {
        seedingIndex = 0;
    }
    teamIndex += 2;
}

// Fill in the rest of the rounds
for (let i = 33; i <=63; i++) {
    matchups.push({
        id: `matchup-${i}`,
        topTeam: {
            seed: null,
            name: null,
            record: null,
        },
        bottomTeam: {
            seed: null,
            name: null,
            record: null,
        },
        topScore: 0,
        bottomScore: 0,
        winner: null,
        nextMatchup: i === 63 ? null : `matchup-${i + increment}`,
    });
    if (i % 2 === 1) {
        increment--;
    }
}

const asJson = JSON.stringify(matchups, null, 2);
fs.writeFileSync(path.resolve(`data/${year}/marchmadness/matchups.json`), asJson);
console.log(`Created a new file at data/${year}/marchmadness/matchups.json in order to keep track of the teams`);