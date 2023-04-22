import { useState } from 'react';
import ConfidenceDropDown from './ConfidenceDropDown';
import MatchupCard from './MatchupCard';

function ConfidencePicks(props: any) {
    const { weekInfo, priorPicks } = props;
    const numOptions = Object.keys(weekInfo).length;

    const [selectedPicks, setSelectedPicks] = useState<string[]>(new Array(numOptions));
    const [selectedConfidences, setSelectedConfidences] = useState<number[]>([]);

    let numGamesCompleted = 0;
    Object.keys(weekInfo).map(key => {
        if (weekInfo[key].winner !== '') {
            numGamesCompleted++;
        }
    });

    const onUpdatePick = (newValue: string, index: number) => {
        let pickCopy = [...selectedPicks];
        pickCopy[index] = newValue;
        setSelectedPicks(pickCopy);
    };

    const onUpdateConfidence = (previousValue: number, newValue: number) => {
        // Remove the previous value if we're changing a drop down
        setSelectedConfidences(previousSelections => previousSelections.filter(value => value !== previousValue));
        // Add in the new value from that drop down
        setSelectedConfidences(previousSelections => [...previousSelections, newValue]);
    };

    return(
        <div className='container pb-6'>
            <h3 className='title is-3'>Confidence Picks:</h3>
            <h4 className='subtitle'>
                Pick a winner for every game and assign points based off of how confident you are they will win! {numOptions} is the most confident while 1 is
                the least confident. If you are right, you will get that many points in the confidence pool.
            </h4>
            <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => {
                        const priorChoice = Object.keys(priorPicks).length === 0 && priorPicks.constructor === Object
                            ? null
                            : priorPicks[`matchup-${index}`];
                        const priorConfidence = Object.keys(priorPicks).length === 0 && priorPicks.constructor === Object
                            ? null
                            : priorPicks[`matchup-${index}-confidence`];
                        return (
                            <div className='column is-one-third' key={`confidence-${index}`}>
                            <div className='box'>
                                <div className='columns is-centered is-multiline'>
                                    <div className='column is-full py-0 pl-3'>
                                        <p className='is-size-7 has-text-grey-light'>{weekInfo[matchup].gameInfo}</p>
                                    </div>
                                    <div className='column is-three-fifths'>
                                        <MatchupCard
                                            key={`card-${index}`}
                                            homeTeam={weekInfo[matchup].home_team}
                                            awayTeam={weekInfo[matchup].away_team}
                                            matchupNumber={index}
                                            gameCompleted={weekInfo[matchup].winner !== ''}
                                            priorChoice={priorChoice}
                                            onUpdatePick={onUpdatePick}
                                        />
                                    </div>
                                    <div className='column is-narrow is-vertical-center'>
                                        <ConfidenceDropDown
                                            key={`dd-${index}`}
                                            numOptions={numOptions}
                                            numGamesCompleted={numGamesCompleted}
                                            gameCompleted={weekInfo[matchup].winner !== ''}
                                            priorConfidence={priorConfidence}
                                            matchupChoice={selectedPicks[index]}
                                            matchupNumber={index}
                                            selectedNumbers={selectedConfidences}
                                            onUpdateConfidence={onUpdateConfidence}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ConfidencePicks;