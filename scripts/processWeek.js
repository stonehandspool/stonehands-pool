import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjcyNzAsImV4cCI6MTk4ODgwMzI3MH0.2VfUzB0S6IK-5jIgbqClhgrVBVcCY84q8Cd39FcbYZA';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const args = minimist(process.argv.slice(2));
const { year, week, firstRun, submissionsLocked } = args;
const isFirstRun = firstRun === 'true';
const isSubmissionsLocked = submissionsLocked === 'true';
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

if (!isSubmissionsLocked) {
    // Get the weeks picks from the database
    // We want to do this every run until submissions are marked as locked to make sure if anyone missed their submission on Thu
    // We still get the rest of their picks assuming they were able to submit prior to the cutoff
    const { data, error } = await supabaseClient
    .from('user_picks')
    .select()
    .eq('week', week)
    .eq('year', CURRENT_YEAR);

    if (error) {
        console.log(error);
        process.exit();
    }

    // Move this data to the weekly picks json file
    weeklyPicksData.weeklyPicks[`week_${week}`] = [...data];
}

const findSubmission = (submissionId) => {
    return weeklyPicksData.weeklyPicks[`week_${week}`].find(submission => submission.user_id === submissionId);
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

const findBiggestLoser = () => {
    let biggestLoser;
    let biggestMargin = 0;
    Object.keys(weekData).map(key => {
        const { home_team, away_team, home_score, away_score } = weekData[key];
        const margin = home_score > away_score ? home_score - away_score : away_score - home_score;
        if (margin > biggestMargin) {
            biggestLoser = home_score > away_score ? away_team : home_team;
            biggestMargin = margin;
        }
    });

    return biggestLoser;
};

const createRandomChoices = (playerId, username, firstName, lastName, aliveInSurvivor) => {
    const biggestLoser = findBiggestLoser();
    const randomSubmission = {
        'submission_id': -1,
        'created_at': 'N/A',
        'user_id': playerId,
        'week': week,
        'year': CURRENT_YEAR,
        'submission_data': {
            'id': playerId,
            'lastName': lastName,
            'username': username,
            'firstName': firstName,
            'tiebreaker': "0",
            'highFivePicks': isSubmissionsLocked ? ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'] : [],
            'margin-pick': isSubmissionsLocked ? biggestLoser : '',
        },
    };

    if (aliveInSurvivor) {
        randomSubmission.submission_data['survivor-pick'] = '';
    }

    Object.keys(weekData).map((key, index) => {
        const matchup = weekData[key];
        const randomWinner = Math.random() > 0.5 ? matchup.home_team : matchup.away_team;
        randomSubmission.submission_data[`matchup-${index}`] = randomWinner;
        randomSubmission.submission_data[`matchup-${index}-confidence`] = index + 1;
    });

    return randomSubmission;
};

// Now evaluate all of the responses and update the files
const numGamesThisWeek = Object.keys(weekData).length;
players.forEach(player => {
    // The player object is the season-long data for the player which needs to be updated
    // First, get the submission data for that player
    let pickInfo; // To check if this was a DB submission or random submission
    let submissionInfo; // The actual results
    const playerSubmissionFromDB = findSubmission(player.id);
    if (playerSubmissionFromDB) {
        pickInfo = playerSubmissionFromDB;
        submissionInfo = playerSubmissionFromDB.submission_data;
    } else {
        const randomSubmission = createRandomChoices(player.id, player.username, player.firstName, player.lastName, player.aliveInSurvivor);
        weeklyPicksData.weeklyPicks[`week_${week}`].push(randomSubmission);
        pickInfo = randomSubmission
        submissionInfo = randomSubmission.submission_data;
    }
    let weeklyWins = 0;
    let weeklyLosses = 0;
    let weeklyTies = 0;
    let weeklyPoints = 0;

    // Reset the current weeks values if this is the first run
    if (isFirstRun) {
        player.currentWeekWins = 0;
        player.currentWeekLosses = 0;
        player.currentWeekTies = 0;
        player.currentWeekPoints = 0;
        player.winsByWeek.push(0);
        player.lossesByWeek.push(0);
        player.tiesByWeek.push(0);
        player.pointsByWeek.push(0);
        player.tiebreakerByWeek.push(0);
        player.rankByWeek.push(0);
    }

    // First, evaluate all of the confidence pool picks
    for (let i = 0; i < numGamesThisWeek; i++) {
        const matchup = weekData[`matchup_${i + 1}`];
        const { winner, evaluated } = matchup;
        // If we haven't evaluated this matchup yet and the game is actually finished
        if (!evaluated && winner !== '') {
            const userChoice = submissionInfo[`matchup-${i}`];
            const userConfidence = parseInt(submissionInfo[`matchup-${i}-confidence`], 10);
            if (winner === userChoice) {
                weeklyWins++;
                weeklyPoints += userConfidence;
            } else if (winner === 'Tie') {
                weeklyTies++;
                weeklyPoints += (userConfidence / 2);
            } else {
                weeklyLosses++;
            }
        }
    }

    // Update the players information
    player.currentWeekWins += weeklyWins;
    player.winsByWeek[player.winsByWeek.length - 1] = player.currentWeekWins;
    player.currentWeekLosses += weeklyLosses;
    player.lossesByWeek[player.lossesByWeek.length - 1] = player.currentWeekLosses;
    player.currentWeekTies += weeklyTies;
    player.tiesByWeek[player.tiesByWeek.length - 1] = player.currentWeekTies;
    player.currentWeekPoints += weeklyPoints;
    player.pointsByWeek[player.pointsByWeek.length - 1] = player.currentWeekPoints;
    player.currentWeekTiebreaker = parseInt(submissionInfo.tiebreaker, 10);
    player.tiebreakerByWeek[player.tiebreakerByWeek.length - 1] = player.currentWeekTiebreaker;
    player.wins += weeklyWins;
    player.losses += weeklyLosses;
    player.ties += weeklyTies;
    player.percent = (player.wins + (player.ties / 2)) / (player.wins + player.losses + player.ties);
    player.points += weeklyPoints;
    // Calculate the tbAvg
    let totalTiebreaker = 0;
    for (let i = 0; i < player.tiebreakerByWeek.length - 1; i++) {
        totalTiebreaker += player.tiebreakerByWeek[i];
    }
    player.tbAvg = totalTiebreaker / player.tiebreakerByWeek.length;

    // Now evaluate the survivor pool pick
    if (player.aliveInSurvivor) {
        const survivorPick = submissionInfo['survivor-pick'];
        if (isFirstRun) {
            player.survivorPicks.push(survivorPick);
        } else {
            // In case they changed their mind after the Thursday night game
            player.survivorPicks[player.survivorPicks.length - 1] = survivorPick;
        }

        if (survivorPick === '' && isSubmissionsLocked) {
            // Player missed a week
            player.aliveInSurvivor = false;
        } else if (survivorPick !== '') {
            const survivorMatchup = findMatchupByTeam(survivorPick);
            if (survivorMatchup.winner !== '' && survivorMatchup.winner !== survivorPick) {
                player.aliveInSurvivor = false;
            }
        }
    }

    // Now evaluate the margin pool pick
    const marginPick = submissionInfo['margin-pick'];
    let marginMatchup = findMatchupByTeam(marginPick);
    if (isFirstRun) {
        player.marginPicks.push({ team: marginPick, margin: null });
    } else {
        // In case they changed their mind after the Thursday night game
        player.marginPicks[player.marginPicks.length - 1].team = marginPick;
    }

    if (pickInfo.submission_id === -1) {
        // If the user never submitted a picksheet, ensure that they get the worst possible pick even if this is the last run
        const biggestLoser = findBiggestLoser();
        player.marginPicks[player.marginPicks.length - 1].team = biggestLoser;
        marginMatchup = findMatchupByTeam(biggestLoser);
    }

    if (marginMatchup.winner !== '' && !marginMatchup.evaluated) {
        let margin;
        if (marginPick === marginMatchup.home_team) {
            margin = marginMatchup.home_score - marginMatchup.away_score;
        } else {
            margin = marginMatchup.away_score - marginMatchup.home_score;
        }
        player.marginPicks[player.marginPicks.length - 1].margin = margin;
        player.marginTotal += margin;
    }

    // Now evluate the high five pool picks
    if (isFirstRun) {
        player.highFiveValues.push(0);
    }
    let numCorrect = 0;
    player.highFiveThisWeek = [];
    for (let i = 0; i < submissionInfo.highFivePicks.length; i++) {
        const choice = submissionInfo.highFivePicks[i];
        let won = null;
        let choiceMatchup;
        if (choice === 'N/A') {
            won = false;
        } else {
            choiceMatchup = findMatchupByTeam(choice);
            if (choiceMatchup.winner !== '') {
                won = choice === choiceMatchup.winner;
            }
        }
        player.highFiveThisWeek.push({ team: choice, won });
        if (won) {
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
    player.highFiveValues[player.highFiveValues.length - 1] = weeklyHighFivePoints;
    player.highFiveTotal = player.highFiveValues.reduce((partialSum, a) => partialSum + a, 0);
});

// Write to the weeklyPicks now in case anyone didn't submit
if (!isSubmissionsLocked) {
    // Now write to the weekly picks json file so that it is saved
    const updatedWeeklyPicks = JSON.stringify(weeklyPicksData, null, 2);
    await writeFile(path.resolve(`data/${year}/weeklyPicks.json`), updatedWeeklyPicks);
}

// Now calculate the rank of everyone for the weekly standings
// First we need a clone to sort
const clonedPlayers = structuredClone(players);

// Calculate the season standings
clonedPlayers.sort((row1, row2) => {
    // First, sort by the number of points
    if (row1.points > row2.points) return -1;
    if (row1.points < row2.points) return 1;
    // Tiebreaker 2 is highest number of wins
    if (row1.wins > row2.wins) return -1;
    if (row1.wins < row2.wins) return 1;
    return 0;
});

// Now update the ranks, week one is an exception
if (week === 1) {
    players.forEach(player => {
        player.currentWeekRank = clonedPlayers.findIndex(clone => clone.id === player.id) + 1;
        player.rankByWeek[player.rankByWeek.length - 1] = player.currentWeekRank;
    });
} else {
    players.forEach(player => {
        const pastWeek = player.currentWeekRank;
        player.lastWeekRank = pastWeek;
        player.currentWeekRank = clonedPlayers.findIndex(cloned => cloned.id === player.id) + 1;
        player.rankByWeek[player.rankByWeek.length - 1] = player.currentWeekRank;
        // Now calculate the different
        if (player.lastWeekRank === player.currentWeekRank) {
            player.change = '--';
        } else if (player.lastWeekRank > player.currentWeekRank) {
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
    if (matchup.winner !== '' && !matchup.evaluated) {
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
        } else if (matchup.winner === matchup.away_team) {
            if (homeSplit[0] === 'W') {
                newHomeStreak = 'L1';
            } else {
                newHomeStreak = `L${parseInt(homeSplit[1], 10) + 1}`;
            }
        } else {
            if (homeSplit[0] === 'T') {
                newHomeStreak = `T${parseInt(homeSplit[1], 10) + 1}`;
            } else {
                newHomeStreak = 'T1';
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
        } else if (matchup.winner === matchup.home_team) {
            if (awaySplit[0] === 'W') {
                newAwayStreak = 'L1';
            } else {
                newAwayStreak = `L${parseInt(awaySplit[1], 10) + 1}`;
            }
        } else {
            if (awaySplit[0] === 'T') {
                newAwayStreak = `T${parseInt(awaySplit[1], 10) + 1}`;
            } else {
                newAwayStreak = 'T1';
            }
        }
        awayTeamInfo.streak = newAwayStreak;
    }
}

// Now write to the players json file so that it is saved
const updatedTeamsObj = { teams };
const updatedTeams = JSON.stringify(updatedTeamsObj, null, 2);
await writeFile(path.resolve(`data/${year}/teams.json`), updatedTeams);
