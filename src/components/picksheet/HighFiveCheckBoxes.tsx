import { useEffect, useState } from 'react';
import * as TeamLogos from '../../assets/logos';
import * as TeamInfo from '../../../data/2023/teams.json';
import { ValidPicks } from '../../constants';

export interface HighFiveCheckboxProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    gameInfo: string;
    gameStarted: boolean;
    gameCompleted: boolean;
    matchupNumber: number;
    name: string;
    handleSelection: Function;
    maxPicks: number;
    picksArray: ValidPicks[];
};

type TeamLogoKey = keyof typeof TeamLogos;
const { teams } = TeamInfo;

function HighFiveCheckboxes(props: HighFiveCheckboxProps) {
    const { homeTeam, awayTeam, gameInfo, gameStarted, gameCompleted, matchupNumber, name, handleSelection, maxPicks, picksArray } = props;
    const [selectedTeam, setSelectedTeam] = useState<ValidPicks | null>(null);
    const [currentWeekPickSet, setCurrentWeekPickSet] = useState(false);

    const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
    const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

    const homeTeamInfo = teams[homeTeam];
    const awayTeamInfo = teams[awayTeam];

    useEffect(() => {
        if (picksArray.length > 0 && !currentWeekPickSet) {
            if (picksArray.includes(homeTeam)) {
                handleSelection('add', homeTeam);
                setSelectedTeam(homeTeam)
            } else if (picksArray.includes(awayTeam)) {
                handleSelection('add', awayTeam);
                setSelectedTeam(awayTeam);
            }
            setCurrentWeekPickSet(true);
        }
    }, [picksArray]);

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

    const shouldDisable = gameStarted || gameCompleted;
    const textColor = shouldDisable ? 'has-text-grey-light' : 'has-text-grey-dark';

    return (
        <div className='box'>
            <div className='py-0'>
                <p className='is-size-7 has-text-grey-light'>{gameInfo}</p>
            </div>
            <div className='control is-vertical-center'>
                <AwayLogo size={45} opacity={shouldDisable ? 0.4 : 1} />
                <label className={`checkbox ${textColor}`} htmlFor={`${name}-matchup-${matchupNumber}-away-team`}>
                    <input
                        type='checkbox'
                        id={`${name}-matchup-${matchupNumber}-away-team`}
                        name={name}
                        value={awayTeam}
                        checked={selectedTeam === awayTeam}
                        onChange={onChoiceChange}
                        disabled={shouldDisable}
                    />
                    {` ${awayTeam} (${awayTeamInfo.wins}-${awayTeamInfo.losses}-${awayTeamInfo.ties})`}
                </label>
            </div>
            <div className='control is-vertical-center'>
                <HomeLogo size={45} opacity={shouldDisable ? 0.4 : 1} />
                <label className={`checkbox ${textColor}`} htmlFor={`${name}-matchup-${matchupNumber}-home-team`}>
                    <input
                        type='checkbox'
                        id={`${name}-matchup-${matchupNumber}-home-team`}
                        name={name}
                        value={homeTeam}
                        checked={selectedTeam === homeTeam}
                        onChange={onChoiceChange}
                        disabled={shouldDisable}
                    />
                    {` ${homeTeam} (${homeTeamInfo.wins}-${homeTeamInfo.losses}-${homeTeamInfo.ties})`}
                </label>
            </div>
        </div>
    );
}

export default HighFiveCheckboxes;