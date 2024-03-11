import { useEffect, useState } from 'react';
import playerPicks from '../../../data/2024/marchmadness/playerPicks.json';
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../config/supabaseClient';
import { TABLE_NAMES } from '../../config/supabaseConfig';
import { MARCH_MADNESS_STATE } from '../../constants';

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
    const [allPicks, setAllPicks] = useState<any[]>([]);
    const [calculatedPicks, setCalculatedPicks] = useState<TableColumns[]>([]);

    useEffect(() => {
        const fetchPicks = async () => {
            const { data } = await supabaseClient
                .from(TABLE_NAMES.MARCH_MADNESS_PICKS)
                .select();

            if (data && data.length > 0) {
                setAllPicks(data);
            }
        };

        if (MARCH_MADNESS_STATE !== 'ACTIVE') {
            fetchPicks();
        } else {
            setAllPicks(playerPicks);
        }
    }, []);

    useEffect(() => {
        // Calculate the standings
        const tempPicks: TableColumns[] = [];
        for (let i = 0; i < allPicks.length; i++) {
            const playerInfo = allPicks[i];
            const { firstName, lastName, username, points, pointsByRound, numCorrect, numIncorrect, currentMaxPoints } = playerInfo.submission_data ?? playerInfo;
            const { tiebreaker } = playerInfo;
            const rowInfo: TableColumns = {
                position: 0,
                name: `${firstName} ${lastName}`,
                wins: numCorrect,
                losses: numIncorrect,
                points,
                maxPoints: MARCH_MADNESS_STATE !== 'ACTIVE' ? '?' : currentMaxPoints,
                pointsByRound,
                tiebreaker: MARCH_MADNESS_STATE !== 'ACTIVE' ? '?' : tiebreaker,
                username,
            };
            tempPicks.push(rowInfo);
        }

        // Sort everyone by points now
        tempPicks.sort((row1, row2) => {
            const firstName1 = row1.name.split(' ')[0] as string;
            const lastName1 = row1.name.split(' ').pop() as string;
            const firstName2 = row2.name.split(' ')[0] as string;
            const lastName2 = row2.name.split(' ').pop() as string;
            return row2.points - row1.points || row2.wins - row1.wins || lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2);
        });

        // Now update everyones position value
        tempPicks.forEach((person, index) => person.position = index + 1);
        setCalculatedPicks(tempPicks);
    }, [allPicks]);

    const goToUserStats = (username: string) => {
        if (MARCH_MADNESS_STATE !== 'ACTIVE') {
            return;
        }
        navigate(`/march-madness/bracket/${username}`);
    };

    if (calculatedPicks.length === 0) {
        return (
            <></>
        );
    }

    return (
        <section className='section'>
            <div className='container'>
                <table className='table is-narrow is-striped is-hoverable mx-auto'>
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
                                        {MARCH_MADNESS_STATE === 'ACTIVE' ? 'Click Here' : 'TBD'}
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