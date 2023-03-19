import { useState } from 'react';
import PickOneTeam from './PickOneTeam';

function SurvivorPick(props: any) {
    const { weekInfo, userInfo } = props;
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    const handleSelection = (team: string) => {
        setSelectedTeam(team);
    };

    return (
        <div className='container pb-6'>
        <h3 className='title is-3'>Survivor Pick:</h3>
        {   userInfo.aliveInSurvivor &&
            <>
                <h4 className='subtitle'>Pick which team you are certain will win! If you pick wrong you will be eliminated! (No repeats)</h4>
                <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => (
                        <div className='column is-one-third' key={`survivor-container-${index}`}>
                            <PickOneTeam
                                key={`card-${index}`}
                                homeTeam={weekInfo[matchup].home_team}
                                awayTeam={weekInfo[matchup].away_team}
                                matchupNumber={index}
                                name={'survivor-pick'}
                                selectedTeam={selectedTeam}
                                handleSelection={handleSelection}
                                priorSurvivorPicks={userInfo.survivorPicks}
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