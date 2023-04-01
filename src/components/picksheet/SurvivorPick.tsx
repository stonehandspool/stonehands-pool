import { useState } from 'react';
import PickOneTeam from './PickOneTeam';

function SurvivorPick(props: any) {
    const { weekInfo, userInfo, priorPick } = props;
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    const findMatchupByTeam = (team: string) => {
        const matchupId = Object.keys(weekInfo).find((matchup: any) => weekInfo[matchup].home_team === team || weekInfo[matchup].away_team === team);
        return matchupId !== undefined ? weekInfo[matchupId] : null;
    };

    const handleSelection = (team: string) => {
        setSelectedTeam(team);
    };

    // See if the priorPick from this week has already happened (e.g. if their pick was the Thurs game and its now Fri)
    const priorPickMatchupInfo = findMatchupByTeam(priorPick);
    const priorPickGameCompleted = priorPickMatchupInfo && priorPickMatchupInfo.winner !== '' ? true : false;

    return (
        <div className='container pb-6'>
        <h3 className='title is-3'>Survivor Pick:</h3>
        {   userInfo.aliveInSurvivor &&
            <>
                <h4 className='subtitle'>Pick which team you are certain will win! If you pick wrong you will be eliminated! (No repeats)</h4>
                {priorPickGameCompleted && <h6 className='subtitle is-6 has-text-danger'>Your choice from this week has already played their game. you can no longer change your pick</h6>}
                <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => (
                        <div className='column is-one-quarter' key={`survivor-container-${index}`}>
                            <PickOneTeam
                                key={`card-${index}`}
                                homeTeam={weekInfo[matchup].home_team}
                                awayTeam={weekInfo[matchup].away_team}
                                gameInfo={weekInfo[matchup].gameInfo}
                                matchupNumber={index}
                                name={'survivor-pick'}
                                selectedTeam={selectedTeam}
                                handleSelection={handleSelection}
                                currentWeekPick={priorPick}
                                priorSurvivorPicks={userInfo.survivorPicks}
                                allGamesDisabled={priorPickGameCompleted}
                            />
                        </div>
                    ))
                }
                </div>
            </>
        }
        {
            !userInfo.aliveInSurvivor &&
            <h4 className='subtitle'>Sorry, you are no longer in the survivor pool, maybe next year!</h4>
        }
        </div>
    );
}

export default SurvivorPick;