import { ResultInfo } from '../../constants';
import { choiceFormat } from '../picksheet/PickSheetForm';

type WeeklyStandingsTableProps = {
    weeklyResults: ResultInfo[];
    submittedPicks: choiceFormat[];
}

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

const headers: string[] = ['Position', 'Name', 'Wins', 'Losses', 'Ties', 'Points', 'Tiebreaker', 'Result'];

function WeeklyStandingsTable(props: WeeklyStandingsTableProps) {
    const { weeklyResults: results, submittedPicks: picks } = props;

    // Calculate the standings
    const calculatedPicks: TableColumns[] = [];
    for (let i = 0; i < picks.length; i++) {
        const pickInfo = picks[i];
        const rowInfo: TableColumns = {
            position: -1,
            name: `${pickInfo.firstName} ${pickInfo.lastName}`,
            wins: 0,
            losses: 0,
            ties: 0,
            points: 0,
            tiebreaker: pickInfo.tiebreaker as number,
            result: '',
        };

        // Now check each games result and update the row info
        for (let j = 0; j < results.length; j++) {
            const gameInfo = results[j];
            const userChoice = pickInfo[`matchup-${j}`];
            const userChoiceConfidence = parseInt(pickInfo[`matchup-${j}-confidence`].toString(), 10);
            if (gameInfo.winner === userChoice) {
                rowInfo.wins++;
                rowInfo.points += userChoiceConfidence;
            } else if (gameInfo.winner === 'Tie') {
                rowInfo.ties++;
                rowInfo.points += userChoiceConfidence / 2;
            } else {
                rowInfo.losses++;
            }
        }

        calculatedPicks.push(rowInfo);
    }

    // Sort everyone by points now
    const totalMondayPoints = results[results.length - 1].homeScore + results[results.length - 1].awayScore;
    calculatedPicks.sort((row1, row2) => {
        // First, sort by the number of points
        if (row1.points > row2.points) return -1;
        if (row1.points < row2.points) return 1;
        // Tiebreaker 1 is closest to the total points for the monday night game
        if (Math.abs(totalMondayPoints - row1.tiebreaker) > Math.abs(totalMondayPoints - row2.tiebreaker)) return 1;
        if (Math.abs(totalMondayPoints - row1.tiebreaker) < Math.abs(totalMondayPoints - row2.tiebreaker)) return -1;
        // Tiebreaker 2 is highest number of wins
        if (row1.wins > row2.wins) return -1;
        if (row1.wins < row2.wins) return 1;
        return 0;
    });

    // Now update the position and result for the table
    for (let i = 0; i < calculatedPicks.length; i++) {
        calculatedPicks[i].position = i + 1;
        if (i === 0) {
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