import * as path from 'path';
import minimist from 'minimist';
import { readFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
  console.log('Please submit a valid year');
  process.exit();
}

const allChamps = [];

// Get the data from the players json file
const playerData = await JSON.parse(await readFile(path.resolve(`data/${year}/marchmadness/playerPicks.json`)));

// Now loop through the picks and count the champs
playerData.forEach(pickInfo => {
  const { userPicks } = pickInfo;
  const finalMatchup = userPicks.find(p => p.id === 'matchup-63');
  const champion = finalMatchup.winner === 'top' ? finalMatchup.topTeam.name : finalMatchup.bottomTeam.name;
  const champIndex = allChamps.findIndex(c => c.team === champion);
  if (champIndex === -1) {
    allChamps.push({ team: champion, count: 1 });
  } else {
    allChamps[champIndex].count++;
  }
});

// Now sort to have most -> least
allChamps.sort((row1, row2) => {
  return row2.count - row1.count;
});

for (let i = 0; i < allChamps.length; i++) {
  console.log(`${i + 1}. ${allChamps[i].team} - ${allChamps[i].count}`);
}
