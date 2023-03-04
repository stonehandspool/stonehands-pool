import { useState } from 'react';
import { ValidPicks } from '../../temp/dummyData';

export interface PickOneTeamProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    matchupNumber: number;
    name: string;
    selectedTeam: ValidPicks | null;
    handleSelection: Function;
};

function PickOneTeam(props: PickOneTeamProps) {
    const { homeTeam, awayTeam, matchupNumber, name, selectedTeam, handleSelection } = props;

    const onChoiceChange = (e: any) => {
        if (e.target.checked) {
            const team = e.target.value as ValidPicks;
            handleSelection(team);
        }
    };

    return (
        <div className='matchup-card-pick-one'>
            <label htmlFor={`${name}-matchup-${matchupNumber}-away-team`} className={selectedTeam === awayTeam ? 'chosen' : ''}>
                <input
                    type='radio'
                    id={`${name}-matchup-${matchupNumber}-away-team`}
                    name={name}
                    value={awayTeam}
                    checked={selectedTeam === awayTeam}
                    onChange={onChoiceChange}
                />
                {awayTeam}
            </label>
            
            <label htmlFor={`${name}-matchup-${matchupNumber}-home-team`} className={selectedTeam === homeTeam ? 'chosen' : ''}>
                <input
                    type='radio'
                    id={`${name}-matchup-${matchupNumber}-home-team`}
                    name={name}
                    value={homeTeam}
                    checked={selectedTeam === homeTeam}
                    onChange={onChoiceChange}
                />
                {homeTeam}
            </label>
        </div>
    );
}

export default PickOneTeam;