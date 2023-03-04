import { useState } from 'react';
import { dummyData } from '../../temp/dummyData';
import ConfidenceDropDown from './ConfidenceDropDown';
import MatchupCard from './MatchupCard';

function ConfidencePicks() {
    const [selectedConfidences, setSelectedConfidences] = useState<number[]>([]);

    const onUpdateConfidence = (previousValue: number, newValue: number) => {
        // Remove the previous value if we're changing a drop down
        setSelectedConfidences(previousSelections => previousSelections.filter(value => value !== previousValue));
        // Add in the new value from that drop down
        setSelectedConfidences(previousSelections => [...previousSelections, newValue]);
    };

    return(
        <div className='confidence-picks'>
            {
                dummyData.map(({ homeTeam, awayTeam }, index) => (
                    <div className='confidence-item' key={`confidence-${index}`}>
                        <MatchupCard key={`card-${index}`} homeTeam={homeTeam} awayTeam={awayTeam} matchupNumber={index} />
                        <ConfidenceDropDown
                            key={`dd-${index}`}
                            numOptions={dummyData.length} 
                            matchupNumber={index}
                            selectedNumbers={selectedConfidences}
                            onUpdateConfidence={onUpdateConfidence}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default ConfidencePicks;