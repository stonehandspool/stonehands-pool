import * as path from 'path';
import minimist from 'minimist';
import { writeFile } from 'fs/promises';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjcyNzAsImV4cCI6MTk4ODgwMzI3MH0.2VfUzB0S6IK-5jIgbqClhgrVBVcCY84q8Cd39FcbYZA';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
    console.log('Please submit a valid year');
    process.exit();
}

// Now create the players json file
const { data, error } = await supabaseClient
    .from('march_madness_picks')
    .select();

if (error) {
    console.log('An error occurred when trying to connect to supabase');
    console.log(error);
    process.exit();
}

if (data) {
    const playerPicks = [];
    data.forEach((pickInfo) => {
        const {
            submission_data: submissionData,
            user_id: userId,
            times_updated: timesUpdated,
            tiebreaker,
        } = pickInfo;
        const {
            firstName,
            lastName,
            username,
            userPicks,
            bracketTitle,
            points,
            numCorrect,
            numIncorrect,
            pointsByRound,
            currentMaxPoints,
            startingMaxPoints,
        } = submissionData;
        playerPicks.push({
            firstName,
            lastName,
            userId,
            username,
            timesUpdated,
            tiebreaker,
            points,
            numCorrect,
            numIncorrect,
            pointsByRound,
            currentMaxPoints,
            startingMaxPoints,
            userPicks,
            bracketTitle,
        });
    });
    const playersAsJson = JSON.stringify(playerPicks, null, 2);
    await writeFile(path.resolve(`data/${year}/marchmadness/playerPicks.json`), playersAsJson);
    console.log(`Created a new file at data/${year}/marchmadness/playerPicks.json in order to keep track of the players results`);
}