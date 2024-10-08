import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjcyNzAsImV4cCI6MTk4ODgwMzI3MH0.2VfUzB0S6IK-5jIgbqClhgrVBVcCY84q8Cd39FcbYZA';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const args = minimist(process.argv.slice(2));
const { year, week, firstRun, submissionsLocked } = args;
const isFirstRun = firstRun === 'true';
const isSubmissionsLocked = submissionsLocked === 'true';

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
const weekData = seasonData.find(weekInfo => weekInfo.weekId === `week_${week}`);

// Get the data from the players json file
const playerData = await JSON.parse(await readFile(path.resolve(`data/${year}/football/players.json`)));

// Get the data from the teams json file
const teamsData = await JSON.parse(await readFile(path.resolve(`data/${year}/football/teams.json`)));

// Get the data from the weekly picks json file
const weeklyPicksData = await JSON.parse(
  await readFile(path.resolve(`data/${year}/football/weeklyPicks/week${week}.json`))
);

if (!isSubmissionsLocked) {
  // Get the weeks picks from the database
  // We want to do this every run until submissions are marked as locked to make sure if anyone missed their submission on Thu
  // We still get the rest of their picks assuming they were able to submit prior to the cutoff
  const { data, error } = await supabaseClient.from(`football_picks_${year}`).select().eq('week', week);

  if (error) {
    console.log(error);
    process.exit();
  }

  // Move this data to the weekly picks json file
  weeklyPicksData.picks = [...data];
}

const findSubmission = submissionId => {
  return weeklyPicksData.picks.find(submission => submission.user_id === submissionId);
};

const findMatchupByTeam = teamName => {
  let foundMatchup;
  weekData.matchups.forEach(matchup => {
    if (matchup.homeTeam === teamName || matchup.awayTeam === teamName) {
      foundMatchup = matchup;
    }
  });

  return foundMatchup;
};

const findBiggestLoser = () => {
  let biggestLoser;
  let biggestMargin = 0;
  weekData.matchups.forEach(matchup => {
    const { homeTeam, homeScore, awayTeam, awayScore } = matchup;
    const margin = homeScore > awayScore ? homeScore - awayScore : awayScore - homeScore;
    if (margin > biggestMargin) {
      biggestLoser = homeScore > awayScore ? awayTeam : homeTeam;
      biggestMargin = margin;
    }
  });

  return biggestLoser;
};

const createRandomChoices = (playerId, username, firstName, lastName) => {
  const biggestLoser = findBiggestLoser();
  const randomConfidencePicks = [];

  weekData.matchups.forEach((matchup, index) => {
    const randomWinner = Math.random() > 0.5 ? matchup.homeTeam : matchup.awayTeam;
    randomConfidencePicks.push({ matchupId: `matchup_${index + 1}`, team: randomWinner, confidence: index + 1 });
  });

  const randomSubmission = {
    id: -1,
    created_at: 'N/A',
    user_id: playerId,
    week,
    submission_data: {
      userId: playerId,
      username,
      firstName,
      lastName,
      tiebreaker: 0,
      highFivePicks: isSubmissionsLocked ? ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'] : [],
      marginPick: isSubmissionsLocked ? biggestLoser : null,
      survivorPick: '',
      confidencePicks: randomConfidencePicks,
    },
  };

  return randomSubmission;
};

const getTeamWithOdds = (confPoints, matchupInfo, gamesInWeek) => {
  const { winner, homeTeam, awayTeam } = matchupInfo;
  const loser = winner === homeTeam ? awayTeam : homeTeam;
  const pointDiff = gamesInWeek - confPoints;
  // A random number between 1 -> 100
  const randNum = Math.floor(Math.random() * 100) + 1;
  switch (pointDiff) {
    case 0: // If it is the max points of the week then always return the loser
      return loser;
    case 1: // One point off the max has a 1% chance of being right
      return randNum === 1 ? winner : loser;
    case 2: // Two and three points off have a 5% chance of being right
    case 3:
      return randNum <= 5 ? winner : loser;
    case 4: // Four and five points off have a 10% chance of being right
    case 5:
      return randNum <= 10 ? winner : loser;
    case 6: // Six and seven points off have a 15% chance of being right
    case 7:
      return randNum <= 15 ? winner : loser;
    case 8: // Eight and nine points off have a 25% chance of being right
    case 9:
      return randNum <= 25 ? winner : loser;
    case 10: // Ten and eleven points off have a 40% chance of being right
    case 11:
      return randNum <= 40 ? winner : loser;
    case 12: // Twelve and higher points off have a 50% chance of being right
    case 13:
    case 14:
    case 15:
    case 16:
      return randNum <= 50 ? winner : loser;
    default:
      console.log(
        'Something went wrong when picking a random winner',
        matchupInfo,
        pointDiff,
        randNum,
        gamesInWeek,
        confPoints
      );
      return loser;
  }
};

// Now evaluate all of the responses and update the files
let i = 0;
const len = playerData.length;
let invalidSubmission = false;
for (; i < len; i++) {
  const player = playerData[i];
  // The player object is the season-long data for the player which needs to be updated
  // First, get the submission data for that player
  let pickInfo; // To check if this was a DB submission or random submission
  let submissionInfo; // The actual results
  const playerSubmissionFromDB = findSubmission(player.id);
  if (playerSubmissionFromDB) {
    pickInfo = playerSubmissionFromDB;
    submissionInfo = playerSubmissionFromDB.submission_data;
  } else {
    const randomSubmission = createRandomChoices(
      player.id,
      player.username,
      player.firstName,
      player.lastName,
      player.aliveInSurvivor
    );
    weeklyPicksData.picks.push(randomSubmission);
    pickInfo = randomSubmission;
    submissionInfo = randomSubmission.submission_data;
  }
  let weeklyWins = 0;
  let weeklyLosses = 0;
  let weeklyTies = 0;
  let weeklyPoints = 0;

  // Reset the current weeks values if this is the first run
  if (isFirstRun) {
    player.currentWeekWins = 0;
    player.currentWeekLosses = 0;
    player.currentWeekTies = 0;
    player.currentWeekPoints = 0;
    player.winsByWeek.push(0);
    player.lossesByWeek.push(0);
    player.tiesByWeek.push(0);
    player.pointsByWeek.push(0);
    player.tiebreakerByWeek.push(0);
    player.rankByWeek.push(0);
  }

  // First, evaluate all of the confidence pool picks
  weekData.matchups.forEach(matchup => {
    const { winner, evaluated } = matchup;
    // If we haven't evaluated this matchup yet and the game is actually finished
    if (!evaluated && winner !== '') {
      // Before we evaluate, we change any missed picksheets based off odds (high points have much lower odds)
      if (pickInfo.id === -1) {
        submissionInfo.confidencePicks[
          submissionInfo.confidencePicks.findIndex(pick => pick.matchupId === matchup.matchupId)
        ].team = getTeamWithOdds(
          submissionInfo.confidencePicks[
            submissionInfo.confidencePicks.findIndex(pick => pick.matchupId === matchup.matchupId)
          ].confidence,
          matchup,
          weekData.matchups.length
        );
      }
      const userChoice = submissionInfo.confidencePicks.find(match => match.matchupId === matchup.matchupId);
      const { team, confidence } = userChoice;
      if (confidence === null) {
        invalidSubmission = true;
      }
      if (winner === team) {
        weeklyWins++;
        weeklyPoints += confidence;
      } else if (winner === 'Tie') {
        weeklyTies++;
        weeklyPoints += confidence / 2;
      } else {
        weeklyLosses++;
      }
    }
  });

  if (invalidSubmission) {
    console.log(`Invalid submission found, returning early! ${player}`);
    break;
  }

  // Update the players information
  player.currentWeekWins += weeklyWins;
  player.winsByWeek[player.winsByWeek.length - 1] = player.currentWeekWins;
  player.currentWeekLosses += weeklyLosses;
  player.lossesByWeek[player.lossesByWeek.length - 1] = player.currentWeekLosses;
  player.currentWeekTies += weeklyTies;
  player.tiesByWeek[player.tiesByWeek.length - 1] = player.currentWeekTies;
  player.currentWeekPoints += weeklyPoints;
  player.pointsByWeek[player.pointsByWeek.length - 1] = player.currentWeekPoints;
  player.currentWeekTiebreaker = parseInt(submissionInfo.tiebreaker, 10);
  player.tiebreakerByWeek[player.tiebreakerByWeek.length - 1] = player.currentWeekTiebreaker;
  player.wins += weeklyWins;
  player.losses += weeklyLosses;
  player.ties += weeklyTies;
  player.percent = (player.wins + player.ties / 2) / (player.wins + player.losses + player.ties);
  player.points += weeklyPoints;
  // Calculate the tbAvg
  let totalTiebreaker = 0;
  for (let i = 0; i <= player.tiebreakerByWeek.length - 1; i++) {
    totalTiebreaker += player.tiebreakerByWeek[i];
  }
  player.tbAvg = totalTiebreaker / player.tiebreakerByWeek.length;

  // Now evaluate the survivor pool pick
  if (player.aliveInSurvivor) {
    const survivorPick = submissionInfo.survivorPick;
    if (isFirstRun) {
      player.survivorPicks.push(survivorPick);
    } else {
      // In case they changed their mind after the Thursday night game
      player.survivorPicks[player.survivorPicks.length - 1] = survivorPick;
    }

    if (survivorPick === '' && isSubmissionsLocked) {
      // Player missed a week
      player.aliveInSurvivor = false;
    } else if (survivorPick !== '') {
      const survivorMatchup = findMatchupByTeam(survivorPick);
      if (survivorMatchup.winner !== '' && survivorMatchup.winner !== survivorPick) {
        player.aliveInSurvivor = false;
      }
    }
  }

  // Now evaluate the margin pool pick
  let marginPick = submissionInfo.marginPick;
  let marginMatchup = findMatchupByTeam(marginPick);
  if (isFirstRun) {
    player.marginPicks.push({ team: marginPick, margin: null });
  } else {
    // In case they changed their mind after the Thursday night game
    player.marginPicks[player.marginPicks.length - 1].team = marginPick;
  }

  if (pickInfo.id === -1 && !isFirstRun) {
    // If the user never submitted a picksheet, ensure that they get the worst possible pick even if this is the last run
    const biggestLoser = findBiggestLoser();
    player.marginPicks[player.marginPicks.length - 1].team = biggestLoser;
    marginPick = biggestLoser;
    marginMatchup = findMatchupByTeam(biggestLoser);
  }

  if (marginMatchup && marginMatchup.winner !== '' && !marginMatchup.evaluated) {
    let margin;
    if (marginPick === marginMatchup.homeTeam) {
      margin = marginMatchup.homeScore - marginMatchup.awayScore;
    } else {
      margin = marginMatchup.awayScore - marginMatchup.homeScore;
    }
    player.marginPicks[player.marginPicks.length - 1].margin = margin;
    player.marginTotal += margin;
  }

  // Now evluate the high five pool picks
  if (isFirstRun) {
    player.highFiveValues.push(0);
  }
  let numCorrect = 0;
  player.highFiveThisWeek = [];
  for (let i = 0; i < submissionInfo.highFivePicks.length; i++) {
    const choice = submissionInfo.highFivePicks[i];
    let won = null;
    let choiceMatchup;
    if (choice === 'N/A') {
      won = false;
    } else {
      choiceMatchup = findMatchupByTeam(choice);
      if (choiceMatchup.winner !== '') {
        won = choice === choiceMatchup.winner;
      }
    }
    player.highFiveThisWeek.push({ team: choice, won });
    if (won) {
      numCorrect++;
    }
  }

  let weeklyHighFivePoints = 0;
  if (numCorrect === 1) {
    weeklyHighFivePoints = 1;
  } else if (numCorrect === 2) {
    weeklyHighFivePoints = 2;
  } else if (numCorrect === 3) {
    weeklyHighFivePoints = 3;
  } else if (numCorrect === 4) {
    weeklyHighFivePoints = 5;
  } else if (numCorrect === 5) {
    weeklyHighFivePoints = 8;
  }
  player.highFiveValues[player.highFiveValues.length - 1] = weeklyHighFivePoints;
  player.highFiveTotal = player.highFiveValues.reduce((partialSum, a) => partialSum + a, 0);
}

if (invalidSubmission) {
  process.exit();
}

// Now write to the weekly picks json file so that it is saved
const updatedWeeklyPicks = JSON.stringify(weeklyPicksData, null, 2);
await writeFile(path.resolve(`data/${year}/football/weeklyPicks/week${week}.json`), updatedWeeklyPicks);

// Now calculate the rank of everyone for the weekly standings
// First we need a clone to sort
const clonedPlayers = structuredClone(playerData);

// Calculate the season standings
clonedPlayers.sort((row1, row2) => {
  // First, sort by the number of points
  if (row1.points > row2.points) return -1;
  if (row1.points < row2.points) return 1;
  // Tiebreaker 2 is highest number of wins
  if (row1.wins > row2.wins) return -1;
  if (row1.wins < row2.wins) return 1;
  return 0;
});

// Now update the ranks, week one is an exception
if (week === 1) {
  playerData.forEach(player => {
    player.currentWeekRank = clonedPlayers.findIndex(clone => clone.id === player.id) + 1;
    player.rankByWeek[player.rankByWeek.length - 1] = player.currentWeekRank;
  });
} else {
  playerData.forEach(player => {
    player.lastWeekRank = player.rankByWeek[player.rankByWeek.length - 2];
    player.currentWeekRank = clonedPlayers.findIndex(cloned => cloned.id === player.id) + 1;
    player.rankByWeek[player.rankByWeek.length - 1] = player.currentWeekRank;
    // Now calculate the different
    if (player.lastWeekRank === player.currentWeekRank) {
      player.change = '--';
    } else if (player.lastWeekRank > player.currentWeekRank) {
      player.change = `+${player.lastWeekRank - player.currentWeekRank}`;
    } else {
      player.change = `-${player.currentWeekRank - player.lastWeekRank}`;
    }
  });
}

// Now write to the players json file so that it is saved
const updatedPlayers = JSON.stringify(playerData, null, 2);
await writeFile(path.resolve(`data/${year}/football/players.json`), updatedPlayers);

// Now update the teams json object and write to that file
weekData.matchups.forEach(matchup => {
  const { winner, evaluated, homeTeam, homeScore, awayTeam, awayScore } = matchup;
  if (winner !== '' && !evaluated) {
    const homeTeamInfo = teamsData.find(t => t.teamCode === homeTeam);
    const awayTeamInfo = teamsData.find(t => t.teamCode === awayTeam);

    if (winner === homeTeam) {
      homeTeamInfo.wins++;
      awayTeamInfo.losses++;
      homeTeamInfo.homeWins++;
      awayTeamInfo.awayLosses++;
    } else if (winner === awayTeam) {
      homeTeamInfo.losses++;
      awayTeamInfo.wins++;
      homeTeamInfo.homeLosses++;
      awayTeamInfo.awayWins++;
    } else if (winner === 'Tie') {
      homeTeamInfo.ties++;
      awayTeamInfo.ties++;
    }

    homeTeamInfo.pointsFor += homeScore;
    homeTeamInfo.pointsAgainst += awayScore;
    awayTeamInfo.pointsFor += awayScore;
    awayTeamInfo.pointsAgainst += homeScore;

    // Handle streaks for the two teams
    const homeSplit = homeTeamInfo.streak.split('');
    let newHomeStreak;
    if (winner === homeTeam) {
      if (homeSplit[0] === 'L') {
        newHomeStreak = 'W1';
      } else {
        newHomeStreak = `W${parseInt(homeSplit[1], 10) + 1}`;
      }
    } else if (winner === awayTeam) {
      if (homeSplit[0] === 'W') {
        newHomeStreak = 'L1';
      } else {
        newHomeStreak = `L${parseInt(homeSplit[1], 10) + 1}`;
      }
    } else {
      if (homeSplit[0] === 'T') {
        newHomeStreak = `T${parseInt(homeSplit[1], 10) + 1}`;
      } else {
        newHomeStreak = 'T1';
      }
    }
    homeTeamInfo.streak = newHomeStreak;

    const awaySplit = awayTeamInfo.streak.split('');
    let newAwayStreak;
    if (winner === awayTeam) {
      if (awaySplit[0] === 'L') {
        newAwayStreak = 'W1';
      } else {
        newAwayStreak = `W${parseInt(awaySplit[1], 10) + 1}`;
      }
    } else if (winner === homeTeam) {
      if (awaySplit[0] === 'W') {
        newAwayStreak = 'L1';
      } else {
        newAwayStreak = `L${parseInt(awaySplit[1], 10) + 1}`;
      }
    } else {
      if (awaySplit[0] === 'T') {
        newAwayStreak = `T${parseInt(awaySplit[1], 10) + 1}`;
      } else {
        newAwayStreak = 'T1';
      }
    }
    awayTeamInfo.streak = newAwayStreak;
  }
});

// Now write to the players json file so that it is saved
const updatedTeams = JSON.stringify(teamsData, null, 2);
await writeFile(path.resolve(`data/${year}/football/teams.json`), updatedTeams);

// Now mark any matchup that has been evaluated as evaluated
weekData.matchups.forEach(matchup => {
  if (matchup.winner !== '' && !matchup.evaluated) {
    matchup.evaluated = true;
  }
});

const updatedSeasonData = JSON.stringify(seasonData, null, 2);
await writeFile(path.resolve(`data/${year}/football/season.json`), updatedSeasonData);
