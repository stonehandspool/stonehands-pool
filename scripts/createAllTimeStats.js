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
      user.worstFinish = Math.max(user.worstFinish, player.currentWeekRank);
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
      worstFinish: player.currentWeekRank,
      survivorTotalWeeks: player.survivorPicks.length,
      marginTotal: player.marginTotal,
      highFiveTotal: player.highFiveTotal,
      weeklyWins: 0,
      weeklyTopTenFinishes: 0,
    };
    allPlayerInfo.push(newUserInfo);
  });

  // Now get the weekly wins and top 10 finishes
  const seasonResults = await JSON.parse(await readFile(path.resolve(`data/${year}/football/season.json`)));
  for (let i = 0; i < 18; i++) {
    const weeklyResults = [];
    playersInYear.forEach(player => {
      const playerData = {
        id: player.id,
        wins: player.winsByWeek[i],
        losses: player.lossesByWeek[i],
        ties: player.tiesByWeek[i],
        points: player.pointsByWeek[i],
        tiebreaker: player.tiebreakerByWeek[i],
      };
      weeklyResults.push(playerData);
    });

    const resultsFromWeek = seasonResults.find(week => week.weekId === `week_${i + 1}`).matchups;
    const numGames = resultsFromWeek.length;
    const finalGame = resultsFromWeek.find(match => match.matchupId === `matchup_${numGames}`);
    const finalGameTotal = finalGame.homeScore + finalGame.awayScore;

    // Now sort them
    weeklyResults.sort((row1, row2) => {
      const row1Tb = Math.abs(finalGameTotal - row1.tiebreaker);
      const row2Tb = Math.abs(finalGameTotal - row2.tiebreaker);
      return row2.points - row1.points || row2.wins - row1.wins || row1Tb - row2Tb;
    });
  }
}
