import './WeeklyPicksTable.css';

import * as TeamLogos from '../../assets/logos';
import { ResultInfo } from '../../constants';
import { choiceFormat } from '../picksheet/PickSheetForm';

type WeeklyPicksImagesTableProps = {
    weeklyResults: ResultInfo[];
    submittedPicks: choiceFormat[];
}

type TeamLogoKey = keyof typeof TeamLogos;

function WeeklyPicksImagesTable(props: WeeklyPicksImagesTableProps) {
    const { weeklyResults: results, submittedPicks: picks } = props;

    const atArr = Array(results.length).fill('@');
    const emptyArr = Array(results.length + 4).fill('');

    return (
        <table className='table is-striped is-hoverable mx-auto has-text-centered'>
            <tbody>
                <tr className='weekly-picks-table-top'>
                    <td colSpan={results.length + 4} align={'center'}>Pool members sorted in alphabetical order (Bold = Win)</td>
                </tr>
                <tr>
                    <td className='weekly-picks-table-away'><b>Away</b><br />Score:</td>
                    {results.map((result, index) => {
                        return <td key={`away-${index}`}>{result.awayTeam}<br />{result.awayScore}</td>
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
                    {results.map((result, index) => {
                        return <td key={`home-${index}`}>{result.homeTeam}<br />{result.homeScore}</td>
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
                {picks.map((pickInfo: any, index: number) => {
                    let points = 0;
                    return <tr key={`picks-${index}`}>
                        <td className='names is-vcentered'>{`${pickInfo.firstName} ${pickInfo.lastName}`}</td>
                        {results.map((result, index) => {
                            const pick = pickInfo[`matchup-${index}`];
                            const confidence = pickInfo[`matchup-${index}-confidence`];
                            const winner = result.winner;
                            const correct = pick === winner;
                            if (correct) {
                                points += parseInt(confidence, 10);
                            }
                            const Logo = TeamLogos[pick as TeamLogoKey];
                            return <td
                                key={`${pickInfo.id}-${index}`}
                                className={correct ? 'weekly-picks-table-correct-choice' : 'weekly-picks-table-incorrect-choice'}
                            >
                                {<Logo />}
                                <br />
                                {pick}
                                <br />
                                {confidence}
                            </td>
                        })}
                        <td className='is-vcentered'>{pickInfo.tiebreaker}</td>
                        <td className='is-vcentered'>{points}</td>
                        <td className='is-vcentered'>0</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default WeeklyPicksImagesTable;