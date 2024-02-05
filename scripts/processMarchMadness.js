import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
    console.log('Please submit a valid year');
    process.exit();
}

// Get the bracket data
const bracketData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/marchmadness/matchups.json`))
);

// Get the data from the players json file
const playerData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/marchmadness/playerPicks.json`))
);
