import * as seasonStandings from '../../../data/2022/players.json';

import { CURRENT_WEEK_COMPLETE, MONDAY_NIGHT_TOTAL } from '../../constants';

type TableColumns = {
    position: number;
    name: string;
    wins: number;
    losses: number;
    ties: number;
    points: number;
    tiebreaker: string;
    result: string;
}

const headers: string[] = ['Position', 'Name', 'Wins', 'Losses', 'Ties', 'Points', 'Tiebreaker', 'Result'];

function WeeklyStandingsTable() {
    const { players } = seasonStandings;

    // Calculate the standings
    const calculatedPicks: TableColumns[] = [];
    for (let i = 0; i < players.length; i++) {
        const playerInfo = players[i];
        const rowInfo: TableColumns = {
            position: -1,
            name: `${playerInfo.firstName} ${playerInfo.lastName}`,
            wins: playerInfo.currentWeekWins,
            losses: playerInfo.currentWeekLosses,
            ties: playerInfo.currentWeekTies,
            points: playerInfo.currentWeekPoints,
            tiebreaker: playerInfo.currentWeekTiebreaker,
            result: '',
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
        // Tiebreaker 2 is closest to the total points for the monday night game
        if (Math.abs(MONDAY_NIGHT_TOTAL - parseInt(row1.tiebreaker, 10)) > Math.abs(MONDAY_NIGHT_TOTAL - parseInt(row1.tiebreaker, 10))) return 1;
        if (Math.abs(MONDAY_NIGHT_TOTAL - parseInt(row1.tiebreaker, 10)) < Math.abs(MONDAY_NIGHT_TOTAL - parseInt(row1.tiebreaker, 10))) return -1;
        
        return 0;
    });

    // Now update the position and result for the table
    for (let i = 0; i < calculatedPicks.length; i++) {
        calculatedPicks[i].position = i + 1;
        if (i === 0 && CURRENT_WEEK_COMPLETE) {
            calculatedPicks[i].result = 'Winner'
        } else {
            calculatedPicks[i].result = '**'
        }
    }
    
    // For looping through the submissions
    const tableKeys: string[] = Object.keys(calculatedPicks[0]);

    return (
        <section className='section'>
            <div className='container'>
                <table className='table is-striped is-hoverable mx-auto'>
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
        </section>
    );
}

export default WeeklyStandingsTable;