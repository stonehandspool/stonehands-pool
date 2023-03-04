import { useState } from 'react';
import { ValidPicks } from '../../temp/dummyData';

export interface MatchupCardProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    matchupNumber: number;
};

function MatchupCard(props: MatchupCardProps) {
    const [chosenTeam, setChosenTeam] = useState<ValidPicks | 'Tie'>('Tie');
    const { homeTeam, awayTeam, matchupNumber } = props;

    const onChoiceChange = (e: any) => {
        if (e.target.checked) {
            setChosenTeam(e.target.value);
        }
    };

    return (
        <div className='matchup-card'>
            <label htmlFor={`matchup-${matchupNumber}-away-team`} className={chosenTeam === awayTeam ? 'chosen' : ''}>
                <input
                    type='radio'
                    id={`matchup-${matchupNumber}-away-team`}
                    name={`matchup-${matchupNumber}`}
                    value={awayTeam}
                    checked={chosenTeam === awayTeam}
                    onChange={onChoiceChange}
                />
                {awayTeam}
            </label>

            <label htmlFor={`matchup-${matchupNumber}-tie`} className={chosenTeam === 'Tie' ? 'chosen' : ''}>
                <input
                    type='radio'
                    id={`matchup-${matchupNumber}-tie`}
                    name={`matchup-${matchupNumber}`}
                    value='Tie'
                    checked={chosenTeam === 'Tie'}
                    onChange={onChoiceChange}
                />
                Tie
            </label>
            
            <label htmlFor={`matchup-${matchupNumber}-home-team`} className={chosenTeam === homeTeam ? 'chosen' : ''}>
                <input
                    type='radio'
                    id={`matchup-${matchupNumber}-home-team`}
                    name={`matchup-${matchupNumber}`}
                    value={homeTeam}
                    checked={chosenTeam === homeTeam}
                    onChange={onChoiceChange}
                />
                {homeTeam}
            </label>
        </div>
    );
}

export default MatchupCard;