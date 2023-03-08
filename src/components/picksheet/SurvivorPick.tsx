import { useState } from 'react';
import PickOneTeam from './PickOneTeam';

function SurvivorPick(props: any) {
    const { weekInfo } = props;
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    const handleSelection = (team: string) => {
        setSelectedTeam(team);
    };

    return (
        <div className='container pb-6'>
            <h3 className='title is-3'>Survivor Pick:</h3>
            <h4 className='subtitle'>Pick just <strong>1</strong> team that you are sure will win! If you pick wrong you will be eliminated! (No repeats)</h4>
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
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SurvivorPick;