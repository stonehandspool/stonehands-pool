import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year, week } = args;

// First make sure we received a valid year and week
if (isNaN(week) || (parseInt(week, 10) < 1 && parseInt(week, 10) > 18)) {
    console.log(`Please make sure that a valid week between 1 and 18 was passed in, got: ${week}`);
    process.exit();
}

if (isNaN(year)) {
    console.log('Please submit a valid year');
    process.exit();
}

// Get the data from the season results json file
const seasonData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/season.json`))
);
const weekData = seasonData.weeks[`week_${week}`];

// Get the data from the players json file
const playerData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/players.json`))
);
const { players } = playerData;

// Get the data from the weekly picks json file
const weeklyPicksData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/weeklyPicks.json`))
);

const weeklyPicks = weeklyPicksData.weeklyPicks[`week_${week}`];

const numGamesInWeek = Object.keys(weekData).length;
const lastGame = weekData[`matchup_${numGamesInWeek}`];

// Build up current standings with all needed info
const currentStandings = [];
for (let i = 0; i < players.length; i++) {
    const playerInfo = players[i];
    const playerPicks = weeklyPicks.find(picks => picks.user_id === playerInfo.id);
    const neededInfo = {
        id: playerInfo.id,
        name: `${playerInfo.firstName.trim()} ${playerInfo.lastName.trim()}`,
        wins: playerInfo.currentWeekWins,
        losses: playerInfo.currentWeekLosses,
        points: playerInfo.currentWeekPoints,
        tiebreaker: playerInfo.currentWeekTiebreaker,
        lastGameWinner: playerPicks.submission_data[`matchup-${numGamesInWeek - 1}`],
        lastGameConfidence: playerPicks.submission_data[`matchup-${numGamesInWeek - 1}-confidence`],
    };
    currentStandings.push(neededInfo);
}

// Sort them by the current standings (we don't know the tiebreaker so don't factor it in here)
currentStandings.sort((row1, row2) => {
    // const row1Tb = Math.abs(MONDAY_NIGHT_TOTAL - row1.tiebreaker);
    // const row2Tb = Math.abs(MONDAY_NIGHT_TOTAL - row2.tiebreaker);
    return row2.points - row1.points || row2.wins - row1.wins; // || row1Tb - row2Tb;
});

// Now, calculate all of the potential outcomes (up to the maximum tiebreaker guessed this week)
const maxTiebreaker = Math.max(...currentStandings.map(picks => picks.tiebreaker));
console.log(maxTiebreaker);
const potentialWinners = [];

// First, start with the away team
let winningTeam = lastGame.away_team;
for (let i = 0; i < maxTiebreaker; i++) {
    const currentTiebreakerStandings = [];
    for (let j = 0; j < currentStandings.length; j++) {
        const copy = JSON.parse(JSON.stringify(currentStandings[j]));
        if (copy.lastGameWinner === winningTeam) {
            copy.wins++;
            
        }
    }
}

