import { CURRENT_WEEK, SEASON_READY, SubmissionInfo } from '../../../constants';
import * as playerPicks from '../../../../data/2022/weeklyPicks.json';
import * as seasonData from '../../../../data/2022/season.json';
import * as TeamLogos from '../../../assets/logos';

type MatchupConsensusInfo = {
    homeTeam: string;
    homeNumPicks: number;
    homePercent: string;
    awayTeam: string;
    awayNumPicks: number;
    awayPercent: string;
};

function HighFiveConsensusTable() {
    if (!SEASON_READY) {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, there is no data to show yet</h3>
                </div>
            </section>
        );
    }
    const weeklyConsensusArr: MatchupConsensusInfo[] = [];
    const allWeeks = seasonData.weeks;
    const weekField = `week_${CURRENT_WEEK}`;
    const weekPicks: SubmissionInfo[] = playerPicks.weeklyPicks[weekField as keyof typeof playerPicks.weeklyPicks] as SubmissionInfo[];
    const weekGames = allWeeks[weekField as keyof typeof allWeeks];
    
    // First set up the initial values for the consensus info
    Object.keys(weekGames).map(key => {
        const matchup = weekGames[key as keyof typeof weekGames];
        weeklyConsensusArr.push({
            homeTeam: matchup.home_team,
            homeNumPicks: 0,
            homePercent: '0',
            awayTeam: matchup.away_team,
            awayNumPicks: 0,
            awayPercent: '0',
        });
    });

    // Now go through every players response and update the consensus info
    const numGames = Object.keys(weekGames).length;
    let totalPicks = 0;
    weekPicks.forEach(pickInfo => {
        const { submission_data: picks } = pickInfo;
        for (let i = 0; i < numGames; i++) {
            const consensusInfo = weeklyConsensusArr[i];
            const userChoices = picks.highFivePicks;
            if (userChoices.includes(consensusInfo.homeTeam)) {
                consensusInfo.homeNumPicks++;
                totalPicks++;
            } else if (userChoices.includes(consensusInfo.awayTeam)) {
                consensusInfo.awayNumPicks++;
                totalPicks++;
            }
        }
    });
    
    // Now calculate the percent
    weeklyConsensusArr.forEach(consensusInfo => {
        consensusInfo.homePercent = consensusInfo.homeNumPicks > 0
            ? `${((consensusInfo.homeNumPicks / totalPicks) * 100).toFixed(1)}%`
            : '0%';
        consensusInfo.awayPercent = consensusInfo.awayNumPicks > 0
            ? `${((consensusInfo.awayNumPicks / totalPicks) * 100).toFixed(1)}%`
            : '0%';
    });

    return (
        <table className='table is-hoverable has-text-centered'>
            <tbody>
                <tr>
                    <td className='is-vcentered'><b>Away</b></td>
                    {
                        weeklyConsensusArr.map(info => {
                            const Logo = TeamLogos[info.awayTeam as keyof typeof TeamLogos];
                            return <td key={`${info.awayTeam}`}><Logo size={45} /></td>
                        })
                    }
                </tr>
                <tr>
                    <td># Times Chosen</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.awayTeam}-numPicks`}>{info.awayNumPicks}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Percent of Pool</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.awayTeam}-percent`}>{info.awayPercent}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td className='is-vcentered'><b>Home</b></td>
                    {
                        weeklyConsensusArr.map(info => {
                            const Logo = TeamLogos[info.homeTeam as keyof typeof TeamLogos];
                            return <td key={`${info.homeTeam}`}><Logo size={45} /></td>
                        })
                    }
                </tr>
                <tr>
                    <td># Times Chosen</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.homeTeam}-numPicks`}>{info.homeNumPicks}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Percent of Pool</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.homeTeam}-percent`}>{info.homePercent}</td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
}

export default HighFiveConsensusTable;