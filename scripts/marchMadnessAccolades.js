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
  '2a1aafff-343a-452a-a8ad-f6c114c51f1c',
  '1c2c4e7e-c5b8-44a1-bf3a-dbf7449ddb14',
  'c23344ec-74a5-4059-b16b-b165e1a11138',
  '95691265-52cc-4c61-8aa4-7dc4586dce3e',
  '00481fee-90e5-416d-a51d-6988122500de',
  'a55189bd-505f-4b33-95fb-897d259fe149',
  '5d6278ea-a207-4350-a2a5-ebba13175a97',
  '891b628d-34ef-4959-a722-c4b467c24cae',
  '02bee9d4-ea65-4930-801b-91eb457b39d1',
  '89f5f4c1-16a0-4469-9a5d-e3b0dfe89d88',
  '9afffce2-a8dd-424d-b522-e60b68fc956f',
  'e132281b-062d-405b-8fe2-293150c6e326',
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
