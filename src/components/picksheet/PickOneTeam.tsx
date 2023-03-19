import * as TeamLogos from '../../assets/logos';
import * as TeamInfo from '../../../data/2022/teams.json';
import { MarginPick, ValidPicks } from '../../constants';

export interface PickOneTeamProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    matchupNumber: number;
    name: string;
    selectedTeam: string | null;
    handleSelection: Function;
    priorSurvivorPicks?: string[];
    priorMarginPicks?: MarginPick[];
};

type TeamLogoKey = keyof typeof TeamLogos;
const { teams } = TeamInfo;

function PickOneTeam(props: PickOneTeamProps) {
    const { homeTeam, awayTeam, matchupNumber, name, selectedTeam, handleSelection, priorSurvivorPicks, priorMarginPicks } = props;

    const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
    const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

    const homeTeamInfo = teams[homeTeam];
    const awayTeamInfo = teams[awayTeam];

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

    const awayDisabled = teamHasBeenChosen(awayTeam);
    const homeDisabled = teamHasBeenChosen(homeTeam);

    return (
        <div className='columns is-vcentered'>
            <div className='column control is-vertical-center'>
                {
                <AwayLogo size={45} opacity={awayDisabled ? 0.4 : 1} />}
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

            <div className='column is-vertical-center is-narrow'>
                <p>@</p>
            </div>
            
            <div className='column control is-vertical-center'>
                {<HomeLogo size={45} opacity={homeDisabled ? 0.4 : 1} />}
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