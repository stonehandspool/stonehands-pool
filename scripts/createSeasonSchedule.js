import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
  console.log('Please submit a valid year');
  process.exit();
}

// Create the season.json file from the downloaded schedule.json file
// We just want to cut out all of the unnecessary stuff that we got from the SportRadar API
// Get the data from the season results json file
const seasonData = await JSON.parse(await readFile(path.resolve(`data/${year}/schedule.json`)));

const seasonArray = [];
seasonData.weeks.forEach((week, index) => {
  const currentWeekObj = {
    weekId: `week_${index + 1}`,
    matchups: [],
  };

  week.games.forEach((matchup, ind) => {
    const time = new Date(`${matchup.scheduled}`);
    // eslint-disable-next-line no-undef
    const dateInfo = Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'shortGeneric',
      timeZone: 'America/New_York',
    }).format(time);
    const location = `${matchup.venue.city}, ${matchup.venue.state || matchup.venue.country}`;
    const matchupObj = {
      matchupId: `matchup_${ind + 1}`,
      homeTeam: matchup.home.alias,
      awayTeam: matchup.away.alias,
      time: time,
      gameInfo: `${dateInfo} - ${location}`,
      homeScore: 0,
      awayScore: 0,
      winner: '',
      evaluated: false,
    };
    currentWeekObj.matchups.push(matchupObj);
  });
  seasonArray.push(currentWeekObj);
});
const seasonAsJson = JSON.stringify(seasonArray, null, 2);
await writeFile(path.resolve(`data/${year}/football/season.json`), seasonAsJson);
console.log(`Created a new file at data/${year}/football/season.json in order to keep track of the weekly results`);

process.exit();
