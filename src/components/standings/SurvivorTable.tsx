import * as seasonStandings from '../../../data/2022/players.json';
import * as seasonResults from '../../../data/2022/season.json';
import { CURRENT_WEEK } from '../../constants';

type PlayerInfo = {
    name: string;
    survivorPicks: string[];
    aliveInSurvivor: boolean;
};

const headers: string[] = ['Player', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
const weeksArr = [...Array(18)];

const weeklyResults = seasonResults.weeks[`week_${CURRENT_WEEK}`];
const getGameCompleted = (teamName: string) => {
    let gameCompleted = false;
    Object.keys(weeklyResults).map(key => {
        const matchupInfo = weeklyResults[key as keyof typeof weeklyResults];
        if (matchupInfo.home_team === teamName || matchupInfo.away_team === teamName) {
            gameCompleted = matchupInfo.evaluated && matchupInfo.winner !== '';
        }
    });
    return gameCompleted;
};

function SurvivorTable() {
    const { players } = seasonStandings;
    // Calculate the standings
    const playerPicks: PlayerInfo[] = [];
    for (let i = 0; i < players.length; i++) {
        const playerInfo = players[i];
        const rowInfo: PlayerInfo = {
            name: `${playerInfo.firstName} ${playerInfo.lastName}`,
            survivorPicks: playerInfo.survivorPicks,
            aliveInSurvivor: playerInfo.aliveInSurvivor,
        };
        playerPicks.push(rowInfo);
    }

    // Sort everyone by how many weeks they've survived
    playerPicks.sort((row1, row2) => {
        // Sort by the number of weeks with picks made
        if (row1.survivorPicks.length > row2.survivorPicks.length) return -1;
        if (row1.survivorPicks.length < row2.survivorPicks.length) return 1;
        return 0;
    });
    
    return(
        <section className='section'>
            <div className='container'>
                <table className='table is-bordered is-hoverable mx-auto'>
                    <thead>
                        <tr>
                            {headers.map(heading => {
                                return <th key={heading} className='has-text-centered'>{heading}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                            {playerPicks.map((row, index) => {
                                return <tr key={`${index}`}>
                                    <td key={`${row.name}-row-${index}`}>{row.name}</td>
                                    {
                                        weeksArr.map((week, ind) => {
                                            const gameCompleted = getGameCompleted(row.survivorPicks[ind]);
                                            if (ind < row.survivorPicks.length - 1) {
                                                // If this is a selection from a prior week that was correct
                                                return <td key={`${row.name}-${ind}`} className='has-background-success'>{row.survivorPicks[ind]}</td>
                                            } else if (ind === row.survivorPicks.length - 1 && row.aliveInSurvivor && gameCompleted) {
                                                // If this was the most recent pick and it was correct
                                                return <td key={`${row.name}-${ind}`} className='has-background-success'>{row.survivorPicks[ind]}</td>
                                            } else if (ind === row.survivorPicks.length - 1 && row.aliveInSurvivor && !gameCompleted) {
                                                // If this was the most recent pick and the game hasn't finished yet
                                                return <td key={`${row.name}-${ind}`}>{row.survivorPicks[ind]}</td>
                                            } else if (ind === row.survivorPicks.length - 1 && !row.aliveInSurvivor) {
                                                // If this was the most recent pick and it was incorrect
                                                return <td key={`${row.name}-${ind}`} className='has-background-danger'>{row.survivorPicks[ind]}</td>
                                            } else {
                                                // If this player was eliminated at this point or just a week that hasn't happened yet
                                                return <td key={`${row.name}-${ind}`}></td>
                                            }
                                        })
                                    }
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default SurvivorTable;