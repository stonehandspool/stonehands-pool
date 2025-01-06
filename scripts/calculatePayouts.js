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
const playerData = await JSON.parse(await readFile(path.resolve(`data/${year}/football/players.json`)));

// Get the data from the season json file
const seasonData = await JSON.parse(await readFile(path.resolve(`data/${year}/football/season.json`)));

const endOfYearPayouts = [752, 639.2, 526.4, 451.2, 376, 300.8, 206.8, 188, 169.2, 150.4];
const weeklyConfidencePayouts = [62.67, 53.27, 43.87, 37.6, 31.33, 25.07, 17.23, 15.67, 14.1, 12.53];
const marginHighFivePayouts = [380, 250, 150, 120, 100];

const payouts = [];

playerData.forEach(player => {
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

// Not going to assume 18 weeks will last forever
const weeksInSeason = payouts[0].pointsByWeek.length;

for (let i = 0; i < weeksInSeason; i++) {
  // For each week, sort the array by the weekly scores and tiebreaker and add in the correct payouts
  // First get the total score of the last game of that week
  const weekData = seasonData.find(weekInfo => weekInfo.weekId === `week_${i + 1}`);
  const numGames = weekData.matchups.length;
  const lastMatchup = weekData.matchups.find(matchupInfo => matchupInfo.matchupId === `matchup_${numGames}`);
  const mondayTotal = lastMatchup.awayScore + lastMatchup.homeScore;
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

// Now clean up the totals because they're ugly and delete unnecessary data
payouts.forEach(player => {
  player.totalEarned = +player.totalEarned.toFixed(2);
  delete player.wins;
  delete player.points;
  delete player.winsByWeek;
  delete player.marginTotal;
  delete player.pointsByWeek;
  delete player.tiebreakerByWeek;
});

// Finally, order alphabetically
payouts.sort((row1, row2) => {
  const firstName1 = row1.firstName.split(' ')[0];
  const lastName1 = row1.lastName.split(' ').pop();
  const firstName2 = row2.firstName.split(' ')[0];
  const lastName2 = row2.lastName.split(' ').pop();
  return lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2);
});

const payoutsAsJson = JSON.stringify(payouts, null, 2);
fs.writeFileSync(path.resolve(`data/${year}/football/payouts.json`), payoutsAsJson);
console.log(`Created a new file at data/${year}/football/payouts.json`);
