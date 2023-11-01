import { useState } from 'react';

function StandingsByWeek() {
    const [activeChoice, setActiveChoice] = useState<number>(1);

    const showChoice = (week: number) => {
        setActiveChoice(week);
    };

    return (
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
    )
}

export default StandingsByWeek;