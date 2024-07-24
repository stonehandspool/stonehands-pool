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

const yearlyAccolades = [];
const TEAM_CODES = [
  'ARI',
  'ATL',
  'BAL',
  'BUF',
  'CAR',
  'CHI',
  'CIN',
  'CLE',
  'DAL',
  'DEN',
  'DET',
  'GB',
  'HOU',
  'IND',
  'JAC',
  'KC',
  'LAC',
  'LA',
  'LV',
  'MIA',
  'MIN',
  'NE',
  'NO',
  'NYG',
  'NYJ',
  'PHI',
  'PIT',
  'SEA',
  'SF',
  'TB',
  'TEN',
  'WAS',
];

// Get the data from the players json file
const playerData = await JSON.parse(await readFile(path.resolve(`data/${year}/players.json`)));
const { players } = playerData;

// Get the data from the season json file
const seasonData = await JSON.parse(await readFile(path.resolve(`data/${year}/season.json`)));
const { weeks } = seasonData;

// Get the data from the weekly picks json file
const pickData = await JSON.parse(await readFile(path.resolve(`data/${year}/weeklyPicks.json`)));
const { weeklyPicks } = pickData;

// First, find the most forgetful people (i.e. people who failed to submit their picksheet the most)
const forgetfulPeople = [];
for (const weekKey in weeklyPicks) {
  const weeksPicks = weeklyPicks[weekKey];
  weeksPicks.forEach(pickInfo => {
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

const forgetfulPeopleDataToExport = {
  id: 'forgetfulPeople',
  title: 'Most Forgetful People',
  description: 'These are the people who forgot to submit their picksheet the most times throughout the season',
  data: [],
};

// Now sort in order of who was the most forgetful
forgetfulPeople.sort((a, b) => b.timesForgotten - a.timesForgotten);

// Now print it out (we want to add it to a json file eventually)
console.log('The most forgetful people');
forgetfulPeople.forEach((person, index) => {
  if (person.timesForgotten > 0) {
    console.log(`${index + 1}. ${person.firstName} ${person.lastName} - ${person.timesForgotten}`);
  }
  if (index < 5) {
    // Only get the top 5 most forgetful people
    forgetfulPeopleDataToExport.data.push(person);
  }
});

yearlyAccolades.push(forgetfulPeopleDataToExport);

// Now, get who was the most eager player (i.e. who submitted their picksheet the earliest each week)
const eagerPeople = [];
for (const weekKey in weeklyPicks) {
  const weeksPicks = weeklyPicks[weekKey];
  const weeklyEager = [];
  weeksPicks.forEach(pickInfo => {
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

const eagerPeopleDataToExport = {
  id: 'eagerPeople',
  title: 'Most Eager People',
  description: 'These are the people who on average got their picksheet in the earliest in the week',
  data: [],
};

// Now get the averages
eagerPeople.forEach(personInfo => {
  personInfo.average = personInfo.places.reduce((a, b) => a + b) / personInfo.places.length;
});

eagerPeople.sort((a, b) => a.average - b.average);

console.log();
console.log('Most Eager People');
for (let i = 0; i < 6; i++) {
  // Going to do the first 6 people because most likely I'll always be in the top 5
  const personInfo = eagerPeople[i];
  if (personInfo.firstName !== 'Ryan') {
    // TODO: Change this to my userId to be safe
    eagerPeopleDataToExport.data.push(personInfo);
  }
  console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.average}`);
}

const leastEagerPeopleDataToExport = {
  id: 'leastEagerPeople',
  title: 'Least Eager People',
  description: 'These are the people who on average got their picksheet in the latest in the week',
  data: [],
};

console.log();
console.log('Least Eager People');
for (let i = eagerPeople.length - 5; i < eagerPeople.length; i++) {
  const personInfo = eagerPeople[i];
  leastEagerPeopleDataToExport.data.push(personInfo);
  console.log(`${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.average}`);
}

yearlyAccolades.push(eagerPeopleDataToExport, leastEagerPeopleDataToExport);

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
      weeksPicks.forEach(pickInfo => {
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

const thursdayPointsDataToExport = {
  id: 'thursdayPoints',
  title: 'Top 5 Thursday (Points)',
  description: 'These are the 5 people who earned the most points on Thursday night games',
  data: [],
};

console.log();
console.log('Thursday Records by Points');
for (let i = 0; i < 5; i++) {
  const personInfo = thursdayRecords[i];
  thursdayPointsDataToExport.data.push(personInfo);
  console.log(
    `${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`
  );
}

// Now sort by wins
thursdayRecords.sort((row1, row2) => row2.timesCorrect - row1.timesCorrect);

const thursdayWinsDataToExport = {
  id: 'thursdayWins',
  title: 'Top 5 Thursday (Wins)',
  description: 'These are the 5 people who got the most games right on Thursday night',
  data: [],
};

console.log();
console.log('Thursday Records by Wins');
for (let i = 0; i < 5; i++) {
  const personInfo = thursdayRecords[i];
  thursdayWinsDataToExport.data.push(personInfo);
  console.log(
    `${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`
  );
}

// Now sort by points risked
thursdayRecords.sort((row1, row2) => row2.pointsRisked - row1.pointsRisked);

const thursdayPointsRiskedDataToExport = {
  id: 'thursdayPointsRisked',
  title: 'Top 5 Thursday (Points Risked)',
  description: 'These are the 5 people who risked the most points on Thursday night games',
  data: [],
};

console.log();
console.log('Thursday Records by Points Risked');
for (let i = 0; i < 5; i++) {
  const personInfo = thursdayRecords[i];
  thursdayPointsRiskedDataToExport.data.push(personInfo);
  console.log(
    `${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`
  );
}

// Now sort by efficiency
thursdayRecords.sort((row1, row2) => row2.efficiency - row1.efficiency);

const thursdayEfficiencyDataToExport = {
  id: 'thursdayEfficiency',
  title: 'Top 5 Thursday (Efficiency)',
  description: 'These are the 5 people who were the most efficient with their points assigned on Thursday night',
  data: [],
};

console.log();
console.log('Thursday Records by Efficiency');
for (let i = 0; i < 5; i++) {
  const personInfo = thursdayRecords[i];
  thursdayEfficiencyDataToExport.data.push(personInfo);
  console.log(
    `${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`
  );
}

yearlyAccolades.push(
  thursdayPointsDataToExport,
  thursdayWinsDataToExport,
  thursdayPointsRiskedDataToExport,
  thursdayEfficiencyDataToExport
);

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
      weeksPicks.forEach(pickInfo => {
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

const mondayPointsDataToExport = {
  id: 'mondayPoints',
  title: 'Top 5 Monday (Points)',
  description: 'These are the 5 people who earned the most points on Monday night games',
  data: [],
};

console.log();
console.log('Monday Records by Points');
for (let i = 0; i < 5; i++) {
  const personInfo = mondayRecords[i];
  mondayPointsDataToExport.data.push(personInfo);
  console.log(
    `${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`
  );
}

// Now sort by wins
mondayRecords.sort((row1, row2) => row2.timesCorrect - row1.timesCorrect);

const mondayWinsDataToExport = {
  id: 'mondayWins',
  title: 'Top 5 Monday (Wins)',
  description: 'These are the 5 people who got the most games right on Monday night',
  data: [],
};

console.log();
console.log('Monday Records by Wins');
for (let i = 0; i < 5; i++) {
  const personInfo = mondayRecords[i];
  mondayWinsDataToExport.data.push(personInfo);
  console.log(
    `${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`
  );
}

// Now sort by points risked
mondayRecords.sort((row1, row2) => row2.pointsRisked - row1.pointsRisked);

const mondayPointsRiskedDataToExport = {
  id: 'mondayPointsRisked',
  title: 'Top 5 Monday (Points Risked)',
  description: 'These are the 5 people who risked the most points on Monday night games',
  data: [],
};

console.log();
console.log('Monday Records by Points Risked');
for (let i = 0; i < 5; i++) {
  const personInfo = mondayRecords[i];
  mondayPointsRiskedDataToExport.data.push(personInfo);
  console.log(
    `${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`
  );
}

// Now sort by efficiency
mondayRecords.sort((row1, row2) => row2.efficiency - row1.efficiency);

const mondayEfficiencyDataToExport = {
  id: 'mondayEfficiency',
  title: 'Top 5 Monday (Efficiency)',
  description: 'These are the 5 people who were the most efficient with their points assigned on Monday night',
  data: [],
};

console.log();
console.log('Thursday Records by Efficiency');
for (let i = 0; i < 5; i++) {
  const personInfo = mondayRecords[i];
  mondayEfficiencyDataToExport.data.push(personInfo);
  console.log(
    `${i + 1}. ${personInfo.firstName} ${personInfo.lastName} - ${personInfo.timesCorrect} - ${personInfo.timesIncorrect} - ${personInfo.totalPoints} - ${personInfo.pointsRisked} - ${personInfo.efficiency}`
  );
}

yearlyAccolades.push(
  mondayPointsDataToExport,
  mondayWinsDataToExport,
  mondayPointsRiskedDataToExport,
  mondayEfficiencyDataToExport
);

// Now find any "lone wolf" scenarios
const loneWolfDataToExport = {
  id: 'loneWolf',
  title: 'Lone Wolf Award',
  description: 'These are the people who were able to be the only person to pick a team correctly in a matchup',
  data: [],
};

const loneLoserDataToExport = {
  id: 'loneLoser',
  title: 'Lone Loser Award',
  description:
    'These are the people who unfortunately were the only ones to pick a matchup incorrectly during the season',
  data: [],
};

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
    weeksPicks.forEach(pickInfo => {
      const { submission_data: submissionData, user_id: userId } = pickInfo;
      const { firstName, lastName } = submissionData;
      const gameNum = parseInt(gameKey.split('_').pop(), 10);
      const gameChoice = submissionData[`matchup-${gameNum - 1}`];
      const pickedRight = gameChoice === winner;

      if (gameChoice === homeTeam) {
        const playerFound = loneWolfCheck.homeTeamPicks.find(person => person.userId === userId);
        if (!playerFound) {
          loneWolfCheck.homeTeamPicks.push({
            userId,
            firstName,
            lastName,
            team: homeTeam,
            losingTeam: awayTeam,
            pickedRight,
            weekKey,
            gameKey,
          });
        }
      } else if (gameChoice === awayTeam) {
        const playerFound = loneWolfCheck.awayTeamPicks.find(person => person.userId === userId);
        if (!playerFound) {
          loneWolfCheck.awayTeamPicks.push({
            userId,
            firstName,
            lastName,
            team: awayTeam,
            losingTeam: homeTeam,
            pickedRight,
            weekKey,
            gameKey,
          });
        }
      }
    });

    if (loneWolfCheck.homeTeamPicks.length === 1) {
      const person = loneWolfCheck.homeTeamPicks[0];
      loneWolves.push(person);
      if (person.pickedRight) {
        person.description = `They were the only person to correctly choose ${person.team} to beat ${person.losingTeam} in week ${person.weekKey.split('_').pop()}`;
        loneWolfDataToExport.data.push(person);
      } else {
        person.description = `They were the only person to incorrectly choose ${person.team} to beat ${person.losingTeam} in week ${person.weekKey.split('_').pop()}`;
        loneLoserDataToExport.data.push(person);
      }
      console.log('Lone Wolf found!');
      console.log(
        `${person.firstName} ${person.lastName} picked ${person.team} in ${person.weekKey} and they were ${person.pickedRight ? 'right' : 'wrong'}`
      );
    } else if (loneWolfCheck.awayTeamPicks.length === 1) {
      const person = loneWolfCheck.awayTeamPicks[0];
      loneWolves.push(person);
      if (person.pickedRight) {
        person.description = `They were the only person to correctly choose ${person.team} to beat ${person.losingTeam} in week ${person.weekKey.split('_').pop()}`;
        loneWolfDataToExport.data.push(person);
      } else {
        person.description = `They were the only person to incorrectly choose ${person.team} to beat ${person.losingTeam} in week ${person.weekKey.split('_').pop()}`;
        loneLoserDataToExport.data.push(person);
      }
      console.log('Lone Wolf found!');
      console.log(
        `${person.firstName} ${person.lastName} picked ${person.team} in ${person.weekKey} and they were ${person.pickedRight ? 'right' : 'wrong'}`
      );
    }
  }
}

yearlyAccolades.push(loneWolfDataToExport, loneLoserDataToExport);

// Now find the top 5 point getters on the season
console.log();
players.sort((row1, row2) => row2.points - row1.points);

const mostPointsDataToExport = {
  id: 'mostPoints',
  title: 'Top 5 Overall (Points)',
  description: 'These are the 5 people who earned the most points throughout the season',
  data: [],
};

console.log('Top 5 Points on the season');
for (let i = 0; i < 5; i++) {
  const player = players[i];
  mostPointsDataToExport.data.push(player);
  console.log(`${i + 1}. ${player.firstName} ${player.lastName} - ${player.points}`);
}

// Now find the top 5 wins on the season
console.log();
players.sort((row1, row2) => row2.wins - row1.wins);

const mostWinsDataToExport = {
  id: 'mostWins',
  title: 'Top 5 Overall (Wins)',
  description: 'These are the 5 people who picked the most games correctly throughout the season',
  data: [],
};

console.log('Top 5 Wins on the season');
for (let i = 0; i < 5; i++) {
  const player = players[i];
  mostWinsDataToExport.data.push(player);
  console.log(`${i + 1}. ${player.firstName} ${player.lastName} - ${player.wins}`);
}

yearlyAccolades.push(mostPointsDataToExport, mostWinsDataToExport);

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

const mostPointsInWeekDataToExport = {
  id: 'mostWinsInWeek',
  title: 'Top 5 Points in a Week',
  description: 'These are the 5 people who got the most points in a single week',
  data: [],
};

console.log();
console.log('Top 5 Points in a week');
for (let i = 0; i < 5; i++) {
  const result = allWeeklyResults[i];
  mostPointsInWeekDataToExport.data.push(result);
  console.log(`${i + 1}. ${result.firstName} ${result.lastName} - ${result.week} - ${result.points}`);
}

allWeeklyResults.sort((row1, row2) => row1.points - row2.points);

const leastPointsInWeekDataToExport = {
  id: 'leastPointsInWeek',
  title: 'Bottom 5 Points in a week',
  description: 'These are the 5 people who got the lowest points in a single week',
  data: [],
};

console.log();
console.log('Lowest 5 Points in a week');
for (let i = 0; i < 5; i++) {
  const result = allWeeklyResults[i];
  leastPointsInWeekDataToExport.data.push(result);
  console.log(`${i + 1}. ${result.firstName} ${result.lastName} - ${result.week} - ${result.points}`);
}

yearlyAccolades.push(mostPointsInWeekDataToExport, leastPointsInWeekDataToExport);

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
    weeksPicks.forEach(pickInfo => {
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
const forBestAndWorstPicking = [];
const totalGamesPlayed = 17;

pickingStats.forEach(stats => {
  const { userId, firstName, lastName, teamArray } = stats;
  teamArray.forEach(teamInfo => {
    const { team, wins, losses, timesCorrect, timesIncorrect } = teamInfo;
    forBestAndWorstPicking.push({ userId, firstName, lastName, team, timesCorrect, timesIncorrect });
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

const teamsAlwaysPickedDataToExport = {
  id: 'teamsAlwaysPicked',
  title: 'Fan Favorite Teams',
  description: 'These are the teams that had at least one person pick them to win every single week',
  data: [],
};

console.log();
console.log('People who always picked a team to win');
const teamsAlwaysCount = [];
alwaysPickedFor.forEach((info, index) => {
  const { firstName, lastName, team, wins, losses } = info;
  const teamFound = teamsAlwaysCount.find(teamInfo => teamInfo.name === team);
  if (!teamFound) {
    teamsAlwaysCount.push({ name: team, count: 1, pickedBy: [`${firstName} ${lastName}`] });
  } else {
    teamFound.count++;
    teamFound.pickedBy.push(`${firstName} ${lastName}`);
  }
  console.log(`${index + 1}. ${firstName} ${lastName} always picked ${team} (${wins}-${losses})`);
});

// Now sort in order of who was picked the most
teamsAlwaysCount.sort((a, b) => b.count - a.count);
teamsAlwaysPickedDataToExport.data = teamsAlwaysCount;

console.log();
teamsAlwaysCount.forEach(team => {
  console.log(`${team.name} - ${team.count}`);
});

const teamsNeverPickedDataToExport = {
  id: 'teamsNeverPicked',
  title: 'Highly Hated Teams',
  description: 'These are the teams that had at least one person never pick them to win every single week',
  data: [],
};

console.log();
console.log('People who always picked a team to lose');
const teamsNeverCount = [];
alwaysPickedAgainst.forEach((info, index) => {
  const { firstName, lastName, team, wins, losses } = info;
  const teamFound = teamsNeverCount.find(teamInfo => teamInfo.name === team);
  if (!teamFound) {
    teamsNeverCount.push({ name: team, count: 1, pickedBy: [`${firstName} ${lastName}`] });
  } else {
    teamFound.count++;
    teamFound.pickedBy.push(`${firstName} ${lastName}`);
  }
  console.log(`${index + 1}. ${firstName} ${lastName} always picked against ${team} (${wins}-${losses})`);
});

// Now sort in order of who was picked the most
teamsNeverCount.sort((a, b) => b.count - a.count);
teamsNeverPickedDataToExport.data = teamsNeverCount;

yearlyAccolades.push(teamsAlwaysPickedDataToExport, teamsNeverPickedDataToExport);

console.log();
teamsNeverCount.forEach(team => {
  console.log(`${team.name} - ${team.count}`);
});

// Now find the top 5 most accurate picking for a specific team by a person
const teamsBestPickedDataToExport = {
  id: 'teamsBestPicked',
  title: 'Best Job Picking',
  description: 'These 5 people were the best at picking a specific teams win/loss week by week',
  data: [],
};
forBestAndWorstPicking.sort((a, b) => b.timesCorrect - a.timesCorrect);
console.log();
console.log('Best at Picking a Team');
for (let i = 0; i < 5; i++) {
  const info = forBestAndWorstPicking[i];
  const { firstName, lastName, team, timesCorrect, timesIncorrect } = info;
  teamsBestPickedDataToExport.data.push(info);
  console.log(`${i + 1}. ${firstName} ${lastName} was best with ${team} (${timesCorrect}-${timesIncorrect})`);
}

// Now find the top 5 least accurate picking for a specific team by a person
const teamsWorstPickedDataToExport = {
  id: 'teamsWorstPicked',
  title: 'Worst Job Picking',
  description: 'These 5 people were the worst at picking a specific teams win/loss week by week',
  data: [],
};
forBestAndWorstPicking.sort((a, b) => b.timesIncorrect - a.timesIncorrect);
console.log();
console.log('Worst at Picking a Team');
for (let i = 0; i < 5; i++) {
  const info = forBestAndWorstPicking[i];
  const { firstName, lastName, team, timesCorrect, timesIncorrect } = info;
  teamsWorstPickedDataToExport.data.push(info);
  console.log(`${i + 1}. ${firstName} ${lastName} was worst with ${team} (${timesCorrect}-${timesIncorrect})`);
}

yearlyAccolades.push(teamsBestPickedDataToExport, teamsWorstPickedDataToExport);

// Next, add in the secret mango award
const secretMangoDataToExport = {
  id: 'secretMango',
  title: 'The "Secret Mango" Award',
  description: 'This is given to those who discover the hidden "Secret Mango" award on the website',
  data: [
    {
      name: 'Kailey Fandl',
      week: 9,
      year: 2023,
    },
  ],
};

yearlyAccolades.push(secretMangoDataToExport);

// Survivor Pool Stuff
const survivorDataToExport = {
  id: 'survivor',
  title: 'Survivor Pool Winners',
  description: 'The winners of the Survivor Pool throughout the years',
  data: [
    {
      name: 'Brandon Horn',
      weeksSurvived: 11,
      year: 2023,
    },
  ],
};

yearlyAccolades.push(survivorDataToExport);

// Margin Pool Stuff
const marginPointsDataToExport = {
  id: 'marginPoints',
  title: 'Top 5 Margin (Points)',
  description: 'These are the 5 people who earned the most points in the Margin Pool',
  data: [],
};

players.sort((a, b) => b.marginTotal - a.marginTotal);

console.log();
console.log('Top 5 Margin Points');
for (let i = 0; i < 5; i++) {
  const info = players[i];
  const { firstName, lastName, marginTotal } = info;
  marginPointsDataToExport.data.push(info);
  console.log(`${i + 1}. ${firstName} ${lastName} - ${marginTotal}`);
}

const marginWins = [];
const marginWinsDataToExport = {
  id: 'marginWins',
  title: 'Top 5 Margin (Wins)',
  description: 'These are the 5 people who earned the most wins in the Margin Pool',
  data: [],
};
players.forEach(player => {
  const { firstName, lastName, marginTotal, marginPicks } = player;
  const totalWins = marginPicks.reduce((n, val) => n + (val.margin > 0 ? 1 : 0), 0);
  marginWins.push({ firstName, lastName, marginTotal, totalWins });
});

marginWins.sort((a, b) => b.totalWins - a.totalWins);
console.log();
console.log('Top 5 Margin Wins');
for (let i = 0; i < 5; i++) {
  const info = marginWins[i];
  const { firstName, lastName, totalWins } = info;
  marginWinsDataToExport.data.push(info);
  console.log(`${i + 1}. ${firstName} ${lastName} - ${totalWins}`);
}

yearlyAccolades.push(marginPointsDataToExport, marginWinsDataToExport);

// High Five Stuff
const highFivePointsDataToExport = {
  id: 'highFivePoints',
  title: 'Top 5 High Five (Points)',
  description: 'These are the 5 people who earned the most points in the High Five Pool',
  data: [],
};

players.sort((a, b) => b.highFiveTotal - a.highFiveTotal);

console.log();
console.log('Top 5 High Five Points');
for (let i = 0; i < 5; i++) {
  const info = players[i];
  const { firstName, lastName, highFiveTotal } = info;
  highFivePointsDataToExport.data.push(info);
  console.log(`${i + 1}. ${firstName} ${lastName} - ${highFiveTotal}`);
}

const highFiveWins = [];
const highFiveWinsDataToExport = {
  id: 'highFiveWins',
  title: 'Top 5 High Five (Wins)',
  description: 'These are the 5 people who earned the most wins in the High Five Pool',
  data: [],
};
players.forEach(player => {
  const { firstName, lastName, highFiveTotal, highFiveValues } = player;
  const totalWins = highFiveValues.reduce((n, val) => {
    if (val === 1) {
      return n + 1;
    } else if (val === 2) {
      return n + 2;
    } else if (val === 3) {
      return n + 3;
    } else if (val === 5) {
      return n + 4;
    } else if (val === 8) {
      return n + 5;
    }
    return n;
  }, 0);
  highFiveWins.push({ firstName, lastName, highFiveTotal, totalWins });
});

highFiveWins.sort((a, b) => b.totalWins - a.totalWins);
console.log();
console.log('Top 5 High Fives Wins');
for (let i = 0; i < 5; i++) {
  const info = highFiveWins[i];
  const { firstName, lastName, totalWins } = info;
  highFiveWinsDataToExport.data.push(info);
  console.log(`${i + 1}. ${firstName} ${lastName} - ${totalWins}`);
}

yearlyAccolades.push(highFivePointsDataToExport, highFiveWinsDataToExport);

// TODO: If anyone ever actually does this then add it, but I don't think it'll happen
console.log();
console.log('People who picked every game right for a team');
perfectTeams.forEach((info, index) => {
  const { firstName, lastName, team, timesCorrect, timesIncorrect } = info;
  console.log(
    `${index + 1}. ${firstName} ${lastName} was always right with ${team} (${timesCorrect}-${timesIncorrect})`
  );
});

console.log();
console.log('People who picked every game wrong for a team');
reallyWrongTeams.forEach((info, index) => {
  const { firstName, lastName, team, timesCorrect, timesIncorrect } = info;
  console.log(
    `${index + 1}. ${firstName} ${lastName} was always wrong with ${team} (${timesCorrect}-${timesIncorrect})`
  );
});

const accoladesAsJson = JSON.stringify(yearlyAccolades, null, 2);
fs.writeFileSync(path.resolve(`data/${year}/accolades.json`), accoladesAsJson);
console.log(`Created a new file at data/${year}/accolades.json`);
