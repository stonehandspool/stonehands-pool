import { useState } from 'react';
import { dummyData, ValidPicks } from '../../temp/dummyData';
import HighFiveCheckboxes from './HighFiveCheckBoxes';

function HighFivePicks() {
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
        <div className='high-five-picks'>
            <p>You have currently made {picks.length}/{MAX_PICKS} of your picks</p>
            <div className='high-five-picks-grid'>
                {
                    dummyData.map(({ homeTeam, awayTeam }, index) => (
                        <div className='confidence-item' key={`confidence-${index}`}>
                            <HighFiveCheckboxes
                                key={`card-${index}`}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam}
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