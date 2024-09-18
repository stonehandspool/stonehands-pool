import * as path from 'path';
import minimist from 'minimist';
import { readFile } from 'fs/promises';

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
const seasonData = await JSON.parse(await readFile(path.resolve(`data/${year}/football/season.json`)));
const weekData = seasonData.find(weekInfo => weekInfo.weekId === `week_${week}`).matchups;

// Get the data from the players json file
const playerData = await JSON.parse(await readFile(path.resolve(`data/${year}/football/players.json`)));

// Get the data from the weekly picks json file
const weeklyPicksData = await JSON.parse(
  await readFile(path.resolve(`data/${year}/football/weeklyPicks/week${week}.json`))
);

const weeklyPicks = weeklyPicksData.picks;

const numGamesInWeek = weekData.length;
// Find any remaining games
const matchupsRemaining = [];
for (let i = 0; i < numGamesInWeek; i++) {
  const matchupInfo = weekData[i];
  if (!matchupInfo.evaluated) {
    matchupsRemaining.push(matchupInfo);
  }
}

console.log(matchupsRemaining);

// Build up current standings with all needed info
const currentStandings = [];
for (let i = 0; i < playerData.length; i++) {
  const playerInfo = playerData[i];
  const playerPicks = weeklyPicks.find(picks => picks.user_id === playerInfo.id);
  const neededInfo = {
    id: playerInfo.id,
    name: `${playerInfo.firstName.trim()} ${playerInfo.lastName.trim()}`,
    wins: playerInfo.currentWeekWins,
    losses: playerInfo.currentWeekLosses,
    points: playerInfo.currentWeekPoints,
    tiebreaker: playerInfo.currentWeekTiebreaker,
    remainingChoices: [],
  };
  for (let i = 0; i < matchupsRemaining.length; i++) {
    const { matchupId } = matchupsRemaining[i];
    neededInfo.remainingChoices.push(playerPicks.submission_data.confidencePicks.find(p => p.matchupId === matchupId));
  }
  currentStandings.push(neededInfo);
}

// Sort them by the current standings (we don't know the tiebreaker so don't factor it in here)
currentStandings.sort((row1, row2) => {
  return row2.points - row1.points || row2.wins - row1.wins;
});

// Now calculate the different scenarios
if (matchupsRemaining.length === 1) {
  const possibleWinners = [matchupsRemaining[0].homeTeam, matchupsRemaining[0].awayTeam];
  const { matchupId } = matchupsRemaining[0];
  for (let i = 0; i < possibleWinners.length; i++) {
    const team = possibleWinners[i];
    const possibleStandings = [];
    for (let i = 0; i < currentStandings.length; i++) {
      const copy = { ...currentStandings[i] };
      const { team: chosenTeam, confidence } = copy.remainingChoices.find(choice => choice.matchupId === matchupId);
      if (chosenTeam === team) {
        copy.wins++;
        copy.points += confidence;
      } else {
        copy.losses++;
      }
      possibleStandings.push(copy);
    }
    possibleStandings.sort((row1, row2) => {
      return row2.points - row1.points || row2.wins - row1.wins;
    });
    console.log(`Standings if ${team} wins:`);
    for (let i = 0; i < 15; i++) {
      const info = possibleStandings[i];
      console.log(
        `${i + 1}. ${info.name} | ${info.points} points | ${info.wins} wins | ${info.losses} losses | tiebreaker: ${info.tiebreaker}`
      );
    }
    console.log('');
  }
} else if (matchupsRemaining.length === 2) {
  const possibleWinners1 = [matchupsRemaining[0].homeTeam, matchupsRemaining[0].awayTeam];
  const game1Id = matchupsRemaining[0].matchupId;
  const possibleWinners2 = [matchupsRemaining[1].homeTeam, matchupsRemaining[1].awayTeam];
  const game2Id = matchupsRemaining[1].matchupId;
  for (let i = 0; i < possibleWinners1.length; i++) {
    for (let j = 0; j < possibleWinners2.length; j++) {
      const teamA = possibleWinners1[i];
      const teamB = possibleWinners2[j];
      const possibleStandings = [];
      for (let k = 0; k < currentStandings.length; k++) {
        const copy = { ...currentStandings[k] };
        const { team: chosenTeamA, confidence: confidenceA } = copy.remainingChoices.find(
          choice => choice.matchupId === game1Id
        );
        const { team: chosenTeamB, confidence: confidenceB } = copy.remainingChoices.find(
          choice => choice.matchupId === game2Id
        );
        if (chosenTeamA === teamA) {
          copy.wins++;
          copy.points += confidenceA;
        } else {
          copy.losses++;
        }
        if (chosenTeamB === teamB) {
          copy.wins++;
          copy.points += confidenceB;
        } else {
          copy.losses++;
        }
        possibleStandings.push(copy);
      }
      possibleStandings.sort((row1, row2) => {
        return row2.points - row1.points || row2.wins - row1.wins;
      });
      console.log(`Standings if ${teamA} and ${teamB} wins:`);
      for (let k = 0; k < 15; k++) {
        const info = possibleStandings[k];
        console.log(
          `${k + 1}. ${info.name} | ${info.points} points | ${info.wins} wins | ${info.losses} losses | tiebreaker: ${info.tiebreaker}`
        );
      }
      console.log('');
    }
  }
} else {
  console.log('More games left than this script can handle!');
}
