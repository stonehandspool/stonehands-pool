import { CURRENT_WEEK, CURRENT_WEEK_CUTOFF_TIME, CURRENT_WEEK_STATUS, SEASON_READY, SubmissionInfo } from '../../../constants';
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

function SurvivorConsensusTable() {
    // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
    // can't see what people have chosen prior to the cutoff happening
    const currentTime = new Date();
    const showCurrentWeek = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;
    const weekToShow = showCurrentWeek ? CURRENT_WEEK : CURRENT_WEEK - 1;
    
    if (!SEASON_READY || (CURRENT_WEEK === 1 && !showCurrentWeek)) {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, there is no data to show yet This will update after the 1pm cutoff.</h3>
                </div>
            </section>
        );
    }
    const weeklyConsensusArr: MatchupConsensusInfo[] = [];
    const allWeeks = seasonData.weeks;
    const weekField = `week_${weekToShow}`;
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
            const userChoice = picks['survivor-pick' as keyof typeof picks] as string;
            if (userChoice && userChoice !== '' && userChoice === consensusInfo.homeTeam) {
                consensusInfo.homeNumPicks++;
                totalPicks++;
            } else if (userChoice && userChoice !== '' && userChoice === consensusInfo.awayTeam) {
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

export default SurvivorConsensusTable;