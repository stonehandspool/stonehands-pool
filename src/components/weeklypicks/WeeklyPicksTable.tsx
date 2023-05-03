import './WeeklyPicksTable.css';

import * as seasonStandings from '../../../data/2023/players.json';
import * as allPicks from '../../../data/2023/weeklyPicks.json';
import * as seasonData from '../../../data/2023/season.json';

import { CURRENT_WEEK, SEASON_READY, SubmissionInfo } from '../../constants';

function WeeklyPicksTable() {
    if (!SEASON_READY) {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, there are no picks to show yet</h3>
                </div>
            </section>
        );
    }
    const { players } = seasonStandings;
    const weeklyPicks: SubmissionInfo[] = allPicks.weeklyPicks[`week_${CURRENT_WEEK}` as keyof typeof allPicks.weeklyPicks] as SubmissionInfo[];
    const { weeks } = seasonData;
    const currentWeek = weeks[`week_${CURRENT_WEEK}`];
    const numGamesThisWeek = Object.keys(currentWeek).length;

    const atArr = Array(numGamesThisWeek).fill('@');
    const emptyArr = Array(numGamesThisWeek + 4).fill('');
    const matchupKeys: string[] = Object.keys(currentWeek);

    // Sort everyone alphabetically by last name
    weeklyPicks.sort((row1, row2) => row1.submission_data.lastName.localeCompare(row2.submission_data.lastName));

    return (
        <table className='table is-striped is-hoverable mx-auto has-text-centered'>
            <tbody>
                <tr className='weekly-picks-table-top'>
                    <td colSpan={numGamesThisWeek + 4} align={'center'}>Pool members sorted by their last name in alphabetical order (<b>Bold = Win</b>)</td>
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
                    <td>Weekly <br />Tiebreaker</td>
                    <td>Weekly <br />Points</td>
                    <td>Season <br />Points</td>
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
                                {pick === undefined ? 'N/A' : pick}<br />{confidence}
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