import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
  console.log('Please submit a valid year');
  process.exit();
}

const yearlyAccolades = [];

// Get the data from the players json file
const playerData = await JSON.parse(await readFile(path.resolve(`data/${year}/marchmadness/playerPicks.json`)));

// First, find the most unsure people (the people who changed their bracket the most)
const indecisivePeopleDataToExport = {
  id: 'indecisivePeople',
  title: 'Most Indecisive People',
  description: 'These are the people who made the most changes to their bracket before the tournament started',
  data: [],
};

// Sort the playerData by the number of times they changed their bracket
playerData.sort((a, b) => b.timesUpdated - a.timesUpdated);

// Now print it out
console.log('The most indecisive people');
playerData.forEach((person, index) => {
  if (person.timesUpdated > 0) {
    console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.timesUpdated}`);
  }
  if (index < 5) {
    // Only get the top 5 most indecisive people
    indecisivePeopleDataToExport.data.push(person);
  }
});

yearlyAccolades.push(indecisivePeopleDataToExport);

// Now get the most ambitious people
const ambitiousPeopleDataToExport = {
  id: 'ambitiousPeople',
  title: 'Most Ambitious People',
  description:
    'These are the people who had the highest maximum points at the beginning of the tournament (most upsets picked)',
  data: [],
};

// Sort the playerData by the starting max points
playerData.sort((a, b) => b.startingMaxPoints - a.startingMaxPoints);

// Now print it out
console.log();
console.log('The most ambitious people');
playerData.forEach((person, index) => {
  if (index < 5) {
    console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.startingMaxPoints}`);
    // Only get the top 5 most ambitious people
    ambitiousPeopleDataToExport.data.push(person);
  }
});

yearlyAccolades.push(ambitiousPeopleDataToExport);

// Now get the most accurate people
const accuratePeopleDataToExport = {
  id: 'accuratePeople',
  title: 'Top 5 Overall (Wins)',
  description: 'These are the people who got the most games correct throughout the tournament',
  data: [],
};

// Sort the playerData by the num correct
playerData.sort((a, b) => b.numCorrect - a.numCorrect);

// Now print it out
console.log();
console.log('The most accurate people');
playerData.forEach((person, index) => {
  if (index < 5) {
    console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.numCorrect} - ${person.numIncorrect}`);
    // Only get the top 5 most accurate people
    accuratePeopleDataToExport.data.push(person);
  }
});

yearlyAccolades.push(accuratePeopleDataToExport);

// Now get the most successful people
const successfulPeopleDataToExport = {
  id: 'successfulPeople',
  title: 'Top 5 Overall (Points)',
  description: 'These are the people who got the most points throughout the tournament',
  data: [],
};

// Sort the playerData by the num correct
playerData.sort((a, b) => b.points - a.points);

// Now print it out
console.log();
console.log('The most successful people');
playerData.forEach((person, index) => {
  if (index < 5) {
    console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.points}`);
    // Only get the top 5 most successful people
    successfulPeopleDataToExport.data.push(person);
  }
});

yearlyAccolades.push(successfulPeopleDataToExport);

// Now get the least accurate people
const inaccuratePeopleDataToExport = {
  id: 'inaccuratePeople',
  title: 'Bottom 5 Overall (Wins)',
  description: 'These are the people who got the least games correct throughout the tournament',
  data: [],
};

// Sort the playerData by the num correct
playerData.sort((a, b) => a.numCorrect - b.numCorrect);

// Now print it out
console.log();
console.log('The most inaccurate people');
playerData.forEach((person, index) => {
  if (index < 5) {
    console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.numCorrect} - ${person.numIncorrect}`);
    // Only get the top 5 most inaccurate people
    inaccuratePeopleDataToExport.data.push(person);
  }
});

yearlyAccolades.push(inaccuratePeopleDataToExport);

// Now get the least successful people
const unsuccessfulPeopleDataToExport = {
  id: 'unsuccessfulPeople',
  title: 'Bottom 5 Overall (Points)',
  description: 'These are the people who got the least points throughout the tournament',
  data: [],
};

// Sort the playerData by the num correct
playerData.sort((a, b) => a.points - b.points);

// Now print it out
console.log();
console.log('The most unsuccessful people');
playerData.forEach((person, index) => {
  if (index < 5) {
    console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.points}`);
    // Only get the top 5 most unsuccessful people
    unsuccessfulPeopleDataToExport.data.push(person);
  }
});

yearlyAccolades.push(unsuccessfulPeopleDataToExport);

// Now get the best bracket titles
const bestBracketTitleDataToExport = {
  id: 'bestBracketTitles',
  title: 'Best Bracket Titles',
  description:
    "These were my favorite bracket titles that people submitted in no particular order. I don't know what they all mean, but they all gave me a good laugh. I just want it known that one of them is a lie.",
  data: [],
};

// Now print it out
console.log();
console.log('The best bracket titles');
const winnerIds = [
  '03e4b85e-2916-4bc8-8551-8275c6ffdd98',
  '1c2c4e7e-c5b8-44a1-bf3a-dbf7449ddb14',
  '2a1aafff-343a-452a-a8ad-f6c114c51f1c',
  '56e6b6e8-258d-4c10-bca3-09b7f243a598',
  '00481fee-90e5-416d-a51d-6988122500de',
  '11642444-4a38-42b3-8f2f-01b34bb50aef',
  'f7a41044-fda1-466e-b017-e8df3c5f3249',
  '183817fa-4e6f-4573-8cfb-85ffd769b430',
  '25d5f59c-4977-4471-bc29-e289c9b888a7',
  '11c577d3-f0d5-4690-ab51-40aced33087d',
  '3db7628e-5bb5-44f1-a180-2dd2cc74d529',
  '41a9d38c-b7bd-493b-b3d3-81d5a00a314e',
  'd50c6628-596f-4c11-a9b2-43775b1ab69f',
];
winnerIds.forEach((winnerId, index) => {
  const person = playerData.find(p => p.userId === winnerId);
  console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.bracketTitle}`);
  bestBracketTitleDataToExport.data.push(person);
});

yearlyAccolades.push(bestBracketTitleDataToExport);

const accoladesAsJson = JSON.stringify(yearlyAccolades, null, 2);
await writeFile(path.resolve(`data/${year}/marchmadness/accolades.json`), accoladesAsJson);
console.log(`Created a new file at data/${year}/marchmadness/accolades.json`);
