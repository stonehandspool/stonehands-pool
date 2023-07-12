import { useState } from 'react';
import { useParams } from 'react-router-dom';

import * as playerData from '../../data/2023/players.json';
import * as seasonData from '../../data/2023/season.json';
import * as weeklyPicks from '../../data/2023/weeklyPicks.json';
import { CURRENT_WEEK, CURRENT_WEEK_CUTOFF_TIME, CURRENT_WEEK_STATUS, CURRENT_YEAR, SEASON_READY, SubmissionInfo, TEAM_CODES, UserInfo } from '../constants';
import UserConfidenceReport from '../components/userStats/UserConfidenceReport';
import UserSurvivorReport from '../components/userStats/UserSurvivorReport';
import UserMarginReport from '../components/userStats/UserMarginReport';
import UserHighFiveReport from '../components/userStats/UserHighFiveReport';

enum Pools {
    Confidence,
    Survivor,
    Margin,
    HighFive,
};

type TeamInfo = {
    team: string;
    wins: number;
    losses: number;
    ties: number;
};

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
    if (!SEASON_READY) {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, there is no data to show yet</h3>
                </div>
            </section>
        );
    }
    const { username } = useParams();
    const [activeChoice, setActiveChoice] = useState(Pools.Confidence);

    const showChoice = (choice: Pools) => {
        setActiveChoice(choice);
    };

    const { players } = playerData;
    const { weeks } = seasonData;
    const userInfo: UserInfo = players.find(player => player.username === username) as unknown as UserInfo;

    if (!userInfo) {
        return (
            <div className='section'>
                <h1 className='title has-text-warning'>Oops! We were unable to find info for that player, did you type in the correct username?</h1>
            </div>
        );
    }

    const currentTime = new Date();
    const showCurrentWeek = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;
    const weekToShow = CURRENT_WEEK === 1 ? CURRENT_WEEK : showCurrentWeek ? CURRENT_WEEK : CURRENT_WEEK - 1;

    const userPicks: SubmissionInfo[] = [];
    Object.keys(weeklyPicks).map((key, index) => {
        const week: SubmissionInfo[] = weeklyPicks.weeklyPicks[`week_${index + 1}` as keyof typeof weeklyPicks.weeklyPicks] as SubmissionInfo[];
        if (week && week.length > 0 && index < weekToShow) {
            const playerPicksThisWeek = week.find(submission => submission.submission_data.username === username);
            if (playerPicksThisWeek) {
                userPicks.push(playerPicksThisWeek);
            }
        }
    });
    
    const { pointsByWeek } = userInfo;
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
    if (userInfo) {
        if (userInfo.marginTotal > 0) {
            marginOperator = '+';
        } else {
            marginOperator = '';
        }

        survivorColor = userInfo.aliveInSurvivor ? 'has-text-success' : 'has-text-danger';
        marginColor = userInfo.marginTotal > 0 ? 'has-text-success' : 'has-text-danger';
    
        unusedSurvivorPicks = TEAM_CODES.filter(code => {
            return !userInfo.survivorPicks.includes(code);
        });

        // If we don't want to show all of their picks, move the most recent one back into the unused pool and re-alphabetize
        if (weekToShow < CURRENT_WEEK) {
            unusedSurvivorPicks.push(userInfo.survivorPicks[userInfo.survivorPicks.length - 1]);
            unusedSurvivorPicks.sort();
        }

        unusedMarginPicks = TEAM_CODES.filter(code => {
            return !userInfo.marginPicks.some(pick => pick.team === code);
        });

        if (weekToShow < CURRENT_WEEK) {
            unusedMarginPicks.push(userInfo.marginPicks[userInfo.marginPicks.length - 1].team);
            unusedMarginPicks.sort();
        }
    
        bestMargin = userInfo.marginPicks.reduce((prev, current) => {
            return prev.margin > current.margin ? prev : current;
        });
        const { team, margin } = bestMargin;
        bestMarginWeek = userInfo.marginPicks.findIndex(pick => pick.team === team) + 1;
        
        worstMargin = userInfo.marginPicks.reduce((prev, current) => {
            return prev.margin > current.margin && current.margin !== null ? current : prev;
        });
        const { team: worst, margin: worstVal } = worstMargin;
        worstMarginWeek = userInfo.marginPicks.findIndex(pick => pick.team === worst) + 1;
    }
    
    return(
        <section className='section'>
            <div className='container'>
                <div className='mb-5'>
                    <h1 className='title has-text-centered'>The stat page for {`${userInfo.firstName} ${userInfo.lastName}`}</h1>
                    <h2 className='subtitle has-text-centered'>In-depth state for the {CURRENT_YEAR} season</h2>
                </div>
                <div className='mb-6'>
                    <h4 className='title is-4 has-text-centered'>Stats at a glance:</h4>
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
                </div>
                <div className='container'>
                    <div className='tabs is-centered is-boxed'>
                        <ul>
                            <li className={activeChoice === Pools.Confidence ? 'is-active' : ''}>
                                <a onClick={() => showChoice(Pools.Confidence)}>
                                    <span>Confidence</span>
                                </a>
                            </li>
                            <li className={activeChoice === Pools.Survivor ? 'is-active' : ''}>
                                <a onClick={() => showChoice(Pools.Survivor)}>
                                    <span>Survivor</span>
                                </a>
                            </li>
                            <li className={activeChoice === Pools.Margin ? 'is-active' : ''}>
                                <a onClick={() => showChoice(Pools.Margin)}>
                                    <span>Margin</span>
                                </a>
                            </li>
                            <li className={activeChoice === Pools.HighFive ? 'is-active' : ''}>
                                <a onClick={() => showChoice(Pools.HighFive)}>
                                    <span>High-Five</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='container'>
                        {activeChoice === Pools.Confidence && <UserConfidenceReport userPicks={userPicks} teamsByPicks={teamsByPicks} pointsByWeek={pointsByWeek} />}
                        {activeChoice === Pools.Survivor && <UserSurvivorReport userInfo={userInfo} unusedSurvivorPicks={unusedSurvivorPicks} weekToShow={weekToShow} />}
                        {activeChoice === Pools.Margin && <UserMarginReport userInfo={userInfo} unusedMarginPicks={unusedMarginPicks} bestMarginWeek={bestMarginWeek} bestMargin={bestMargin} worstMarginWeek={worstMarginWeek} worstMargin={worstMargin} weekToShow={weekToShow} />}
                        {activeChoice === Pools.HighFive && <UserHighFiveReport userInfo={userInfo} weekToShow={weekToShow} />}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PersonalStats;