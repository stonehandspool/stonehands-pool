import { CURRENT_WEEK, CURRENT_WEEK_CUTOFF_TIME, CURRENT_WEEK_STATUS, SEASON_READY, SubmissionInfo } from '../../../constants';
import * as playerPicks from '../../../../data/2023/weeklyPicks.json';
import * as seasonData from '../../../../data/2023/season.json';
import * as TeamLogos from '../../../assets/logos';
import { TEAM_CODES } from '../../../constants';

type YearlyConsensusInfo = {
    teamName: string;
    numTimesPicked: number;
    numTimesOppPicked: number;
    pickDiff: number;
    percent: string;
    pointsFor: number;
    pointsAgainst: number;
    pointDiff: number;
};

function ConfidenceYearlyConsensusTable() {
    // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
    // can't see what people have chosen prior to the cutoff happening
    const currentTime = new Date();
    const showCurrentWeek = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;
    const weekToShow = CURRENT_WEEK === 1 ? CURRENT_WEEK : showCurrentWeek ? CURRENT_WEEK : CURRENT_WEEK - 1;
    
    if (!SEASON_READY || (CURRENT_WEEK === 1 && !showCurrentWeek)) {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, there is no data to show yet This will update after the 1pm cutoff.</h3>
                </div>
            </section>
        )
    }
    const yearlyConsensusArr: YearlyConsensusInfo[] = [];
    const allWeeks = seasonData.weeks;    
    
    // First set up the initial values for the consensus info
    TEAM_CODES.forEach(teamCode => {
        yearlyConsensusArr.push({
            teamName: teamCode,
            numTimesPicked: 0,
            numTimesOppPicked: 0,
            pickDiff: 0,
            percent: '',
            pointsFor: 0,
            pointsAgainst: 0,
            pointDiff: 0,
        });
    });

    // Now loop through every week that has been played so far
    for (let i = 0; i < weekToShow; i++) {
        const weekField = `week_${i + 1}`;
        const weekPicks: SubmissionInfo[] = playerPicks.weeklyPicks[weekField as keyof typeof playerPicks.weeklyPicks] as unknown as SubmissionInfo[];
        const weekGames = allWeeks[weekField as keyof typeof allWeeks];
        
        // Now loop through every players response and update the consensus info
        const numGames = Object.keys(weekGames).length;
        weekPicks.forEach(pickInfo => {
            const { submission_data: picks } = pickInfo;
            for (let j = 0; j < numGames; j++) {
                const matchupField = `matchup_${j + 1}`;
                const matchupInfo = weekGames[matchupField as keyof typeof weekGames];
                const { home_team: homeTeam, away_team: awayTeam } = matchupInfo;
                const userChoice = picks[`matchup-${j}` as keyof typeof picks];
                const userConfidence = parseInt(picks[`matchup-${j}-confidence` as keyof typeof picks] as string, 10);
                const homeTeamConsensusInfo = yearlyConsensusArr.find(info => info.teamName === homeTeam);
                const awayTeamConsensusInfo = yearlyConsensusArr.find(info => info.teamName === awayTeam);

                if (homeTeamConsensusInfo !== undefined && awayTeamConsensusInfo !== undefined) {
                    if (userChoice === homeTeam) {
                        homeTeamConsensusInfo.numTimesPicked++;
                        homeTeamConsensusInfo.pointsFor += userConfidence;
                        awayTeamConsensusInfo.numTimesOppPicked++;
                        awayTeamConsensusInfo.pointsAgainst += userConfidence;
                    } else {
                        homeTeamConsensusInfo.numTimesOppPicked++;
                        homeTeamConsensusInfo.pointsAgainst += userConfidence;
                        awayTeamConsensusInfo.numTimesPicked++;
                        awayTeamConsensusInfo.pointsFor += userConfidence;
                    }
                }
            }
        });
    }
    
    // Now calculate the percent and avg
    yearlyConsensusArr.forEach(consensusInfo => {
        if (consensusInfo.numTimesPicked === 0) {
            consensusInfo.percent = '0%';
            consensusInfo.pickDiff = -consensusInfo.numTimesOppPicked;
            consensusInfo.pointDiff = -consensusInfo.pointsAgainst;
        } else {
            const totalPicks = consensusInfo.numTimesPicked + consensusInfo.numTimesOppPicked;
            consensusInfo.percent = `${((consensusInfo.numTimesPicked / totalPicks) * 100).toFixed(1)}%`;
            consensusInfo.pickDiff = consensusInfo.numTimesPicked - consensusInfo.numTimesOppPicked;
            consensusInfo.pointDiff = consensusInfo.pointsFor - consensusInfo.pointsAgainst;
        }
    });

    return (
        <table className='table is-hoverable has-text-centered'>
            <thead>
                <tr>
                    <th className='is-vcentered'>Team</th>
                    <th className='has-text-centered'><abbr title='Number of Times Picked'></abbr># Times <br /> Picked</th>
                    <th className='has-text-centered'><abbr title='Number of Times Opponent was Picked'></abbr># Times <br /> Opponent Picked</th>
                    <th className='is-vcentered'><abbr title='Pick Differential (Num Times Picked - Num Opp. Picked)'></abbr>Difference</th>
                    <th className='is-vcentered'>Percent</th>
                    <th className='is-vcentered'><abbr title='Cumulative Points from all times picked'></abbr>Points For</th>
                    <th className='is-vcentered'><abbr title='Cumulative Points from all times opponent was picked'></abbr>Points Against</th>
                    <th className='has-text-centered'><abbr title='Point Differential (Points For - Points Against)'></abbr>Point <br /> Difference</th>
                </tr>
            </thead>
            <tbody>
                {
                    yearlyConsensusArr.map((info, index) => {
                        return <tr key={`row-${index}`}>
                            {
                                Object.keys(info).map((key, index) => {
                                    if (index === 0) {
                                        const Logo = TeamLogos[info.teamName as keyof typeof TeamLogos];
                                        return <td key={`${info.teamName}-yearly`} className='is-vcentered'><Logo size={45} /></td>
                                    } else {
                                        return <td key={`${info.teamName}-${key}`} className='is-vcentered'>{info[key as keyof typeof info]}</td>
                                    }
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    );
}

export default ConfidenceYearlyConsensusTable;