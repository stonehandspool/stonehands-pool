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
    'These were my favorite bracket titles that people submitted in no particular order. Some made me laugh, some confused me, some were even thought provoking! Thanks to everyone for an entertaining list of bracket titles!',
  data: [],
};

// Now print it out
console.log();
console.log('The best bracket titles');
const winnerIds = [
  '9b47458c-0ecb-46ac-a3be-bc189012a795',
  '32df21b5-d57b-4477-9f94-1ec20edbd2e5',
  '25803613-0b97-459b-9ae1-fddc0ccde3c7',
  'afa00dd0-0bb9-4b71-8271-c123c51898b5',
  'e267d0ae-c957-4619-83db-17f31670efe3',
  'd9985b83-08de-4e96-bcbc-e348666a554c',
  '118b0007-ed0b-445e-b2fa-70d6d97ee7f3',
  'ec6ff5e0-8731-42db-84b8-30d639c7f857',
  '2d8ab3f1-5791-4386-8132-475ed9aae7d1',
  'c44d8e67-4f49-4fc7-a044-936023ce88a5',
  '2c470e65-6165-4807-bfea-3071c51716a3',
  'cd139e47-03f7-4075-9bb7-c9c65048373c',
  'dc6fb755-76be-483a-bc8e-cc17e138367f',
  '3641e603-22f7-4904-b176-3538cb0a66cd',
  'd42850f1-bdd7-484b-88cc-8d58df10d63a',
  '80316b62-ecba-4b00-a2ea-c90cf05e4130',
  '8a23b6a0-7357-442d-a225-5d8b09840748',
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
