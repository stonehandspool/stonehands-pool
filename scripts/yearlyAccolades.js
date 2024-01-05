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

// Now get the best records on Thursday games
const thursdayRecords = [];
for (const weekKey in weeklyPicks) {
    const weeksPicks = weeklyPicks[weekKey];
    const weeksGames = weeks[weekKey];
    for (const gameKey in weeksGames) {
        const gameData = weeksGames[gameKey];
        const { gameInfo, winner } = gameData;
        if (gameInfo.includes('Thu,')) {
            // If a game occurred on a Thursday, loop through all the picks that week and update the data
            weeksPicks.forEach((pickInfo) => {
                const { submission_data: submissionData, user_id: userId } = pickInfo;
                const { firstName, lastName } = submissionData;
                const gameNum = parseInt(gameKey.split('_').pop(), 10);
                const gameChoice = submissionData[`matchup-${gameNum - 1}`];
                const gamePoints = submissionData[`matchup-${gameNum - 1}-confidence`];
                const idForChecking = `${weekKey}-${gameKey}`;
                const pickedRight = gameChoice === winner;
                const playerInfo = thursdayRecords.find(person => person.userId === userId);
                if (!playerInfo) {
                    thursdayRecords.push({
                        userId,
                        firstName,
                        lastName,
                        timesCorrect: pickedRight ? 1 : 0,
                        timesIncorrect: pickedRight ? 0 : 1,
                        totalPoints: pickedRight ? gamePoints : 0,
                        pointsRisked: gamePoints,
                        weeksChecked: [idForChecking],
                        efficiency: 0,
                    });
                } else if (!playerInfo.weeksChecked.includes(idForChecking)) {
                    playerInfo.timesCorrect = pickedRight ? playerInfo.timesCorrect + 1 : playerInfo.timesCorrect;
                    playerInfo.timesIncorrect = pickedRight ? playerInfo.timesIncorrect : playerInfo.timesIncorrect + 1;
                    playerInfo.totalPoints = pickedRight ? playerInfo.totalPoints + gamePoints : playerInfo.totalPoints;
                    playerInfo.pointsRisked += gamePoints;
                    playerInfo.weeksChecked.push(idForChecking);
                }
            });
        }
    }
}

// Calcluate everyones efficiency
thursdayRecords.forEach(person => {
    const { totalPoints, pointsRisked } = person;
    person.efficiency = +((totalPoints / pointsRisked) * 100).toFixed(2);
});

// Now sort by points
thursdayRecords.sort((row1, row2) => row2.totalPoints - row1.totalPoints);

console.log();
console.log('Thursday Records by Points');
for (let i = 0; i < 5; i++) {
    const personInfo = thursdayRecords[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`);
}

// Now sort by wins
thursdayRecords.sort((row1, row2) => row2.timesCorrect - row1.timesCorrect);

console.log();
console.log('Thursday Records by Wins');
for (let i = 0; i < 5; i++) {
    const personInfo = thursdayRecords[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`);
}

// Now sort by points risked
thursdayRecords.sort((row1, row2) => row2.pointsRisked - row1.pointsRisked);

console.log();
console.log('Thursday Records by Points Risked');
for (let i = 0; i < 5; i++) {
    const personInfo = thursdayRecords[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`);
}

// Now sort by efficiency
thursdayRecords.sort((row1, row2) => row2.efficiency - row1.efficiency);

console.log();
console.log('Thursday Records by Efficiency');
for (let i = 0; i < 5; i++) {
    const personInfo = thursdayRecords[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`);
}

// Now get the best records on Monday games
const mondayRecords = [];
for (const weekKey in weeklyPicks) {
    const weeksPicks = weeklyPicks[weekKey];
    const weeksGames = weeks[weekKey];
    for (const gameKey in weeksGames) {
        const gameData = weeksGames[gameKey];
        const { gameInfo, winner } = gameData;
        if (gameInfo.includes('Mon,')) {
            // If a game occurred on a Monday, loop through all the picks that week and update the data
            weeksPicks.forEach((pickInfo) => {
                const { submission_data: submissionData, user_id: userId } = pickInfo;
                const { firstName, lastName } = submissionData;
                const gameNum = parseInt(gameKey.split('_').pop(), 10);
                const gameChoice = submissionData[`matchup-${gameNum - 1}`];
                const gamePoints = submissionData[`matchup-${gameNum - 1}-confidence`];
                const idForChecking = `${weekKey}-${gameKey}`;
                const pickedRight = gameChoice === winner;
                const playerInfo = mondayRecords.find(person => person.userId === userId);
                if (!playerInfo) {
                    mondayRecords.push({
                        userId,
                        firstName,
                        lastName,
                        timesCorrect: pickedRight ? 1 : 0,
                        timesIncorrect: pickedRight ? 0 : 1,
                        totalPoints: pickedRight ? gamePoints : 0,
                        pointsRisked: gamePoints,
                        weeksChecked: [idForChecking],
                        efficiency: 0,
                    });
                } else if (!playerInfo.weeksChecked.includes(idForChecking)) {
                    playerInfo.timesCorrect = pickedRight ? playerInfo.timesCorrect + 1 : playerInfo.timesCorrect;
                    playerInfo.timesIncorrect = pickedRight ? playerInfo.timesIncorrect : playerInfo.timesIncorrect + 1;
                    playerInfo.totalPoints = pickedRight ? playerInfo.totalPoints + gamePoints : playerInfo.totalPoints;
                    playerInfo.pointsRisked += gamePoints;
                    playerInfo.weeksChecked.push(idForChecking);
                }
            });
        }
    }
}

// Calcluate everyones efficiency
mondayRecords.forEach(person => {
    const { totalPoints, pointsRisked } = person;
    person.efficiency = +((totalPoints / pointsRisked) * 100).toFixed(2);
});

// Now sort by points
mondayRecords.sort((row1, row2) => row2.totalPoints - row1.totalPoints);

console.log();
console.log('Monday Records by Points');
for (let i = 0; i < 5; i++) {
    const personInfo = mondayRecords[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`);
}

// Now sort by wins
mondayRecords.sort((row1, row2) => row2.timesCorrect - row1.timesCorrect);

console.log();
console.log('Monday Records by Wins');
for (let i = 0; i < 5; i++) {
    const personInfo = mondayRecords[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`);
}

// Now sort by points risked
mondayRecords.sort((row1, row2) => row2.pointsRisked - row1.pointsRisked);

console.log();
console.log('Monday Records by Points Risked');
for (let i = 0; i < 5; i++) {
    const personInfo = mondayRecords[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`);
}

// Now sort by efficiency
mondayRecords.sort((row1, row2) => row2.efficiency - row1.efficiency);

console.log();
console.log('Thursday Records by Efficiency');
for (let i = 0; i < 5; i++) {
    const personInfo = mondayRecords[i];
    console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`);
}

// Now find any "lone wolf" scenarios
const loneWolves = [];
console.log();
for (const weekKey in weeklyPicks) {
    const weeksPicks = weeklyPicks[weekKey];
    const weeksGames = weeks[weekKey];
    for (const gameKey in weeksGames) {
        const gameData = weeksGames[gameKey];
        const { home_team: homeTeam, away_team: awayTeam, winner } = gameData;
        const loneWolfCheck = {
            homeTeamPicks: [],
            awayTeamPicks: [],
        };
        weeksPicks.forEach((pickInfo) => {
            const { submission_data: submissionData, user_id: userId } = pickInfo;
            const { firstName, lastName } = submissionData;
            const gameNum = parseInt(gameKey.split('_').pop(), 10);
            const gameChoice = submissionData[`matchup-${gameNum - 1}`];
            const pickedRight = gameChoice === winner;

            if (gameChoice === homeTeam) {
                const playerFound = loneWolfCheck.homeTeamPicks.find(person => person.userId === userId);
                if (!playerFound) {
                    loneWolfCheck.homeTeamPicks.push({ userId, firstName, lastName, team: homeTeam, pickedRight, weekKey, gameKey });
                }
            } else if (gameChoice === awayTeam) {
                const playerFound = loneWolfCheck.awayTeamPicks.find(person => person.userId === userId);
                if (!playerFound) {
                    loneWolfCheck.awayTeamPicks.push({ userId, firstName, lastName, team: awayTeam, pickedRight, weekKey, gameKey });
                }
            }
        });

        if (loneWolfCheck.homeTeamPicks.length === 1) {
            const person = loneWolfCheck.homeTeamPicks[0];
            loneWolves.push(person);
            console.log('Lone Wolf found!')
            console.log(`${person.firstName} ${person.lastName} picked ${person.team} in ${person.weekKey} and they were ${person.pickedRight ? 'right' : 'wrong'}`);
        } else if (loneWolfCheck.awayTeamPicks.length === 1) {
            const person = loneWolfCheck.awayTeamPicks[0];
            loneWolves.push(person);
            console.log('Lone Wolf found!')
            console.log(`${person.firstName} ${person.lastName} picked ${person.team} in ${person.weekKey} and they were ${person.pickedRight ? 'right' : 'wrong'}`);
        }
    }
}

// Now find the top 5 point getters on the season
console.log();
players.sort((row1, row2) => row2.points - row1.points);

console.log('Top 5 Points on the season');
for (let i = 0; i < 5; i++) {
    const player = players[i];
    console.log(`${i + 1}. ${player.firstName} ${player.lastName} - ${player.points}`);
}

// Now find the top 5 pick percentage on the season
console.log();
players.sort((row1, row2) => row2.percent - row1.percent);

console.log('Top 5 Pick Percentage on the season');
for (let i = 0; i < 5; i++) {
    const player = players[i];
    console.log(`${i + 1}. ${player.firstName} ${player.lastName} - ${player.percent}`);
}

// Now get the top and lowest 5 points in a week
const allWeeklyResults = [];
players.forEach(player => {
    const { id, firstName, lastName } = player;
    for (let i = 0; i < player.winsByWeek.length; i++) {
        allWeeklyResults.push({
            id,
            firstName,
            lastName,
            year,
            week: i + 1,
            wins: player.winsByWeek[i],
            losses: player.lossesByWeek[i],
            points: player.pointsByWeek[i],
        });
    }
});

allWeeklyResults.sort((row1, row2) => row2.points - row1.points);

console.log();
console.log('Top 10 Points in a week');
for (let i = 0; i < 10; i++) {
    const result = allWeeklyResults[i];
    console.log(`${i + 1}. ${result.firstName} ${result.lastName} - ${result.week} - ${result.points}`);
}

allWeeklyResults.sort((row1, row2) => row1.points - row2.points);

console.log();
console.log('Lowest 10 Points in a week');
for (let i = 0; i < 10; i++) {
    const result = allWeeklyResults[i];
    console.log(`${i + 1}. ${result.firstName} ${result.lastName} - ${result.week} - ${result.points}`);
}

// Now get anyone who always picked a team to win or lose every week
const pickingStats = [];
players.forEach(player => {
    const { id, firstName, lastName } = player;
    const playerInfo = { userId: id, firstName, lastName, teamArray: [], idsChecked: [] };
    TEAM_CODES.map(teamCode => {
        playerInfo.teamArray.push({
            team: teamCode,
            wins: 0,
            losses: 0,
            timesCorrect: 0,
            timesIncorrect: 0,
        });
    });
    pickingStats.push(playerInfo);
});

for (const weekKey in weeklyPicks) {
    const weeksPicks = weeklyPicks[weekKey];
    const weeksGames = weeks[weekKey];
    for (const gameKey in weeksGames) {
        const gameData = weeksGames[gameKey];
        const { home_team: homeTeam, away_team: awayTeam, winner } = gameData;
        weeksPicks.forEach((pickInfo) => {
            const { submission_data: submissionData, user_id: userId } = pickInfo;
            const gameNum = parseInt(gameKey.split('_').pop(), 10);
            const gameChoice = submissionData[`matchup-${gameNum - 1}`];
            const uniqueId = `${weekKey}-${gameKey}`;
            const pickedRight = gameChoice === winner;

            const playerFound = pickingStats.find(person => person.userId === userId);
            if (!playerFound.idsChecked.includes(uniqueId)) {
            playerFound.idsChecked.push(uniqueId);
            const homeTeamPlayerInfo = playerFound.teamArray.find(team => team.team === homeTeam);
            const awayTeamPlayerInfo = playerFound.teamArray.find(team => team.team === awayTeam);

            if (gameChoice === homeTeam) {
                homeTeamPlayerInfo.wins++;
                awayTeamPlayerInfo.losses++;
            } else if (gameChoice === awayTeam) {
                homeTeamPlayerInfo.losses++;
                awayTeamPlayerInfo.wins++;
            }

            if (pickedRight) {
                homeTeamPlayerInfo.timesCorrect++;
                awayTeamPlayerInfo.timesCorrect++;
            } else {
                homeTeamPlayerInfo.timesIncorrect++;
                awayTeamPlayerInfo.timesIncorrect++;
            }
            }
        });
    }
}

const alwaysPickedFor = [];
const alwaysPickedAgainst = [];
const perfectTeams = [];
const reallyWrongTeams = [];
const totalGamesPlayed = 16; // TODO: turn this to 17 once the week is over!

pickingStats.forEach(stats => {
    const { userId, firstName, lastName, teamArray } = stats;
    teamArray.forEach(teamInfo => {
        const { team, wins, losses, timesCorrect, timesIncorrect } = teamInfo;
        if (wins === totalGamesPlayed) {
            alwaysPickedFor.push({ userId, firstName, lastName, team, wins, losses, year });
        } else if (losses === totalGamesPlayed) {
            alwaysPickedAgainst.push({ userId, firstName, lastName, team, wins, losses, year });
        } else if (timesCorrect === totalGamesPlayed) {
            perfectTeams.push({ userId, firstName, lastName, team, timesCorrect, timesIncorrect, year });
        } else if (timesIncorrect === totalGamesPlayed) {
            reallyWrongTeams.push({ userId, firstName, lastName, team, timesCorrect, timesIncorrect, year });
        }
    });
});

console.log()
console.log('People who always picked a team to win')
const teamsAlwaysCount = [];
alwaysPickedFor.forEach((info, index) => {
    const { firstName, lastName, team, wins, losses } = info;
    const teamFound = teamsAlwaysCount.find(teamInfo => teamInfo.name === team);
    if (!teamFound) {
        teamsAlwaysCount.push({ name: team, count: 1 });
    } else {
        teamFound.count++;
    }
    console.log(`${index + 1}. ${firstName} ${lastName} always picked ${team} (${wins}-${losses})`);
});

console.log()
teamsAlwaysCount.forEach(team => {
    console.log(`${team.name} - ${team.count}`);
});

console.log()
console.log('People who always picked a team to lose');
const teamsNeverCount = [];
alwaysPickedAgainst.forEach((info, index) => {
    const { firstName, lastName, team, wins, losses } = info;
    const teamFound = teamsNeverCount.find(teamInfo => teamInfo.name === team);
    if (!teamFound) {
        teamsNeverCount.push({ name: team, count: 1 });
    } else {
        teamFound.count++;
    }
    console.log(`${index + 1}. ${firstName} ${lastName} always picked against ${team} (${wins}-${losses})`);
});

console.log()
teamsNeverCount.forEach(team => {
    console.log(`${team.name} - ${team.count}`);
});

console.log()
console.log('People who picked every game right for a team')
perfectTeams.forEach((info, index) => {
    const { firstName, lastName, team, timesCorrect, timesIncorrect } = info;
    console.log(`${index + 1}. ${firstName} ${lastName} was always right with ${team} (${timesCorrect}-${timesIncorrect})`);
});

console.log()
console.log('People who picked every game wrong for a team')
reallyWrongTeams.forEach((info, index) => {
    const { firstName, lastName, team, timesCorrect, timesIncorrect } = info;
    console.log(`${index + 1}. ${firstName} ${lastName} was always wrong with ${team} (${timesCorrect}-${timesIncorrect})`);
});