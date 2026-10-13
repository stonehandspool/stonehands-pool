import * as path from 'path';
import { readFile } from 'fs/promises';

const years = [2023, 2024, 2025, 2026];

const allPlayerInfo = [];

for (let i = 0; i < years.length; i++) {
  const year = years[i];
  // Read the old season data
  const playersInYear = await JSON.parse(await readFile(path.resolve(`data/${year}/football/players.json`)));
  playersInYear.forEach(player => {
    if (allPlayerInfo.some(p => p.id === player.id)) {
      // update user here
      const user = allPlayerInfo.find(p => p.id === player.id);
      user.totalWins += player.wins;
      user.totalLosses += player.losses;
      user.totalTies += player.ties;
      user.percent = (user.totalWins + user.totalTies / 2) / (user.totalWins + user.totalLosses + user.totalTies);
      user.totalPoints += player.points;
      user.bestFinish = Math.min(user.bestFinish, player.currentWeekRank);
      user.survivorTotalWeeks += player.survivorPicks.length;
      user.marginTotal += player.marginTotal;
      user.highFiveTotal += player.highFiveTotal;
    }

    // Otherwise, create new object and add to array
    const newUserInfo = {
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      username: player.username,
      totalWins: player.wins,
      totalLosses: player.losses,
      totalTies: player.ties,
      percent: player.percent,
      totalPoints: player.points,
      bestFinish: player.currentWeekRank,
      survivorTotalWeeks: player.survivorPicks.length,
      marginTotal: player.marginTotal,
      highFiveTotal: player.highFiveTotal,
    };
    allPlayerInfo.push(newUserInfo);
  });
}
