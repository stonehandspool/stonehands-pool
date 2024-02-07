import playerPicks from '../../../data/2024/marchmadness/playerPicks.json';
import { useNavigate } from 'react-router-dom';

type TableColumns = {
    position: number;
    name: string;
    wins: number;
    losses: number;
    points: number;
    maxPoints: number;
    pointsByRound: number[];
    tiebreaker: number;
    username: string;
}

function StandingsTable() {
    const navigate = useNavigate();

    const goToUserStats = (username: string) => {
        navigate(`/march-madness/bracket/${username}`);
    };

    // Calculate the standings
    const calculatedPicks: TableColumns[] = [];
    for (let i = 0; i < playerPicks.length; i++) {
        const playerInfo = playerPicks[i];
        const { firstName, lastName, username, points, pointsByRound, numCorrect, numIncorrect, currentMaxPoints, tiebreaker } = playerInfo;
        const rowInfo: TableColumns = {
            position: 0,
            name: `${firstName} ${lastName}`,
            wins: numCorrect,
            losses: numIncorrect,
            points,
            maxPoints: currentMaxPoints,
            pointsByRound,
            tiebreaker,
            username,
        };
        calculatedPicks.push(rowInfo);
    }

    // Sort everyone by points now
    calculatedPicks.sort((row1, row2) => row2.points - row1.points || row2.wins - row1.wins);

    // Now update everyones position value
    calculatedPicks.forEach((person, index) => person.position = index + 1);

    return (
        <section className='section'>
            <div className='container'>
                <table className='table is-narrow is-bordered is-striped is-hoverable mx-auto'>
                    <thead>
                        <tr>
                            <th colSpan={6}></th>
                            <th colSpan={6} className='has-text-centered'>Points By Round</th>
                            <th colSpan={2}></th>
                        </tr>
                        <tr>
                            <th className='has-text-centered'>Position</th>
                            <th className='has-text-centered'>Name</th>
                            <th className='has-text-centered'>Points</th>
                            <th className='has-text-centered'>Max Points</th>
                            <th className='has-text-centered'>Wins</th>
                            <th className='has-text-centered'>Losses</th>
                            <th className='has-text-centered'>1</th>
                            <th className='has-text-centered'>2</th>
                            <th className='has-text-centered'>3</th>
                            <th className='has-text-centered'>4</th>
                            <th className='has-text-centered'>5</th>
                            <th className='has-text-centered'>6</th>
                            <th className='has-text-centered'>Tiebreaker</th>
                            <th className='has-text-centered'>Bracket</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculatedPicks.map((row, index) => {
                            return <tr key={`${index}`}>
                                <td>{row.position}</td>
                                <td>{row.name}</td>
                                <td><b>{row.points}</b></td>
                                <td>{row.maxPoints}</td>
                                <td>{row.wins}</td>
                                <td>{row.losses}</td>
                                {
                                    row.pointsByRound.map((val, index) => {
                                        return <td key={`${row.username}-${index}`}>{val}</td>
                                    })
                                }
                                <td>{row.tiebreaker}</td>
                                <td>
                                    <button
                                        className='button is-small is-primary'
                                        onClick={() => goToUserStats(row.username)}
                                    >
                                        Click Here
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default StandingsTable;