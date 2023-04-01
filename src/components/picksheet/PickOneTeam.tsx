import { useEffect } from 'react';
import * as TeamLogos from '../../assets/logos';
import * as TeamInfo from '../../../data/2022/teams.json';
import { MarginPick, ValidPicks } from '../../constants';

export interface PickOneTeamProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    gameInfo: string;
    matchupNumber: number;
    name: string;
    selectedTeam: string | null;
    handleSelection: Function;
    currentWeekPick: string;
    priorSurvivorPicks?: string[];
    priorMarginPicks?: MarginPick[];
    allGamesDisabled: boolean;
};

type TeamLogoKey = keyof typeof TeamLogos;
const { teams } = TeamInfo;

function PickOneTeam(props: PickOneTeamProps) {
    const {
        homeTeam,
        awayTeam,
        gameInfo,
        matchupNumber,
        name,
        selectedTeam,
        handleSelection,
        currentWeekPick,
        priorSurvivorPicks,
        priorMarginPicks,
        allGamesDisabled,
    } = props;

    const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
    const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

    const homeTeamInfo = teams[homeTeam];
    const awayTeamInfo = teams[awayTeam];

    // If the user had previously submitted, select that radio button
    useEffect(() => {
        if (currentWeekPick) {
            handleSelection(currentWeekPick);
        }
    }, [currentWeekPick]);

    const onChoiceChange = (e: any) => {
        if (e.target.checked) {
            const team = e.target.value;
            handleSelection(team);
        }
    };

    const teamHasBeenChosen = (team: string) => {
        if (priorSurvivorPicks && priorSurvivorPicks.length > 0) {
            const chosen = priorSurvivorPicks.find(pick => pick === team);
            if (chosen) {
                return true;
            } else {
                return false;
            }
        } else if (priorMarginPicks && priorMarginPicks.length > 0) {
            const chosen = priorMarginPicks.find(pick => pick.team === team);
            if (chosen) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const awayDisabled = allGamesDisabled || teamHasBeenChosen(awayTeam);
    const homeDisabled = allGamesDisabled || teamHasBeenChosen(homeTeam);

    return (
        <div className='box'>
            <div className='py-0'>
                <p className='is-size-7 has-text-grey-light'>{gameInfo}</p>
            </div>
            <div className='control is-vertical-center'>
                <AwayLogo size={45} opacity={awayDisabled ? 0.4 : 1} />
                <label htmlFor={`${name}-matchup-${matchupNumber}-away-team`} className={awayDisabled ? 'has-text-grey-light' : 'has-text-grey-dark'}>
                    <input
                        type='radio'
                        id={`${name}-matchup-${matchupNumber}-away-team`}
                        name={name}
                        value={awayTeam}
                        checked={selectedTeam === awayTeam}
                        onChange={onChoiceChange}
                        disabled={awayDisabled}
                    />
                    {` ${awayTeam} (${awayTeamInfo.wins}-${awayTeamInfo.losses}-${awayTeamInfo.ties})`}
                </label>
            </div>
            <div className='control is-vertical-center'>
                <HomeLogo size={45} opacity={homeDisabled ? 0.4 : 1} />
                <label htmlFor={`${name}-matchup-${matchupNumber}-home-team`} className={homeDisabled ? 'has-text-grey-light' : 'has-text-grey-dark'}>
                    <input
                        type='radio'
                        id={`${name}-matchup-${matchupNumber}-home-team`}
                        name={name}
                        value={homeTeam}
                        checked={selectedTeam === homeTeam}
                        onChange={onChoiceChange}
                        disabled={homeDisabled}
                    />
                    {` ${homeTeam} (${homeTeamInfo.wins}-${homeTeamInfo.losses}-${homeTeamInfo.ties})`}
                </label>
            </div>
        </div>
    );
}

export default PickOneTeam;