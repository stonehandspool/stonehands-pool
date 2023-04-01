import { useState } from 'react';
import { ValidPicks } from '../../constants';
import PickOneTeam from './PickOneTeam';

function MarginPicks(props: any) {
    const { weekInfo, userInfo, priorPick } = props;
    const [selectedTeam, setSelectedTeam] = useState<ValidPicks | null>(null);

    const findMatchupByTeam = (team: string) => {
        const matchupId = Object.keys(weekInfo).find((matchup: any) => weekInfo[matchup].home_team === team || weekInfo[matchup].away_team === team);
        return matchupId !== undefined ? weekInfo[matchupId] : null;
    };

    const handleSelection = (team: ValidPicks) => {
        setSelectedTeam(team);
    };

    // See if the priorPick from this week has already happened (e.g. if their pick was the Thurs game and its now Fri)
    const priorPickMatchupInfo = findMatchupByTeam(priorPick);
    const priorPickGameCompleted = priorPickMatchupInfo && priorPickMatchupInfo.winner !== '' ? true : false;    

    return (
        <div className='container pb-6'>
            <h3 className='title is-3'>Margin Pick:</h3>
            <h4 className='subtitle'>Pick which team you think will win by the most! (No repeats)</h4>
            {priorPickGameCompleted && <h6 className='subtitle is-6 has-text-danger'>Your choice from this week has already played their game. you can no longer change your pick</h6>}
            <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => (
                        <div className='column is-one-quarter' key={`margin-container-${index}`}>
                            <PickOneTeam
                                key={`card-${index}`}
                                homeTeam={weekInfo[matchup].home_team}
                                awayTeam={weekInfo[matchup].away_team}
                                gameInfo={weekInfo[matchup].gameInfo}
                                matchupNumber={index}
                                name={'margin-pick'}
                                selectedTeam={selectedTeam}
                                handleSelection={handleSelection}
                                currentWeekPick={priorPick}
                                priorMarginPicks={userInfo.marginPicks}
                                allGamesDisabled={priorPickGameCompleted}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MarginPicks;