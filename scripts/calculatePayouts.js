import * as path from 'path';
import * as fs from 'node:fs';
import minimist from 'minimist';
import { readFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
  console.log('Please submit a valid year');
  process.exit();
}

// Get the data from the players json file
const playerData = await JSON.parse(await readFile(path.resolve(`data/${year}/players.json`)));
const { players } = playerData;

// Get the data from the season json file
const seasonData = await JSON.parse(await readFile(path.resolve(`data/${year}/season.json`)));
const { weeks } = seasonData;

const endOfYearPayouts = [327.6, 278.46, 229.32, 196.56, 163.8, 131.04, 90.09, 81.9, 73.71, 65.52];
const weeklyConfidencePayouts = [42.47, 36.1, 29.73, 25.48, 21.23, 16.99, 11.68, 10.62, 9.55, 8.49];
const marginHighFivePayouts = [296.4, 195, 117, 93.6, 78];

const payouts = [];

players.forEach(player => {
  const { id, firstName, lastName, wins, points, winsByWeek, pointsByWeek, tiebreakerByWeek, marginTotal } = player;
  payouts.push({
    id,
    firstName,
    lastName,
    wins,
    points,
    winsByWeek,
    pointsByWeek,
    tiebreakerByWeek,
    marginTotal,
    seasonPayouts: [],
    weeklyPayouts: [],
    survivorPayout: 0,
    marginPayout: 0,
    highFivePayout: 0,
    totalEarned: 0,
  });
});

const weeksInSeason = payouts[0].pointsByWeek.length;

for (let i = 0; i < weeksInSeason; i++) {
  // For each week, sort the array by the weekly scores and tiebreaker and add in the correct payouts
  // First get the total score of the last game of that week
  const weekGames = weeks[`week_${i + 1}`];
  const numGames = Object.keys(weekGames).length;
  const lastMatchup = weekGames[`matchup_${numGames}`];
  const mondayTotal = lastMatchup.away_score + lastMatchup.home_score;
  payouts.sort((row1, row2) => {
    const row1Tb = Math.abs(mondayTotal - row1.tiebreakerByWeek[i]);
    const row2Tb = Math.abs(mondayTotal - row2.tiebreakerByWeek[i]);
    return row2.pointsByWeek[i] - row1.pointsByWeek[i] || row2.winsByWeek[i] - row1.winsByWeek[i] || row1Tb - row2Tb;
  });

  payouts.forEach((player, index) => {
    if (index < weeklyConfidencePayouts.length) {
      player.weeklyPayouts.push(weeklyConfidencePayouts[index]);
      player.totalEarned += weeklyConfidencePayouts[index];
    } else {
      player.weeklyPayouts.push(0);
    }
  });
}

// Now calculate the yearly payouts
payouts.sort((row1, row2) => row2.points - row1.points || row2.wins - row1.wins);
payouts.forEach((player, index) => {
  if (index < endOfYearPayouts.length) {
    player.seasonPayouts.push(endOfYearPayouts[index]);
    player.totalEarned += endOfYearPayouts[index];
  } else {
    player.seasonPayouts.push(0);
  }
});

// Now calculate the margin pool winners
payouts.sort((row1, row2) => row2.marginTotal - row1.marginTotal);
payouts.forEach((player, index) => {
  if (index < marginHighFivePayouts.length) {
    player.marginPayout = marginHighFivePayouts[index];
    player.totalEarned += marginHighFivePayouts[index];
  } else {
    player.marginPayout = 0;
  }
});

// Not going to programmatically do the high five since there were a bunch of ties

// Now clean up the totals because they're ugly
payouts.forEach(player => {
  player.totalEarned = +player.totalEarned.toFixed(2);
});

// Finally, order alphabetically
payouts.sort((row1, row2) => {
  return row1.lastName.localeCompare(row2.lastName) || row1.firstName.localeCompare(row2.firstName);
});

const payoutsAsJson = JSON.stringify(payouts, null, 2);
fs.writeFileSync(path.resolve(`data/${year}/payouts.json`), payoutsAsJson);
console.log(`Created a new file at data/${year}/payouts.json`);
