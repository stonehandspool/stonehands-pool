import { useState } from 'react';
import { ValidPicks } from '../../constants';
import PickOneTeam from './PickOneTeam';

function MarginPicks(props: any) {
    const { weekInfo, userInfo } = props;
    const [selectedTeam, setSelectedTeam] = useState<ValidPicks | null>(null);

    const handleSelection = (team: ValidPicks) => {
        setSelectedTeam(team);
    };

    return (
        <div className='container pb-6'>
            <h3 className='title is-3'>Margin Pick:</h3>
            <h4 className='subtitle'>Pick which team you think will win by the most! (No repeats)</h4>
            <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => (
                        <div className='column is-one-third' key={`margin-container-${index}`}>
                            <PickOneTeam
                                key={`card-${index}`}
                                homeTeam={weekInfo[matchup].home_team}
                                awayTeam={weekInfo[matchup].away_team}
                                matchupNumber={index}
                                name={'margin-pick'}
                                selectedTeam={selectedTeam}
                                handleSelection={handleSelection}
                                priorMarginPicks={userInfo.marginPicks}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MarginPicks;