import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';

// // Read the old weekly picks
// const oldWeeklyPicksFile = await JSON.parse(await readFile(path.resolve(`data/2023/weeklyPicks.json`)));
// const oldWeeklyPicks = oldWeeklyPicksFile.weeklyPicks;

// // Create a new empty array
// const newWeeklyPicks = [];
// for (let i = 1; i <= 18; i++) {
//   newWeeklyPicks.push({ id: `week_${i}`, picks: [] });
// }

// // Now loop through the `week_<n>` objects
// for (let i = 1; i <= 18; i++) {
//   const weeklyPicks = oldWeeklyPicks[`week_${i}`];
//   const currentWeekIndex = i - 1;
//   weeklyPicks.forEach(userPick => {
//     const updatedFormat = {
//       id: userPick.submission_id,
//       created_at: userPick.created_at,
//       user_id: userPick.user_id,
//       week: userPick.week,
//       times_updated: 0,
//       submission_data: {
//         userId: userPick.submission_data.id,
//         lastName: userPick.submission_data.lastName,
//         username: userPick.submission_data.username,
//         firstName: userPick.submission_data.firstName,
//         marginPick: userPick.submission_data['margin-pick'],
//         tiebreaker: parseInt(userPick.submission_data.tiebreaker, 10),
//         survivorPick: userPick.submission_data['survivor-pick'],
//         highFivePicks: userPick.submission_data.highFivePicks,
//         confidencePicks: [],
//       },
//     };

//     for (let j = 0; j < 16; j++) {
//       if (!Object.hasOwn(userPick.submission_data, `matchup-${j}`)) {
//         continue;
//       }
//       const team = userPick.submission_data[`matchup-${j}`];
//       const confidence = userPick.submission_data[`matchup-${j}-confidence`];
//       updatedFormat.submission_data.confidencePicks.push({ team, matchupId: `matchup_${j + 1}`, confidence });
//     }

//     newWeeklyPicks[currentWeekIndex].picks.push(updatedFormat);
//   });
// }

// for (let i = 1; i <= 18; i++) {
//   const asJson = JSON.stringify(newWeeklyPicks[i - 1], null, 2);
//   await writeFile(path.resolve(`data/2023/football/weeklyPicks/week${i}.json`), asJson);
// }

// Read the old season data
const oldSeasonData = await JSON.parse(await readFile(path.resolve(`data/2023/football/season.json`)));
const oldSeason = oldSeasonData.weeks;

// Create a new empty array
const newSeasonData = [];
for (let i = 1; i <= 18; i++) {
  newSeasonData.push({ weekId: `week_${i}`, matchups: [] });
}

// Now loop through and update the data
for (let i = 1; i <= 18; i++) {
  const weekData = oldSeason[`week_${i}`];
  const weekIndex = i - 1;
  for (let j = 1; j <= 16; j++) {
    if (!Object.hasOwn(weekData, `matchup_${j}`)) {
      continue;
    }

    const matchupInfo = weekData[`matchup_${j}`];
    const newFormat = {
      matchupId: `matchup_${j}`,
      awayTeam: matchupInfo.away_team,
      homeTeam: matchupInfo.home_team,
      time: matchupInfo.time,
      gameInfo: matchupInfo.gameInfo,
      awayScore: matchupInfo.away_score,
      homeScore: matchupInfo.home_score,
      winner: matchupInfo.winner,
      evaluated: matchupInfo.evaluated,
    };

    newSeasonData[weekIndex].matchups.push(newFormat);
  }
}

const asJson = JSON.stringify(newSeasonData, null, 2);
await writeFile(path.resolve(`data/2023/football/season.json`), asJson);
