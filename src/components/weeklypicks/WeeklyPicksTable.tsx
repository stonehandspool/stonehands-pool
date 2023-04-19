import './WeeklyPicksTable.css';

import * as seasonStandings from '../../../data/2022/players.json';
import * as allPicks from '../../../data/2022/weeklyPicks.json';
import * as seasonData from '../../../data/2022/season.json';

import { CURRENT_WEEK, SubmissionInfo } from '../../constants';

function WeeklyPicksTable() {
    const { players } = seasonStandings;
    const weeklyPicks: SubmissionInfo[] = allPicks[`week_${CURRENT_WEEK}`] as SubmissionInfo[];
    const { weeks } = seasonData;
    const currentWeek = weeks[`week_${CURRENT_WEEK}`];
    const numGamesThisWeek = Object.keys(currentWeek).length;

    const atArr = Array(numGamesThisWeek).fill('@');
    const emptyArr = Array(numGamesThisWeek + 4).fill('');
    const matchupKeys: string[] = Object.keys(currentWeek);

    return (
        <table className='table is-striped is-hoverable mx-auto has-text-centered'>
            <tbody>
                <tr className='weekly-picks-table-top'>
                    <td colSpan={numGamesThisWeek + 4} align={'center'}>Pool members sorted in alphabetical order (Bold = Win)</td>
                </tr>
                <tr>
                    <td className='weekly-picks-table-away'><b>Away</b><br />Score:</td>
                    {matchupKeys.map((key, index) => {
                        const { away_team, away_score } = currentWeek[key as keyof typeof currentWeek];
                        return <td key={`away-${index}`}>{away_team}<br />{away_score}</td>
                    })}
                </tr>
                <tr>
                    <td></td>
                    {atArr.map((at, index) => {
                        return <td key={`at-${index}`}>{at}</td>
                    })}
                </tr>
                <tr>
                    <td className='weekly-picks-table-home'><b>Home</b><br />Score:</td>
                    {matchupKeys.map((key, index) => {
                        const { home_team, home_score } = currentWeek[key as keyof typeof currentWeek];
                        return <td key={`home-${index}`}>{home_team}<br />{home_score}</td>
                    })}
                    <td>T/B</td>
                    <td>Points</td>
                    <td>Season</td>
                </tr>
                <tr>
                    {emptyArr.map((empty, index) => {
                        return <td key={`empty-${index}`}></td>
                    })}
                </tr>
                {weeklyPicks.map((pickInfo, index) => {
                    const { submission_data: picks } = pickInfo;
                    const playerInfo = players.find(player => player.id === pickInfo.user_id);
                    return <tr key={`picks-${index}`}>
                        <td className='names is-vcentered'>{`${picks.firstName} ${picks.lastName}`}</td>
                        {matchupKeys.map((key, index) => {
                            const { winner } = currentWeek[key as keyof typeof currentWeek];
                            const pick = picks[`matchup-${index}` as keyof typeof picks];
                            const confidence = picks[`matchup-${index}-confidence` as keyof typeof picks];
                            const correct = pick === winner;
                            return <td
                                key={`${pickInfo.user_id}-${index}`}
                                className={correct ? 'weekly-picks-table-correct-choice' : 'weekly-picks-table-incorrect-choice'}
                            >
                                {pick}<br />{confidence}
                            </td>
                        })}
                        <td className='is-vcentered'>{playerInfo?.currentWeekTiebreaker}</td>
                        <td className='is-vcentered'>{playerInfo?.currentWeekPoints}</td>
                        <td className='is-vcentered'>{playerInfo?.points}</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default WeeklyPicksTable;