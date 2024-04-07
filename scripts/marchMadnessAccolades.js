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
const playerData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/marchmadness/playerPicks.json`))
);

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
        // Only get the top 5 most forgetful people
        indecisivePeopleDataToExport.data.push(person);
    }
});

yearlyAccolades.push(indecisivePeopleDataToExport);

