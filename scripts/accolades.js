import * as path from 'path';
import { readFile } from 'fs/promises';

// Get the data from the players json file
const playerData = await JSON.parse(await readFile(path.resolve(`data/2024/football/players.json`)));

const highestRiser = { name: '', change: 0 };
const lowestFaller = { name: '', change: 0 };

for (let i = 0; i < playerData.length; i++) {
  const player = playerData[i];
  const change = parseInt(player.change, 10);
  if (change > highestRiser.change) {
    highestRiser.name = `${player.firstName} ${player.lastName}`;
    highestRiser.change = change;
  }
  if (change < lowestFaller.change) {
    lowestFaller.name = `${player.firstName} ${player.lastName}`;
    lowestFaller.change = change;
  }
}

console.log(`Highest Riser: ${highestRiser.name} | +${highestRiser.change}`);
console.log(`Lowest Faller: ${lowestFaller.name} | ${lowestFaller.change}`);
