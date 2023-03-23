import { useState } from 'react';
import ConfidenceDropDown from './ConfidenceDropDown';
import MatchupCard from './MatchupCard';

function ConfidencePicks(props: any) {
    const { weekInfo } = props;
    const [selectedConfidences, setSelectedConfidences] = useState<number[]>([]);

    const numOptions = Object.keys(weekInfo).length;

    const onUpdateConfidence = (previousValue: number, newValue: number) => {
        // Remove the previous value if we're changing a drop down
        setSelectedConfidences(previousSelections => previousSelections.filter(value => value !== previousValue));
        // Add in the new value from that drop down
        setSelectedConfidences(previousSelections => [...previousSelections, newValue]);
    };

    return(
        <div className='container pb-6'>
            <h3 className='title is-3'>Confidence Picks:</h3>
            <h4 className='subtitle'>Pick which team you think will win and how confident you are! {numOptions} is the most confident while 1 is the least confident</h4>
            <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => (
                        <div className='column is-one-third' key={`confidence-${index}`}>
                            <div className='box'>
                                <div className='columns is-centered'>
                                    <div className='column is-three-fifths'>
                                        <MatchupCard key={`card-${index}`} homeTeam={weekInfo[matchup].home_team} awayTeam={weekInfo[matchup].away_team} matchupNumber={index} />
                                    </div>
                                    <div className='column is-narrow is-vertical-center'>
                                        <ConfidenceDropDown
                                            key={`dd-${index}`}
                                            numOptions={numOptions} 
                                            matchupNumber={index}
                                            selectedNumbers={selectedConfidences}
                                            onUpdateConfidence={onUpdateConfidence}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ConfidencePicks;