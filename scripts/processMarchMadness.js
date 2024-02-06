import * as path from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

if (isNaN(year)) {
    console.log('Please submit a valid year');
    process.exit();
}

const ROUND_VALUES = [1, 2, 4, 8, 16, 32];

// Get the bracket data
const bracketData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/marchmadness/matchups.json`))
);

// Get the team data
const teamData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/marchmadness/teams.json`))
);

// Get the data from the players json file
const playerData = await JSON.parse(
    await readFile(path.resolve(`data/${year}/marchmadness/playerPicks.json`))
);

// Loop through the bracket data game by game and if the game has finished update the teams.json and update the points for each player
bracketData.forEach((matchInfo, index) => {
    const { id, topTeam, bottomTeam, winner, evaluated, round, nextMatchup } = matchInfo;
    // If a winner has been assigned then update everything else, otherwise just keep looping through
    if (winner !== null && !evaluated) {
        // First, update the teams data and move the winning team over to the next matchup
        if (winner === 'top') {
            // Set the bottom teams 'alive' prop to false
            teamData[teamData.findIndex(team => team.name === bottomTeam.name)].alive = false;
        } else if (winner === 'bottom') {
            // Set the top teams 'alive' prop to false
            teamData[teamData.findIndex(team => team.name === topTeam.name)].alive = false;
        }

        // Next, move the winning team to the next matchup
        const idNum = parseInt(id.split('-').pop(), 10);
        const nextIndex = picksCopy.findIndex((matchups) => matchups.id === nextMatchup);
        if (idNum % 2 === 1 && idNum !== 63) {
            // If it is an odd number, that means it is the top matchup so the next matchup needs to get its `topTeam` prop changed
            bracketData[nextIndex].topTeam = winner === 'top' ? topTeam : bottomTeam;
        } else if (idNum !== 63) {
            // If it is an even number, that means it is the top matchup so the next matchup needs to get its `bottomTeam` prop changed
            bracketData[nextIndex].bottomTeam = winner === 'top' ? topTeam : bottomTeam;
        }

        // Next, update each players points and max points based off the outcome of the game
        playerData.forEach((playerInfo, index) => {
            const { userPicks } = playerInfo;
            const userChoice = userPicks[userPicks.findIndex(pick => pick.id === id)].winner;
            if (userChoice === winner) {
                const winnerSeed = winner === 'top' ? topTeam.seed : bottomTeam.seed;
                playerData[index].numCorrect++;
                playerData[index].points += ROUND_VALUES[round - 1] * winnerSeed;
                playerData[index].pointsByRound[round - 1] += ROUND_VALUES[round - 1] * winnerSeed;
            } else {
                playerData[index].numIncorrect++;
            }

            // Now recalculate their max points
            let maxPoints = 0;
            userPicks.forEach((pickInfo) => {
                const { topTeam, bottomTeam, winner, round } = pickInfo;
                const winnerName = winner === 'top' ? topTeam.name : bottomTeam.name;
                const winnerSeed = winner === 'top' ? topTeam.seed : bottomTeam.seed;
                const teamAlive = teamData[teamData.findIndex(team => team.name === winnerName)].alive;

                if (teamAlive) {
                    maxPoints += ROUND_VALUES[round - 1] * winnerSeed;
                }                
            });

            playerData[index].currentMaxPoints = maxPoints;
        });

        // Lastly, mark the evaluated property as true
        bracketData[index].evaluated = true;
    }
});

// Now update the bracket data
const updatedBracketData = JSON.stringify(bracketData, null, 2);
await writeFile(path.resolve(`data/${year}/marchmadness/matchups.json`), updatedBracketData);

// Now update the team data
const updatedTeamData = JSON.stringify(teamData, null, 2);
await writeFile(path.resolve(`data/${year}/marchmadness/teams.json`), updatedTeamData);

// Now update the player data
const updatedPlayerData = JSON.stringify(playerData, null, 2);
await writeFile(path.resolve(`data/${year}/marchmadness/playerPicks.json`), updatedPlayerData);
