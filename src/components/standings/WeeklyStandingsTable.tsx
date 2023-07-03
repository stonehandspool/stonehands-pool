import * as seasonStandings from '../../../data/2023/players.json';

import { CURRENT_WEEK, CURRENT_WEEK_STATUS, MONDAY_NIGHT_TOTAL } from '../../constants';

type TableColumns = {
    position: number;
    name: string;
    wins: number;
    losses: number;
    ties: number;
    points: number;
    tiebreaker: number;
    result: string;
}

const headers: string[] = ['Position', 'Name', 'Points', 'Wins', 'Losses', 'Ties', 'Tiebreaker', 'Result'];

function WeeklyStandingsTable() {
    const { players } = seasonStandings;

    // If the current week is currently marked as START we don't want to show anything yet, so show the prior weeks data
    const weekToShow = CURRENT_WEEK_STATUS === 'START' && CURRENT_WEEK > 1 ? CURRENT_WEEK - 2 : CURRENT_WEEK - 1;

    // Calculate the standings
    const calculatedPicks: TableColumns[] = [];
    for (let i = 0; i < players.length; i++) {
        const playerInfo = players[i];
        const rowInfo: TableColumns = {
            position: -1,
            name: `${playerInfo.firstName} ${playerInfo.lastName}`,
            points: CURRENT_WEEK > 1 ? playerInfo.pointsByWeek[weekToShow] : playerInfo.currentWeekPoints,
            wins: CURRENT_WEEK > 1 ? playerInfo.winsByWeek[weekToShow] : playerInfo.currentWeekWins,
            losses: CURRENT_WEEK > 1 ? playerInfo.lossesByWeek[weekToShow] : playerInfo.currentWeekLosses,
            ties: CURRENT_WEEK > 1 ? playerInfo.tiesByWeek[weekToShow] : playerInfo.currentWeekTies,
            tiebreaker: CURRENT_WEEK > 1 ? playerInfo.tiebreakerByWeek[weekToShow] : playerInfo.currentWeekTiebreaker,
            result: '',
        };
        calculatedPicks.push(rowInfo);
    }

    // Sort everyone by points now
    calculatedPicks.sort((row1, row2) => {
        const row1Tb = Math.abs(MONDAY_NIGHT_TOTAL - row1.tiebreaker);
        const row2Tb = Math.abs(MONDAY_NIGHT_TOTAL - row2.tiebreaker);
        return row2.points - row1.points || row2.wins - row1.wins || row2Tb - row1Tb;
    });

    // Now update the position and result for the table
    for (let i = 0; i < calculatedPicks.length; i++) {
        calculatedPicks[i].position = i + 1;
        if (i === 0 && CURRENT_WEEK_STATUS !== 'IN_PROGRESS') {
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