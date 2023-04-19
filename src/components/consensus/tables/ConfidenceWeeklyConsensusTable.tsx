import { CURRENT_WEEK, SubmissionInfo } from '../../../constants';
import * as playerPicks from '../../../../data/2022/weeklyPicks.json';
import * as seasonData from '../../../../data/2022/season.json';
import * as TeamLogos from '../../../assets/logos';

type MatchupConsensusInfo = {
    homeTeam: string;
    homeNumPicks: number;
    homePercent: string;
    homePoints: number;
    homePointsAvg: number;
    awayTeam: string;
    awayNumPicks: number;
    awayPercent: string;
    awayPoints: number;
    awayPointsAvg: number;
};

function ConfidenceWeeklyConsensusTable() {
    const weeklyConsensusArr: MatchupConsensusInfo[] = [];
    const allWeeks = seasonData.weeks;
    const weekField = `week_${CURRENT_WEEK}`;
    const weekPicks: SubmissionInfo[] = playerPicks[weekField as keyof typeof playerPicks] as SubmissionInfo[];
    const weekGames = allWeeks[weekField as keyof typeof allWeeks];
    
    // First set up the initial values for the consensus info
    Object.keys(weekGames).map(key => {
        const matchup = weekGames[key as keyof typeof weekGames];
        weeklyConsensusArr.push({
            homeTeam: matchup.home_team,
            homeNumPicks: 0,
            homePercent: '0',
            homePoints: 0,
            homePointsAvg: 0,
            awayTeam: matchup.away_team,
            awayNumPicks: 0,
            awayPercent: '0',
            awayPoints: 0,
            awayPointsAvg: 0,
        });
    });

    // Now go through every players response and update the consensus info
    const numGames = Object.keys(weekGames).length;
    weekPicks.forEach(pickInfo => {
        const { submission_data: picks } = pickInfo;
        for (let i = 0; i < numGames; i++) {
            const consensusInfo = weeklyConsensusArr[i];
            const userChoice = picks[`matchup-${i}` as keyof typeof picks] as string;
            const userConfidence = parseInt(picks[`matchup-${i}-confidence` as keyof typeof picks] as string, 10);
            if (userChoice === consensusInfo.homeTeam) {
                consensusInfo.homeNumPicks++;
                consensusInfo.homePoints += userConfidence;
            } else {
                consensusInfo.awayNumPicks++;
                consensusInfo.awayPoints += userConfidence;
            }
        }
    });
    
    // Now calculate the percent and avg
    weeklyConsensusArr.forEach(consensusInfo => {
        // Odds are there will always be at least one person picking a team, but just in case have this check
        if (consensusInfo.homeNumPicks > 0) {
            consensusInfo.homePointsAvg = consensusInfo.homePoints / consensusInfo.homeNumPicks;
        } else {
            // If no one picked the home team, set the percents here
            consensusInfo.homePercent = '0%';
            consensusInfo.awayPercent = '100%';
        }
        if (consensusInfo.awayNumPicks > 0) {
            consensusInfo.awayPointsAvg = consensusInfo.awayPoints / consensusInfo.awayNumPicks;
        } else {
            consensusInfo.homePercent = '100%';
            consensusInfo.awayPercent = '0%';
        }

        if (consensusInfo.homeNumPicks > 0 && consensusInfo.awayNumPicks > 0) {
            const totalPicks = consensusInfo.homeNumPicks + consensusInfo.awayNumPicks;
            consensusInfo.homePercent = `${((consensusInfo.homeNumPicks / totalPicks) * 100).toFixed(1)}%`;
            consensusInfo.awayPercent = `${((consensusInfo.awayNumPicks / totalPicks) * 100).toFixed(1)}%`;
        }
    });

    return (
        <table className='table is-hoverable has-text-centered'>
            <tbody>
                <tr>
                    <td className='is-vcentered'><b>Away</b></td>
                    {
                        weeklyConsensusArr.map(info => {
                            const Logo = TeamLogos[info.awayTeam as keyof typeof TeamLogos];
                            return <td key={`${info.awayTeam}-weekly`}><Logo size={45} /></td>
                        })
                    }
                </tr>
                <tr>
                    <td>Times Chosen</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.awayTeam}-weekly-numPicks`}>{info.awayNumPicks}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Percent</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.awayTeam}-weekly-percent`}>{info.awayPercent}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Points</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.awayTeam}-weekly-points`}>{info.awayPoints}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Avg. Points</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.awayTeam}-weekly-pointsAvg`}>{info.awayPointsAvg}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td className='is-vcentered'><b>Home</b></td>
                    {
                        weeklyConsensusArr.map(info => {
                            const Logo = TeamLogos[info.homeTeam as keyof typeof TeamLogos];
                            return <td key={`${info.homeTeam}-weekly`}><Logo size={45} /></td>
                        })
                    }
                </tr>
                <tr>
                    <td>Times Chosen</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.homeTeam}-weekly-numPicks`}>{info.homeNumPicks}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Percent</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.homeTeam}-weekly-percent`}>{info.homePercent}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Points</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.homeTeam}-weekly-points`}>{info.homePoints}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Avg. Points</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.homeTeam}-weekly-pointsAvg`}>{info.homePointsAvg}</td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
}

export default ConfidenceWeeklyConsensusTable;