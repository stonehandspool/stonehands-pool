import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year, week } = args;

const addOrdinal = num => {
  const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
  const suffixes = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
  };

  return `${num}${suffixes[pr.select(num)]}`;
};

// Get the data from the players json file
const playerData = await JSON.parse(await readFile(path.resolve(`data/${year}/football/players.json`)));
const seasonData = await JSON.parse(await readFile(path.resolve(`data/${year}/football/season.json`)));
const allTimeData = await JSON.parse(await readFile(path.resolve(`data/allTime/football/allTimeStats.json`)));
const resultsFromWeek = seasonData.find(w => w.weekId === `week_${week}`).matchups;
const numGames = resultsFromWeek.length;
const finalGame = resultsFromWeek.find(match => match.matchupId === `matchup_${numGames}`);
const finalGameTotal = finalGame.homeScore + finalGame.awayScore;

const highestRiser = { name: '', change: 0, last: 0, now: 0 };
const lowestFaller = { name: '', change: 0, last: 0, now: 0 };

for (let i = 0; i < playerData.length; i++) {
  const player = playerData[i];
  const change = parseInt(player.change, 10);
  if (change > highestRiser.change) {
    highestRiser.name = `${player.firstName} ${player.lastName}`;
    highestRiser.change = change;
    highestRiser.last = player.lastWeekRank;
    highestRiser.now = player.currentWeekRank;
  }
  if (change < lowestFaller.change) {
    lowestFaller.name = `${player.firstName} ${player.lastName}`;
    lowestFaller.change = change;
    lowestFaller.last = player.lastWeekRank;
    lowestFaller.now = player.currentWeekRank;
  }
}

console.log(
  `Highest Riser: ${highestRiser.name} | +${highestRiser.change} | ${highestRiser.last} -> ${highestRiser.now}`
);
console.log(
  `Lowest Faller: ${lowestFaller.name} | ${lowestFaller.change} | ${lowestFaller.last} -> ${lowestFaller.now}`
);

const weekAsNum = +week - 1;
const weeklyResults = [];
playerData.forEach(player => {
  // Update the all time stats and then add weekly results for top finishes
  const playerData = {
    id: player.id,
    wins: player.winsByWeek[weekAsNum],
    losses: player.lossesByWeek[weekAsNum],
    ties: player.tiesByWeek[weekAsNum],
    points: player.pointsByWeek[weekAsNum],
    tiebreaker: player.tiebreakerByWeek[weekAsNum],
  };

  const uData = allTimeData.find(p => p.id === player.id);
  if (uData) {
    uData.totalWins += player.winsByWeek[weekAsNum];
    uData.totalLosses += player.lossesByWeek[weekAsNum];
    uData.totalTies += player.tiesByWeek[weekAsNum];
    uData.totalPoints += player.pointsByWeek[weekAsNum];
    uData.percent = (uData.totalWins + uData.totalTies / 2) / (uData.totalWins + uData.totalLosses + uData.totalTies);
  }

  weeklyResults.push(playerData);
});

weeklyResults.sort((row1, row2) => {
  const row1Tb = Math.abs(finalGameTotal - row1.tiebreaker);
  const row2Tb = Math.abs(finalGameTotal - row2.tiebreaker);
  return row2.points - row1.points || row2.wins - row1.wins || row1Tb - row2Tb;
});

for (let i = 0; i < 10; i++) {
  const player = weeklyResults[i];
  const uData = allTimeData.find(p => p.id === player.id);
  if (uData) {
    if (i === 0) {
      uData.weeklyWins++;
      uData.weeklyTopFiveFinishes++;
      uData.weeklyTopTenFinishes++;
      console.log(`${i + 1}. ${uData.firstName} ${uData.lastName} has won their ${addOrdinal(uData.weeklyWins)} week!`);
    } else if (i < 5) {
      uData.weeklyTopFiveFinishes++;
      uData.weeklyTopTenFinishes++;
      console.log(
        `${i + 1}. ${uData.firstName} ${uData.lastName} has their ${addOrdinal(uData.weeklyTopFiveFinishes)} top 5 finish!`
      );
    } else {
      uData.weeklyTopTenFinishes++;
      console.log(
        `${i + 1}. ${uData.firstName} ${uData.lastName} has their ${addOrdinal(uData.weeklyTopTenFinishes)} top 10 finish!`
      );
    }
  } else {
    console.log('!!! Something went wrong finding a player with id: ', player.id);
  }
}

const asJson = JSON.stringify(allTimeData, null, 2);
await writeFile(path.resolve(`data/allTime/football/allTimeStats.json`), asJson);
