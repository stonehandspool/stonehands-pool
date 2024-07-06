import * as fs from 'node:fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjcyNzAsImV4cCI6MTk4ODgwMzI3MH0.2VfUzB0S6IK-5jIgbqClhgrVBVcCY84q8Cd39FcbYZA';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const args = process.argv;
const year = args[args.length - 1];

// First, validate that we received a valid year
if (isNaN(year)) {
    console.log('Please make sure that the first param is a valid year');
    console.log(`Expected a year but got: ${year}`);
    process.exit();
}

// Now check to see if a folder exists for that year, if it doesn't create a folder
if (!fs.existsSync(path.resolve(`data/${year}`))) {
    console.log(`Making a directory in data for the year of ${year}`);
    fs.mkdirSync(path.resolve(`data/${year}`), { recursive: true });
}

// Now create a team data json file to keep track of them teams for that season
const teams = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAC', 'KC', 'LAC', 'LA', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS'];
const displayNames = ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago', 'Cincinnati', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Green Bay', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'LA Chargers', 'LA Rams', 'Las Vegas', 'Miami', 'Minnesota', 'New England', 'New Orleans', 'NY Giants', 'NY Jets', 'Philadelphia', 'Pittsburgh', 'Seattle', 'San Francisco', 'Tampa Bay', 'Tennessee', 'Washington'];
const teamsArr = [];
teams.forEach((team, index) => {
    teamsArr.push({
        teamCode: team,
        displayName: displayNames[index],
        wins: 0,
        losses: 0,
        ties: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        homeWins: 0,
        homeLosses: 0,
        awayWins: 0,
        awayLosses: 0,
        streak: 'W0',
    });
});
const asJson = JSON.stringify(teamsArr, null, 2);
fs.writeFileSync(path.resolve(`data/${year}/football/teams.json`), asJson);
console.log(`Created a new file at data/${year}/football/teams.json in order to keep track of the teams`);

// Now create a season data json file to keep track of the scores throughout the season
const weeks = Array.from({ length: 18 }, (_, i) => i + 1); // Create the 18 weeks
const weeklyPicksArr = [];
weeks.forEach((week) => {
    weeklyPicksArr.push({ id: `week_${week}`, picks: [] });
});
const weeklyPicksAsJson = JSON.stringify(weeklyPicksArr, null, 2);
fs.writeFileSync(path.resolve(`data/${year}/football/weeklyPicks.json`), weeklyPicksAsJson);
console.log(`Created a new file at data/${year}/football/weeklyPicks.json in order to keep track of the weekly results`);

// Now create the players json file
const { data, error } = await supabaseClient
    .from('user_info')
    .select();

if (error) {
    console.log('An error occurred when trying to connect to supabase');
    console.log(error);
    process.exit();
}

if (data) {
    const playersArr = [];
    data.forEach((dataRow) => {
        const { id, username, first_name: firstName, last_name: lastName } = dataRow;
        playersArr.push({
            id,
            username,
            firstName,
            lastName,
            wins: 0,
            winsByWeek: [],
            losses: 0,
            lossesByWeek: [],
            ties: 0,
            tiesByWeek: [],
            percent: 0,
            points: 0,
            pointsByWeek: [],
            tbAvg: 0,
            tiebreakerByWeek: [],
            lastWeekRank: 0,
            currentWeekRank: 0,
            rankByWeek: [],
            change: "--",
            currentWeekWins: 0,
            currentWeekLosses: 0,
            currentWeekTies: 0,
            currentWeekPoints: 0,
            currentWeekTiebreaker: 0,
            survivorPicks: [],
            aliveInSurvivor: true,
            marginPicks: [],
            marginTotal: 0,
            highFiveValues: [],
            highFiveTotal: 0,
            highFiveThisWeek: [],
        });
    });
    const playersAsJson = JSON.stringify(playersArr, null, 2);
    fs.writeFileSync(path.resolve(`data/${year}/football/players.json`), playersAsJson);
    console.log(`Created a new file at data/${year}/football/players.json in order to keep track of the players results`);
}

process.exit();