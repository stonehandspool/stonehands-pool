import { CURRENT_WEEK } from '../../../constants';
import * as playerPicks from '../../../../data/2023/weeklyPicks.json';
import * as seasonData from '../../../../data/2023/season.json';
import * as TeamLogos from '../../../assets/logos';

type MatchupConsensusInfo = {
    homeTeam: string;
    homeNumPicks: number;
    homePercent: string;
    awayTeam: string;
    awayNumPicks: number;
    awayPercent: string;
};

function MarginConsensusTable() {
    const weeklyConsensusArr: MatchupConsensusInfo[] = [];
    const allWeeks = seasonData.weeks;
    const weekField = `week_${CURRENT_WEEK}`;
    const weekPicks = playerPicks[weekField as keyof typeof playerPicks];
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
    weekPicks.forEach(pickInfo => {
        const { submission_data: picks } = pickInfo;
        for (let i = 0; i < numGames; i++) {
            const consensusInfo = weeklyConsensusArr[i];
            const userChoice = picks['margin-pick' as keyof typeof picks] as string;
            if (userChoice !== '' && userChoice === consensusInfo.homeTeam) {
                consensusInfo.homeNumPicks++;
            } else if (userChoice !== '' && userChoice === consensusInfo.awayTeam) {
                consensusInfo.awayNumPicks++;
            }
        }
    });
    
    // Now calculate the percent
    weeklyConsensusArr.forEach(consensusInfo => {
        if (consensusInfo.homeNumPicks > 0 && consensusInfo.awayNumPicks > 0) {
            const totalPicks = consensusInfo.homeNumPicks + consensusInfo.awayNumPicks;
            consensusInfo.homePercent = `${((consensusInfo.homeNumPicks / totalPicks) * 100).toFixed(1)}%`;
            consensusInfo.awayPercent = `${((consensusInfo.awayNumPicks / totalPicks) * 100).toFixed(1)}%`;
        } else if (consensusInfo.homeNumPicks === 0 && consensusInfo.awayNumPicks > 0) {
            consensusInfo.homePercent = '0%';
            consensusInfo.awayPercent = '100%';
        } else if (consensusInfo.homeNumPicks > 0 && consensusInfo.awayNumPicks === 0) {
            consensusInfo.homePercent = '100%';
            consensusInfo.awayPercent = '0%';
        } else {
            consensusInfo.homePercent = '0%';
            consensusInfo.awayPercent = '0%';
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
                            return <td key={`${info.awayTeam}`}><Logo size={45} /></td>
                        })
                    }
                </tr>
                <tr>
                    <td>Times Chosen</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.awayTeam}-numPicks`}>{info.awayNumPicks}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Percent</td>
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
                    <td>Times Chosen</td>
                    {
                        weeklyConsensusArr.map(info => (
                            <td key={`${info.homeTeam}-numPicks`}>{info.homeNumPicks}</td>
                        ))
                    }
                </tr>
                <tr>
                    <td>Percent</td>
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

export default MarginConsensusTable;