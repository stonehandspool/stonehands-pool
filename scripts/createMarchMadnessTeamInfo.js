import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
  console.log('Please submit a valid year');
  process.exit();
}

// Get the data from the season results json file
const bracketData = await JSON.parse(await readFile(path.resolve(`data/${year}/marchmadness/matchups.json`)));

// TODO: Next year this is what will be the starting file
// const seedingOrder = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];

const teams = [];
bracketData.forEach(matchupInfo => {
  const { topTeam, bottomTeam } = matchupInfo;
  if (topTeam.name !== null) {
    const { seed, name, record } = topTeam;
    teams.push({
      seed,
      name,
      record,
      alive: true,
    });
  }

  if (bottomTeam.name !== null) {
    const { seed, name, record } = bottomTeam;
    teams.push({
      seed,
      name,
      record,
      alive: true,
    });
  }
});

const teamsStringified = JSON.stringify(teams, null, 2);
await writeFile(path.resolve(`data/${year}/marchmadness/teams.json`), teamsStringified);
