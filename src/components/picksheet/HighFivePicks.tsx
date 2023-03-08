import { useState } from 'react';
import { dummyData, ValidPicks } from '../../temp/dummyData';
import HighFiveCheckboxes from './HighFiveCheckBoxes';

function HighFivePicks(props: any) {
    const { weekInfo } = props;
    const [picks, setPicks] = useState<ValidPicks[]>([]);
    const MAX_PICKS = 5;

    const handleSelection = (type: string, teamA: ValidPicks, teamB?: ValidPicks) => {
        if (type === 'remove') {
            // Remove the previous value if we're changing a drop down
            setPicks(previousPicks => previousPicks.filter(pick => pick !== teamA));
        } else if (type === 'swap') {
            // First remove the previous selection
            setPicks(previousPicks => previousPicks.filter(pick => pick !== teamA));
            // Now add the other value
            setPicks(previousPicks => [...previousPicks, teamB as ValidPicks]);
        } else {
            setPicks(previousPicks => [...previousPicks, teamA]);
        }
    };
    
    return (
        <div className='container pb-6'>
            <h3 className='title is-3'>High Five Picks:</h3>
            <h4 className='subtitle'>Pick <strong>5</strong> teams you think will win this week, the more you get right the more points you get!</h4>
            <p>You have currently made {picks.length}/{MAX_PICKS} of your picks</p>
            <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => (
                        <div className='column is-one-third' key={`margin-container-${index}`}>
                            <HighFiveCheckboxes
                                key={`card-${index}`}
                                homeTeam={weekInfo[matchup].home_team}
                                awayTeam={weekInfo[matchup].away_team}
                                matchupNumber={index}
                                name={'high-five-picks'}
                                handleSelection={handleSelection}
                                maxPicks={MAX_PICKS}
                                picksArray={picks}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default HighFivePicks;