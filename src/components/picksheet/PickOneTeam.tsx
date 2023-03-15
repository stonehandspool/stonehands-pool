import * as TeamLogos from '../../assets/logos';
import * as TeamInfo from '../../../data/2022/teams.json';
import { ValidPicks } from '../../constants';

export interface PickOneTeamProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    matchupNumber: number;
    name: string;
    selectedTeam: string | null;
    handleSelection: Function;
};

type TeamLogoKey = keyof typeof TeamLogos;
const { teams } = TeamInfo;

function PickOneTeam(props: PickOneTeamProps) {
    const { homeTeam, awayTeam, matchupNumber, name, selectedTeam, handleSelection } = props;

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

    return (
        <div className='columns is-vcentered'>
            <div className='column control is-vertical-center'>
                {<AwayLogo size={45} />}
                <label htmlFor={`${name}-matchup-${matchupNumber}-away-team`} className={selectedTeam === awayTeam ? 'chosen' : ''}>
                    <input
                        type='radio'
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
                <label htmlFor={`${name}-matchup-${matchupNumber}-home-team`} className={selectedTeam === homeTeam ? 'chosen' : ''}>
                    <input
                        type='radio'
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

export default PickOneTeam;