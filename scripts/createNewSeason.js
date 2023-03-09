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
} else {
    console.log(`A directory already exists for the year ${year}`);
    process.exit();
}

// Now create a team data json file to keep track of them teams for that season
const teams = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LAC', 'LAR', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS'];
const displayNames = ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago', 'Cinncinati', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Green Bay', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'LA Chargers', 'LA Rams', 'Las Vegas', 'Miami', 'Minnesota', 'New England', 'New Orleans', 'NY Giants', 'NY Jets', 'Philadelphia', 'Pittsburgh', 'Seattle', 'San Francisco', 'Tampa Bay', 'Tennessee', 'Washington'];
const teamObj = { teams: {} };
teams.forEach((team, index) => {
    teamObj.teams[team] = {
        "displayName": displayNames[index],
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "points_for": 0,
        "points_against": 0,
        "home_wins": 0,
        "home_losses": 0,
        "away_wins": 0,
        "away_losses": 0,
        "steak": "W0"
    };
});
const asJson = JSON.stringify(teamObj, null, 2);
fs.writeFileSync(path.resolve(`data/${year}/teams.json`), asJson);
console.log(`Created a new file at data/${year}/teams.json in order to keep track of the teams`);

// Now create a season data json file to keep track of the scores throughout the season
const weeks = Array.from({ length: 18 }, (_, i) => i + 1); // Create the 18 weeks
const matchups = Array.from({ length: 16 }, (_, i) => i + 1); // A max of 16 games each week
const seasonObj = { weeks: {} };
weeks.forEach((week) => {
    seasonObj.weeks[`week_${week}`] = {};
    matchups.forEach((matchup) => {
        const wk = seasonObj.weeks[`week_${week}`];
        wk[`matchup_${matchup}`] = {
            "home_team": "",
            "away_team": "",
            "home_score": 0,
            "away_score": 0,
            "winner": ""
        };
    });
});
const seasonAsJson = JSON.stringify(seasonObj, null, 2);
fs.writeFileSync(path.resolve(`data/${year}/season.json`), seasonAsJson);
console.log(`Created a new file at data/${year}/season.json in order to keep track of the weekly results`);

// TODO: Take the csv export of the users and convert that to a json object to use for the season standings
const { data, error } = await supabaseClient
    .from('user_info')
    .select();

if (error) {
    console.log('An error occurred when trying to connect to supabase');
    console.log(error);
    process.exit();
}

if (data) {
    const playersObj = { players: [] };
    data.forEach((dataRow) => {
        const { id, username, first_name: firstName, last_name: lastName } = dataRow;
        playersObj.players.push({
            id,
            username,
            firstName,
            lastName,
            wins: 0,
            losses: 0,
            ties: 0,
            percent: 0,
            points: 0,
            tbAvg: 0,
            weeks: 0,
            games: 0,
            lastWeek: 0,
            currentWeek: 0,
            change: "--",
            survivorPicks: [],
            aliveInSurvivor: true,
            marginPicks: [],
            marginTotal: 0,
            highFiveValues: [],
            highFiveTotal: 0,
        });
    });
    const playersAsJson = JSON.stringify(playersObj, null, 2);
    fs.writeFileSync(path.resolve(`data/${year}/players.json`), playersAsJson);
    console.log(`Created a new file at data/${year}/players.json in order to keep track of the players results`);
} 

process.exit();