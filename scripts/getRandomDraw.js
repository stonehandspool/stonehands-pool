import * as path from 'path';
import minimist from 'minimist';
import { readFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year, week } = args;

// First, validate that we received a valid year
if (isNaN(year)) {
  console.log('Please make sure that the first param is a valid year');
  console.log(`Expected a year but got: ${year}`);
  process.exit();
}

// Next, validate that we received a valid week
if (isNaN(week)) {
  console.log('Please make sure that the second param is a valid week');
  console.log(`Expected a week but got: ${week}`);
  process.exit();
}

// Simple fisher yates shuffle to ensure everyone has a fair chance
const shuffleArray = array => {
  // Loop from the end of the array down to the second element
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // ES6 swap syntax
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Now, get the current list of picksheets from that week
const weeklyPicks = await JSON.parse(await readFile(path.resolve(`data/${year}/football/weeklyPicks/week${week}.json`)))
  .picks;

// First, filter out any picks that weren't actually made by a person
const actualPicks = weeklyPicks.filter(picks => picks.id !== -1);
shuffleArray(actualPicks);
const winner = actualPicks[0];
console.log(
  `The winner of the week's random draw is ${winner.submission_data.firstName} ${winner.submission_data.lastName}`
);
