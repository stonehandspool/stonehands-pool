import * as path from 'path';
import minimist from 'minimist';
import { readFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
    console.log('Please submit a valid year');
    process.exit();
}

const TEAM_CODES = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAC', 'KC', 'LAC', 'LA', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS'];

// Get the data from the players json file
const playerData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/players.json`))
);
const { players } = playerData;

// Get the data from the season json file
const seasonData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/season.json`))
);
const { weeks } = seasonData;

// Get the data from the weekly picks json file
const pickData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/weeklyPicks.json`))
);
const { weeklyPicks } = pickData;

// First, find the most forgetful people (i.e. people who failed to submit their picksheet the most)
const forgetfulPeople = [];
for (const weekKey in weeklyPicks) {
    const weeksPicks = weeklyPicks[weekKey];
    weeksPicks.forEach((pickInfo) => {
        const { submission_id: submissionId, submission_data: submissionData, user_id: userId } = pickInfo;
        if (submissionId === -1) {
            // If the submissionId is -1 that means that that person never made picks that week
            const { firstName, lastName } = submissionData;
            const forgetfulPerson = forgetfulPeople.find(person => person.userId === userId);
            if (!forgetfulPerson) {
                forgetfulPeople.push({ userId, firstName, lastName, timesForgotten: 1 });
            } else {
                forgetfulPerson.timesForgotten++;
            }
        }
    });
}

// Now sort in order of who was the most forgetful
forgetfulPeople.sort((a, b) => b.timesForgotten - a.timesForgotten);

// Now print it out (we want to add it to a json file eventually)
forgetfulPeople.forEach((person, index) => {
    if (person.timesForgotten > 0) {
        console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.timesForgotten}`);
    }
});

// Now, get who was the most eager player (i.e. who submitted their picksheet the earliest each week)
const eagerPeople = [];
for (const weekKey in weeklyPicks) {
    const weeksPicks = weeklyPicks[weekKey];
    const weeklyEager = [];
    weeksPicks.forEach((pickInfo) => {
        const { submission_id: submissionId, submission_data: submissionData, user_id: userId } = pickInfo;
        if (submissionId !== -1) {
            // If they forgot they just don't get included for the week
            const { firstName, lastName } = submissionData;
            weeklyEager.push({ userId, firstName, lastName, submissionId });
        }
    });
    weeklyEager.sort((a, b) => a.submissionId - b.submissionId);
    // Now add the each person to the array so we can average after looping through
    weeklyEager.forEach((person, index) => {
        const { userId, firstName, lastName } = person;
        const personInfo = eagerPeople.find(info => info.userId === userId);
        if (!personInfo) {
            eagerPeople.push({ userId, firstName, lastName, places: [index + 1], average: 0 });
        } else {
            personInfo.places.push(index + 1);
        }
    });
}

// Now get the averages
eagerPeople.forEach((personInfo) => {
    personInfo.average = personInfo.places.reduce((a, b) => a + b) / personInfo.places.length
});

eagerPeople.sort((a, b) => a.average - b.average);

console.log();
console.log('Most Eager People');
for (let i = 0; i < 6; i++) {
    // Going to do the first 6 people because most likely I'll always be in the top 5
    const personInfo = eagerPeople[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.average}`);
}

console.log();
console.log('Least Eager People');
for (let i = eagerPeople.length - 5; i < eagerPeople.length; i++) {
    // Going to do the first 6 people because most likely I'll always be in the top 5
    const personInfo = eagerPeople[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.average}`);
}
