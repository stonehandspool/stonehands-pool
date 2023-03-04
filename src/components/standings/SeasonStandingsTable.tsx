import { ResultInfo } from '../../temp/dummyData';
import { choiceFormat } from '../picksheet/PickSheetForm';
import * as seasonStandings from '../../../public/data/2022/players.json';

type TableColumns = {
    position: number;
    name: string;
    wins: number;
    losses: number;
    ties: number;
    percent: number,
    points: number;
    tiebreaker: number;
    lastWeek: number;
    change: string;
}

const headers: string[] = ['Position', 'Name', 'Wins', 'Losses', 'Ties', 'Percent', 'Points', 'Tiebreaker Avg', 'Last Week', 'Change'];

function SeasonStandingsTable() {
    const { players } = seasonStandings;
    // Calculate the standings
    const calculatedPicks: TableColumns[] = [];
    for (let i = 0; i < players.length; i++) {
        const playerInfo = players[i];
        const rowInfo: TableColumns = {
            position: playerInfo.currentWeek,
            name: `${playerInfo.firstName} ${playerInfo.lastName}`,
            wins: playerInfo.wins,
            losses: playerInfo.losses,
            ties: 0,
            percent: playerInfo.wins / (playerInfo.wins + playerInfo.losses),
            points: 0,
            tiebreaker: playerInfo.tbAvg,
            lastWeek: playerInfo.lastWeek,
            change: playerInfo.change,
        };
        calculatedPicks.push(rowInfo);
    }

    // Sort everyone by points now
    calculatedPicks.sort((row1, row2) => {
        // First, sort by the number of points
        if (row1.points > row2.points) return -1;
        if (row1.points < row2.points) return 1;
        // Tiebreaker 1 is highest number of wins
        if (row1.wins > row2.wins) return -1;
        if (row1.wins < row2.wins) return 1;
        return 0;
    });
    
    // For looping through the submissions
    const tableKeys: string[] = Object.keys(calculatedPicks[0]);

    return (
        <div className='weekly-standings-table'>
            <table>
                <thead>
                    <tr>
                        {headers.map(heading => {
                            return <th key={heading}>{heading}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                        {calculatedPicks.map((row, index) => {
                            return <tr key={`${index}`}>
                                {tableKeys.map((key, ind) => {
                                    return <td key={`${row.position}-${ind}`}>{row[key as keyof TableColumns]}</td>
                                })}
                            </tr>
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default SeasonStandingsTable;