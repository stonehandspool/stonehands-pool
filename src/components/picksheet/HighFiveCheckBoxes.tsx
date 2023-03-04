import { useState } from 'react';
import { ValidPicks } from '../../temp/dummyData';

export interface HighFiveCheckboxProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    matchupNumber: number;
    name: string;
    handleSelection: Function;
    maxPicks: number;
    picksArray: ValidPicks[];
};

function HighFiveCheckboxes(props: HighFiveCheckboxProps) {
    const { homeTeam, awayTeam, matchupNumber, name, handleSelection, maxPicks, picksArray } = props;
    const [selectedTeam, setSelectedTeam] = useState<ValidPicks | null>(null);

    const onChoiceChange = (e: any) => {
        const team = e.target.value as ValidPicks;
        if (picksArray.length === maxPicks && !picksArray.includes(team) && !(team !== selectedTeam && selectedTeam && picksArray.includes(selectedTeam))) {
            return
        }

        if (team === selectedTeam) { // If deselecting a selected team
            handleSelection('remove', selectedTeam);
            setSelectedTeam(null);
            return;
        } else if (team !== selectedTeam) { // If selecting the opposite team
            handleSelection('swap', selectedTeam, team);
        } else { // Picking a team with no prior choice
            handleSelection('add', team);
        }
        setSelectedTeam(team);
    };

    return (
        <div className='matchup-card-pick-one'>
            <label htmlFor={`${name}-matchup-${matchupNumber}-away-team`} className={selectedTeam === awayTeam ? 'chosen' : ''}>
                <input
                    type='checkbox'
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
                    type='checkbox'
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

export default HighFiveCheckboxes;