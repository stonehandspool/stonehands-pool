import { useParams } from 'react-router-dom';

import * as TeamLogos from '../assets/logos'

import * as playerData from '../../data/2022/players.json';
import * as seasonData from '../../data/2022/season.json';
import * as weeklyPicks from '../../data/2022/weeklyPicks.json';
import { CURRENT_YEAR, SubmissionInfo, TEAM_CODES, UserInfo } from '../constants';
import HighFivePointsTable from '../components/userStats/HighFivePointsTable';
import UserConfidencePicksTable from '../components/userStats/UserConfidencePicksTable';

type TeamLogoKey = keyof typeof TeamLogos;
type TeamInfo = {
    team: string;
    wins: number;
    losses: number;
    ties: number;
};

function getProgressBarColor(percent: number) {
    if (percent > .8) {
        return 'is-success';
    } else if (percent > 0.4) {
        return 'is-warning';
    } else {
        return 'is-danger';
    }
}

function getPickStats(userPicks: SubmissionInfo[], weeks: any) {
    // Init an array of the teams to keep track
    const teamArray: TeamInfo[] = [];
    TEAM_CODES.map(teamCode => {
        teamArray.push({ team: teamCode, wins: 0, losses: 0, ties: 0 });
    });

    // The user picks unfortunately go from matchup-0 to matchup-15 while the weekly data goes
    // from matchup_1 to matchup_16, need to keep that discrepancy in mind
    userPicks.map((pickInfo, index) => {
        const { submission_data: picks } = pickInfo;
        const weeklyMatchups = weeks[`week_${index + 1}` as keyof typeof weeks];
        Object.keys(weeklyMatchups).map((matchup, ind) => {
            const userPick = picks[`matchup-${ind}` as keyof typeof picks];
            const { home_team, away_team } = weeklyMatchups[matchup];
            if (userPick === 'Tie') {
                const homeTeam = teamArray.find(team => team.team === home_team);
                const awayTeam = teamArray.find(team => team.team === away_team);
                homeTeam && homeTeam.ties++;
                awayTeam && awayTeam.ties++;
            } else {
                const pickedLoser = userPick === home_team ? away_team : home_team;
                const userWinner = teamArray.find(team => team.team === userPick);
                const userLoser = teamArray.find(team => team.team === pickedLoser);
                userWinner && userWinner.wins++;
                userLoser && userLoser.losses++;    
            }
        });
    });

    return teamArray;
}

function PersonalStats() {
    const { username } = useParams();
    const { players } = playerData;
    const { weeks } = seasonData;
    const userInfo: UserInfo = players.find(player => player.username === username) as UserInfo;
    const userPicks: SubmissionInfo[] = [];
    Object.keys(weeklyPicks).map((key, index) => {
        const week: SubmissionInfo[] = weeklyPicks[`week_${index + 1}` as keyof typeof weeklyPicks];
        if (week && week.length > 0) {
            const playerPicksThisWeek = week.find(submission => submission.submission_data.username === username);
            if (playerPicksThisWeek) {
                userPicks.push(playerPicksThisWeek);
            }
        }
    });

    const teamsByPicks = getPickStats(userPicks, weeks);

    let marginOperator;
    let survivorColor;
    let marginColor;
    let unusedSurvivorPicks;
    let unusedMarginPicks;
    let bestMargin;
    let bestMarginWeek;
    let worstMargin;
    let worstMarginWeek;
    let bestMarginWeekColor;
    let worstMarginWeekColor;
    if (userInfo) {
        if (userInfo.marginTotal > 0) {
            marginOperator = '+';
        } else if (userInfo.marginTotal < 0) {
            marginOperator = '-';
        } else {
            marginOperator = '';
        }

        survivorColor = userInfo.aliveInSurvivor ? 'has-text-success' : 'has-text-danger';
        marginColor = userInfo.marginTotal > 0 ? 'has-text-success' : 'has-text-danger';
    
        unusedSurvivorPicks = TEAM_CODES.filter(code => {
            return !userInfo.survivorPicks.includes(code);
        });
        unusedMarginPicks = TEAM_CODES.filter(code => {
            return !userInfo.marginPicks.some(pick => pick.team === code);
        });
    
        bestMargin = userInfo.marginPicks.reduce((prev, current) => {
            return prev.margin > current.margin ? prev : current;
        });
        const { team, margin } = bestMargin;
        bestMarginWeek = userInfo.marginPicks.findIndex(pick => pick.team === team) + 1;
        bestMarginWeekColor = margin > 0 ? 'has-text-success' : margin < 0 ? 'has-text-danger' : '';
        
        worstMargin = userInfo.marginPicks.reduce((prev, current) => {
            return prev.margin > current.margin ? current : prev;
        });
        const { team: worst, margin: worstVal } = worstMargin;
        worstMarginWeek = userInfo.marginPicks.findIndex(pick => pick.team === worst) + 1;
        worstMarginWeekColor = worstVal > 0 ? 'has-text-success' : worstVal < 0 ? 'has-text-danger' : '';
    }
    
    return(
        <section className='section'>
            <div className='container'>
                {
                    userInfo &&
                    <>
                        <div className='mb-5'>
                            <h1 className='title'>The stat page for: {`${userInfo.firstName} ${userInfo.lastName}`}</h1>
                            <h2 className='subtitle'>In-depth stats for the {CURRENT_YEAR} season</h2>
                        </div>
                        <h4 className='title is-4'>Stats at a glance:</h4>
                        <div className='box level'>
                            <div className='level-item has-text-centered'>
                                <div>
                                    <p className='heading'>Season Rank</p>
                                    <p className='title'>{userInfo.currentWeekRank}</p>
                                </div>
                            </div>
                            <div className='level-item has-text-centered'>
                                <div>
                                    <p className='heading'>Survivor Status</p>
                                    <p className={`title ${survivorColor}`}>{userInfo.aliveInSurvivor ? 'Alive' : 'Eliminated'}</p>
                                </div>
                            </div>
                            <div className='level-item has-text-centered'>
                                <div>
                                    <p className='heading'>Margin Total</p>
                                    <p className={`title ${marginColor}`}>{`${marginOperator}${userInfo.marginTotal}`}</p>
                                </div>
                            </div>
                            <div className='level-item has-text-centered'>
                                <div>
                                    <p className='heading'>High Five Total</p>
                                    <p className='title'>{userInfo.highFiveTotal}</p>
                                </div>
                            </div>
                        </div>
                        <h4 className='title is-4'>Confidence Picks by Week:</h4>
                            <UserConfidencePicksTable confidencePicks={userPicks} />
                        <h4 className='title is-4'>Survivor Stats:</h4>
                        <div className='columns is-vcentered'>
                            <div className='column is-narrow'>
                                <h5 className='title is-5'>Teams Used:</h5>
                            </div>
                            {
                                userInfo?.survivorPicks.map(pick => {
                                    const Logo = TeamLogos[pick as TeamLogoKey];
                                    return <div className='column is-narrow' key={`${pick}-survivor`}><Logo /></div>
                                })
                            }
                        </div>
                        <div className='columns is-vcentered is-multiline'>
                            <div className='column is-narrow'>
                                <h5 className='title is-5'>Unused Teams:</h5>
                            </div>
                            {
                                unusedSurvivorPicks?.map(pick => {
                                    const Logo = TeamLogos[pick as TeamLogoKey];
                                    return <div className='column is-narrow' key={`${pick}-survivor`}><Logo /></div>
                                })
                            }
                        </div>
                        <h4 className='title is-4'>Margin Stats:</h4>
                        <div className='columns is-centered'>
                            <div className='column is-narrow mx-6'>
                                <h5 className='title is-5'>Best Week: Week {bestMarginWeek} (<span className={`${bestMarginWeekColor}`}>{bestMargin && bestMargin.margin > 0 ? `+${bestMargin.margin}` : `-${bestMargin?.margin}`}</span>)</h5>
                            </div>
                            <div className='column is-narrow mx-6'>
                                <h5 className='title is-5'>Worst Week: Week {worstMarginWeek} (<span className={`${worstMarginWeekColor}`}>{worstMargin && worstMargin.margin > 0 ? `+${worstMargin.margin}` : `-${worstMargin?.margin}`}</span>)</h5>
                            </div>
                        </div>
                        <div className='columns is-vcentered'>
                            <div className='column is-narrow'>
                                <h5 className='title is-5'>Teams Used:</h5>
                            </div>
                            {
                                userInfo?.marginPicks.map(pick => {
                                    const Logo = TeamLogos[pick.team as TeamLogoKey];
                                    return <div className='column is-narrow' key={`${pick.team}-margin`}><Logo /></div>
                                })
                            }
                        </div>
                        <div className='columns is-vcentered is-multiline'>
                            <div className='column is-narrow'>
                                <h5 className='title is-5'>Unused Teams:</h5>
                            </div>
                            {
                                unusedMarginPicks?.map(pick => {
                                    const Logo = TeamLogos[pick as TeamLogoKey];
                                    return <div className='column is-narrow' key={`${pick}-margin`}><Logo /></div>
                                })
                            }
                        </div>
                        <h4 className='title is-4'>High Five Stats:</h4>
                            <h5 className='title is-5'>Points by Week:</h5>
                            <HighFivePointsTable highFivePoints={userInfo.highFiveValues} />
                        <h4 className='title is-4'>Picks by Team (Confidence Pool):</h4>
                            <div className='columns is-vcentered'>
                                <div className='column is-1'>
                                    <h6 className='title is-6 has-text-centered'>Team</h6>
                                </div>
                                <div className='column is-half'>
                                    <h6 className='title is-6 has-text-centered'>Percentage of weeks picked to win</h6>
                                </div>
                                <div className='column is-1'></div>
                                <div className='column is-1'>
                                    <h6 className='title is-6 has-text-centered'>Proj. Record</h6>
                                </div>
                            </div>
                            {
                                teamsByPicks.map((key, index) => {
                                    const { team, wins, ties, losses} = teamsByPicks[index];
                                    const Logo = TeamLogos[team as TeamLogoKey];
                                    const percentage = ((wins + (ties / 2)) / (wins + ties + losses)) * 100;
                                    return <div className='columns is-vcentered'>
                                        <div className='column is-1 has-text-centered'><Logo /></div>
                                        <div className='column is-half'>
                                            <progress className={`progress ${getProgressBarColor((wins + (ties / 2)) / (wins + ties + losses))}`} value={wins + (ties / 2)} max={wins + ties + losses}>{percentage}</progress>
                                        </div>
                                        <div className='column is-1'>
                                            <h6 className='title is-6'>{percentage}%</h6>
                                        </div>
                                        <div className='column is-1'>
                                            <h6 className='title is-6 has-text-centered'>{wins}-{losses}-{ties}</h6>
                                        </div>
                                    </div>
                                })
                            }
                    </>
                }
            </div>
        </section>
    );
}

export default PersonalStats;