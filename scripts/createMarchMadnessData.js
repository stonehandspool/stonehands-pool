import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
  console.log('Please submit a valid year');
  process.exit();
}

// Get the teams and their records
const teamData = await JSON.parse(await readFile(path.resolve(`data/${year}/marchmadness/teams.json`)));

function getRound(i) {
  if (i < 49) {
    return 2;
  } else if (i < 57) {
    return 3;
  } else if (i < 61) {
    return 4;
  } else if (i < 63) {
    return 5;
  }
  return 6;
}

const matchups = [];

let increment = 32;
let teamIndex = 0;
// Fill in the first round
for (let i = 1; i <= 32; i++) {
  const topTeamData = teamData[teamIndex];
  const bottomTeamData = teamData[teamIndex + 1];
  matchups.push({
    id: `matchup-${i}`,
    topTeam: {
      seed: topTeamData.seed,
      name: topTeamData.name,
      record: topTeamData.record,
    },
    bottomTeam: {
      seed: bottomTeamData.seed,
      name: bottomTeamData.name,
      record: bottomTeamData.record,
    },
    topScore: 0,
    bottomScore: 0,
    winner: null,
    evaluated: false,
    round: 1,
    nextMatchup: `matchup-${i + increment}`,
  });

  if (i % 2 === 1) {
    increment--;
  }
  teamIndex += 2;
}

// Fill in the rest of the rounds
for (let i = 33; i <= 63; i++) {
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
    evaluated: false,
    round: getRound(i),
    nextMatchup: i === 63 ? null : `matchup-${i + increment}`,
  });
  if (i % 2 === 1) {
    increment--;
  }
}

const asJson = JSON.stringify(matchups, null, 2);
await writeFile(path.resolve(`data/${year}/marchmadness/matchups.json`), asJson);
console.log(`Created a new file at data/${year}/marchmadness/matchups.json in order to keep track of the teams`);
