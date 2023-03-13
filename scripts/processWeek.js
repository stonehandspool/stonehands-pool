import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';
import minimist from 'minimist';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjcyNzAsImV4cCI6MTk4ODgwMzI3MH0.2VfUzB0S6IK-5jIgbqClhgrVBVcCY84q8Cd39FcbYZA';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const args = minimist(process.argv.slice(2));
const { year, week } = args;
const CURRENT_YEAR = '2023-2024'; // For the database

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

// Get the data from the teams json file
const teamsData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/teams.json`))
);
const { teams } = teamsData;

// Get the data from the weekly picks json file
const weeklyPicksData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/weeklyPicks.json`))
);
const { weeklyPicks } = weeklyPicksData;

// Get the weeks picks from the database
const { data, error } = await supabaseClient
    .from('user_picks')
    .select()
    .eq('week', week)
    .eq('year', CURRENT_YEAR);

if (error) {
    console.log(error);
    process.exit();
}

const allSubmissions = data;

// Move this data to the weekly picks json file
weeklyPicks[`week_${week}`] = [...allSubmissions];

// Now write to the players json file so that it is saved
const updatedWeeklyPicks = JSON.stringify(weeklyPicks, null, 2);
await writeFile(path.resolve(`data/${year}/weeklyPicks.json`), updatedWeeklyPicks);

const findSubmission = (submissionId) => {
    return allSubmissions.find(submission => submission.user_id === submissionId);
};

const findMatchupByTeam = (teamName) => {
    let foundMatchup;
    Object.keys(weekData).map(key => {
        const matchup = weekData[key];
        if (matchup.home_team === teamName || matchup.away_team === teamName) {
            foundMatchup = matchup;
        }
    });

    return foundMatchup;
};

// Now evaluate all of the responses and update the files
const numGamesThisWeek = Object.keys(weekData).length;
players.forEach(player => {
    // The player object is the season-long data for the player which needs to be updated
    // First, get the submission data for that player
    const playerSubmissionFromDB = findSubmission(player.id);
    const { submission_data: picks } = playerSubmissionFromDB;
    let weeklyWins = 0;
    let weeklyLosses = 0;
    let weeklyTies = 0;
    let weeklyPoints = 0;   

    // First, evaluate all of the confidence pool picks
    for (let i = 0; i < numGamesThisWeek; i++) {
        const userChoice = picks[`matchup-${i}`];
        const userConfidence = parseInt(picks[`matchup-${i}-confidence`], 10);
        const result = weekData[`matchup_${i + 1}`].winner;
        if (result === userChoice) {
            weeklyWins++;
            weeklyPoints += userConfidence;
        } else if (result === 'Tie') {
            weeklyTies++;
            weeklyPoints += (userConfidence / 2);
        } else {
            weeklyLosses++;
        }
    }

    // Update the players information
    player.currentWeekWins = weeklyWins;
    player.currentWeekLosses = weeklyLosses;
    player.currentWeekTies = weeklyTies;
    player.currentWeekPoints = weeklyPoints;
    player.currentWeekTiebreaker = picks.tiebreaker;
    player.wins += weeklyWins;
    player.losses += weeklyLosses;
    player.ties += weeklyTies;
    player.percent = (player.wins + (player.ties / 2)) / (player.wins + player.losses + player.ties);
    player.points += weeklyPoints;
    player.weeks++;
    const totalTbPoints = player.tbAvg * player.weeks;
    player.tbAvg = (totalTbPoints + parseInt(picks.tiebreaker, 10)) / player.weeks;
    player.games += numGamesThisWeek

    // Now evaluate the survivor pool pick
    if (player.aliveInSurvivor) {
        const survivorPick = picks['survivor-pick'];
        player.survivorPicks.push(survivorPick);
        const survivorMatchup = findMatchupByTeam(survivorPick);
        if (survivorMatchup.winner !== survivorPick) {
            player.aliveInSurvivor = false;
        }
    }

    // Now evaluate the margin pool pick
    const marginPick = picks['margin-pick'];
    const marginMatchup = findMatchupByTeam(marginPick);
    let margin;
    if (marginPick === marginMatchup.home_team) {
        margin = marginMatchup.home_score - marginMatchup.away_score;
    } else {
        margin = marginMatchup.away_score - marginMatchup.home_score;
    }
    player.marginPicks.push({ team: marginPick, margin });
    player.marginTotal += margin;

    // Now evluate the high five pool picks
    let numCorrect = 0;
    player.highFiveThisWeek = [];
    for (let i = 0; i < picks.highFivePicks.length; i++) {
        const choice = picks.highFivePicks[i];
        const choiceMatchup = findMatchupByTeam(choice);
        player.highFiveThisWeek.push({ team: choice, won: choice === choiceMatchup.winner });
        if (choice === choiceMatchup.winner) {
            numCorrect++;
        }
    }
    let weeklyHighFivePoints = 0;
    if (numCorrect === 1) {
        weeklyHighFivePoints = 1;
    } else if (numCorrect === 2) {
        weeklyHighFivePoints = 2;
    } else if (numCorrect === 3) {
        weeklyHighFivePoints = 3;
    } else if (numCorrect === 4) {
        weeklyHighFivePoints = 5;
    } else if (numCorrect === 5) {
        weeklyHighFivePoints = 8;
    }
    player.highFiveValues.push(weeklyHighFivePoints);
    player.highFiveTotal += weeklyHighFivePoints;
});

// Now calculate the rank of everyone for the weekly standings
// First we need a clone to sort
const clonedPlayers = structuredClone(players);

// Now get the total monday night points
const lastGame = weekData[`matchup_${numGamesThisWeek}`];
const totalMondayPoints = lastGame.home_score + lastGame.away_score;

clonedPlayers.sort((row1, row2) => {
    // First, sort by the number of points
    if (row1.currentWeekPoints > row2.currentWeekPoints) return -1;
    if (row1.currentWeekPoints < row2.currentWeekPoints) return 1;
    // Tiebreaker 1 is closest to the total points for the monday night game
    if (Math.abs(totalMondayPoints - row1.currentWeekTiebreaker) > Math.abs(totalMondayPoints - row2.currentWeekTiebreaker)) return 1;
    if (Math.abs(totalMondayPoints - row1.currentWeekTiebreaker) < Math.abs(totalMondayPoints - row2.currentWeekTiebreaker)) return -1;
    // Tiebreaker 2 is highest number of wins
    if (row1.currentWeekWins > row2.currentWeekWins) return -1;
    if (row1.currentWeekWins < row2.currentWeekWins) return 1;
    return 0;
});

// Now update the ranks, week one is an exception
if (week === 1) {
    players.forEach(player => {
        player.currentWeekRank = clonedPlayers.findIndex(clone => clone.id === player.id) + 1;
    });
} else {
    players.forEach(player => {
        const pastWeek = player.currentWeekRank;
        player.lastWeekRank = pastWeek;
        player.currentWeekRank = clonedPlayers.findIndex(cloned => cloned.id === player.id) + 1;
        // Now calculate the different
        if (player.lastWeekRank > player.currentWeekRank) {
            player.change = `+${player.lastWeekRank - player.currentWeekRank}`;
        } else {
            player.change = `-${player.currentWeekRank - player.lastWeekRank}`;
        }
    });
}

// Now write to the players json file so that it is saved
const updatedPlayersObj = { players };
const updatedPlayers = JSON.stringify(updatedPlayersObj, null, 2);
await writeFile(path.resolve(`data/${year}/players.json`), updatedPlayers);

// Now update the teams json object and write to that file
for (let i = 0; i < numGamesThisWeek; i++) {
    const matchup = weekData[`matchup_${i + 1}`];
    const homeTeamInfo = teams[`${matchup.home_team}`];
    const awayTeamInfo = teams[`${matchup.away_team}`];

    if (matchup.winner === matchup.home_team) {
        homeTeamInfo.wins++;
        awayTeamInfo.losses++;
        homeTeamInfo.home_wins++;
        awayTeamInfo.away_losses++;
    } else if (matchup.winner === matchup.away_team) {
        homeTeamInfo.losses++;
        awayTeamInfo.wins++;
        homeTeamInfo.home_losses++;
        awayTeamInfo.away_wins++;
    } else if (matchup.winner === 'Tie') {
        homeTeamInfo.ties++;
        awayTeamInfo.ties++;
    }

    homeTeamInfo.points_for += matchup.home_score;
    homeTeamInfo.points_against += matchup.away_score;
    awayTeamInfo.points_for += matchup.away_score;
    awayTeamInfo.points_against += matchup.home_score;

    // Handle streaks for the two teams
    const homeSplit = homeTeamInfo.streak.split('');
    let newHomeStreak;
    if (matchup.winner === matchup.home_team) {
        if (homeSplit[0] === 'L') {
            newHomeStreak = 'W1';
        } else {
            newHomeStreak = `W${parseInt(homeSplit[1], 10) + 1}`;
        }
    } else {
        if (homeSplit[0] === 'W') {
            newHomeStreak = 'L1';
        } else {
            newHomeStreak = `L${parseInt(homeSplit[1], 10) + 1}`;
        }
    }
    homeTeamInfo.streak = newHomeStreak;

    const awaySplit = awayTeamInfo.streak.split('');
    let newAwayStreak;
    if (matchup.winner === matchup.away_team) {
        if (awaySplit[0] === 'L') {
            newAwayStreak = 'W1';
        } else {
            newAwayStreak = `W${parseInt(awaySplit[1], 10) + 1}`;
        }
    } else {
        if (awaySplit[0] === 'W') {
            newAwayStreak = 'L1';
        } else {
            newAwayStreak = `L${parseInt(awaySplit[1], 10) + 1}`;
        }
    }
    awayTeamInfo.streak = newAwayStreak;
}

// Now write to the players json file so that it is saved
const updatedTeamsObj = { teams };
const updatedTeams = JSON.stringify(updatedTeamsObj, null, 2);
await writeFile(path.resolve(`data/${year}/teams.json`), updatedTeams);
