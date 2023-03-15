import { useState } from 'react';
import * as TeamLogos from '../../assets/logos';
import * as TeamInfo from '../../../data/2022/teams.json';
import { ValidPicks } from '../../constants';

export interface HighFiveCheckboxProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    matchupNumber: number;
    name: string;
    handleSelection: Function;
    maxPicks: number;
    picksArray: ValidPicks[];
};

type TeamLogoKey = keyof typeof TeamLogos;
const { teams } = TeamInfo;

function HighFiveCheckboxes(props: HighFiveCheckboxProps) {
    const { homeTeam, awayTeam, matchupNumber, name, handleSelection, maxPicks, picksArray } = props;
    const [selectedTeam, setSelectedTeam] = useState<ValidPicks | null>(null);

    const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
    const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

    const homeTeamInfo = teams[homeTeam];
    const awayTeamInfo = teams[awayTeam];

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
        <div className='columns is-vcentered'>
            <div className='column control is-vertical-center'>
                {<AwayLogo size={45} />}
                <label className='checkbox' htmlFor={`${name}-matchup-${matchupNumber}-away-team`}>
                    <input
                        type='checkbox'
                        id={`${name}-matchup-${matchupNumber}-away-team`}
                        name={name}
                        value={awayTeam}
                        checked={selectedTeam === awayTeam}
                        onChange={onChoiceChange}
                    />
                    {` ${awayTeam} (${awayTeamInfo.wins}-${awayTeamInfo.losses}-${awayTeamInfo.ties})`}
                </label>
            </div>

            <div className='column is-vertical-center is-narrow'>
                <p>@</p>
            </div>
            
            <div className='column control is-vertical-center'>
            {<HomeLogo size={45} />}
                <label className='checkbox' htmlFor={`${name}-matchup-${matchupNumber}-home-team`}>
                    <input
                        type='checkbox'
                        id={`${name}-matchup-${matchupNumber}-home-team`}
                        name={name}
                        value={homeTeam}
                        checked={selectedTeam === homeTeam}
                        onChange={onChoiceChange}
                    />
                    {` ${homeTeam} (${homeTeamInfo.wins}-${homeTeamInfo.losses}-${homeTeamInfo.ties})`}
                </label>
            </div>
        </div>
    );
}

export default HighFiveCheckboxes;