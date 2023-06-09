import * as fs from 'node:fs';
import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';

// Create the season.json file from the downloaded schedule.json file
// We just want to cut out all of the unnecessary stuff that we got from the SportRadar API
// Get the data from the season results json file
const seasonData = await JSON.parse(
    await readFile(path.resolve(`data/schedule.json`))
);

const seasonObj = { weeks: {} };
seasonData.weeks.forEach((week, index) => {
    seasonObj.weeks[`week_${index + 1}`] = {};
    week.games.forEach((matchup, ind) => {
        const wk = seasonObj.weeks[`week_${index + 1}`];
        const time = new Date(`${matchup.scheduled}`);
        const dateInfo = Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'shortGeneric', timeZone: 'America/New_York' }).format(time);
        const location = `${matchup.venue.city}, ${matchup.venue.state}`;
        wk[`matchup_${ind + 1}`] = {
            "home_team": matchup.home.alias,
            "away_team": matchup.away.alias,
            "time": time,
            "gameInfo": `${dateInfo} - ${location}`,
            "home_score": 0,
            "away_score": 0,
            "winner": "",
            "evaluated": false
        };
    });
});
const seasonAsJson = JSON.stringify(seasonObj, null, 2);
fs.writeFileSync(path.resolve(`data/season.json`), seasonAsJson);
console.log(`Created a new file at data/season.json in order to keep track of the weekly results`);

process.exit();