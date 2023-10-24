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
// Find any remaining games
const matchupsRemaining = [];
for (let i = 1; i <= numGamesInWeek; i++) {
    const matchupInfo = weekData[`matchup_${i}`];
    if (!matchupInfo.evaluated) {
        matchupsRemaining.push({ matchupId: `matchup-${i - 1}`, ...matchupInfo });
    }
}

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
    };
    for (let i = 0; i < matchupsRemaining.length; i++) {
        const { matchupId } = matchupsRemaining[i];
        neededInfo[`matchup${i}pick`] = playerPicks.submission_data[`${matchupId}`];
        neededInfo[`matchup${i}confidence`] = playerPicks.submission_data[`${matchupId}-confidence`];
    }
    currentStandings.push(neededInfo);
}

// Sort them by the current standings (we don't know the tiebreaker so don't factor it in here)
currentStandings.sort((row1, row2) => {
    // const row1Tb = Math.abs(MONDAY_NIGHT_TOTAL - row1.tiebreaker);
    // const row2Tb = Math.abs(MONDAY_NIGHT_TOTAL - row2.tiebreaker);
    return row2.points - row1.points || row2.wins - row1.wins; // || row1Tb - row2Tb;
});

// Now calculate the different scenarios
if (matchupsRemaining.length === 1) {
    const possibleWinners = [matchupsRemaining[0].home_team, matchupsRemaining[0].away_team];
    for (let i = 0; i < possibleWinners.length; i++) {
        const team = possibleWinners[i];
        const possibleStandings = [];
        for (let i = 0; i < currentStandings.length; i++) {
            const copy = {...currentStandings[i]};
            if (copy.matchup0pick === team) {
                copy.wins++;
                copy.points += copy.matchup0confidence;
            } else {
                copy.losses++;
            }
            possibleStandings.push(copy);
        }
        possibleStandings.sort((row1, row2) => {
            return row2.points - row1.points || row2.wins - row1.wins;
        });
        console.log(`Standings if ${team} wins:`)
        for (let i = 0; i < 15; i++) {
            const info = possibleStandings[i];
            console.log(`${i + 1}. ${info.name} | ${info.points} points | ${info.wins} wins | ${info.losses} losses | tiebreaker: ${info.tiebreaker}`);
        }
        console.log('');
    }
} else if (matchupsRemaining.length === 2) {
    const possibleWinners1 = [matchupsRemaining[0].home_team, matchupsRemaining[0].away_team];
    const possibleWinners2 = [matchupsRemaining[1].home_team, matchupsRemaining[1].away_team];
    for (let i = 0; i < possibleWinners1.length; i++) {
        for (let j = 0; j < possibleWinners2.length; j++) {
            const teamA = possibleWinners1[i];
            const teamB = possibleWinners2[j];
            const possibleStandings = [];
            for (let k = 0; k < currentStandings.length; k++) {
                const copy = {...currentStandings[k]};
                if (copy.matchup0pick === teamA) {
                    copy.wins++;
                    copy.points += copy.matchup0confidence;
                } else {
                    copy.losses++;
                }
                if (copy.matchup1pick === teamB) {
                    copy.wins++;
                    copy.points += copy.matchup1confidence;
                } else {
                    copy.losses++;
                }
                possibleStandings.push(copy);
            }
            possibleStandings.sort((row1, row2) => {
                return row2.points - row1.points || row2.wins - row1.wins;
            });
            console.log(`Standings if ${teamA} and ${teamB} wins:`)
            for (let k = 0; k < 15; k++) {
                const info = possibleStandings[k];
                console.log(`${k + 1}. ${info.name} | ${info.points} points | ${info.wins} wins | ${info.losses} losses | tiebreaker: ${info.tiebreaker}`);
            }
            console.log('');
        }
    }
} else {
    console.log('More games left than this script can handle!');
}

