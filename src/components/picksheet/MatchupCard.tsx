import { useState } from 'react';
import * as TeamLogos from '../../assets/logos';
import * as TeamInfo from '../../../data/2022/teams.json';
import { ValidPicks } from '../../constants';

export interface MatchupCardProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    matchupNumber: number;
};

type TeamLogoKey = keyof typeof TeamLogos;
const { teams } = TeamInfo;

function MatchupCard(props: MatchupCardProps) {
    const [chosenTeam, setChosenTeam] = useState<ValidPicks | 'Tie'>('Tie');
    const { homeTeam, awayTeam, matchupNumber } = props;

    const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
    const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

    const homeTeamInfo = teams[homeTeam];
    const awayTeamInfo = teams[awayTeam];

    const onChoiceChange = (e: any) => {
        if (e.target.checked) {
            setChosenTeam(e.target.value);
        }
    };

    return (
        <div className='container'>
            <div className='control is-vertical-center'>
                <AwayLogo size={45} />
                <label htmlFor={`matchup-${matchupNumber}-away-team`} className={chosenTeam === awayTeam ? 'chosen' : ''}>
                    <input
                        type='radio'
                        id={`matchup-${matchupNumber}-away-team`}
                        name={`matchup-${matchupNumber}`}
                        value={awayTeam}
                        checked={chosenTeam === awayTeam}
                        onChange={onChoiceChange}
                    />
                    {` ${awayTeamInfo.displayName} (${awayTeamInfo.wins}-${awayTeamInfo.losses}-${awayTeamInfo.ties})`}
                </label>
            </div>
            <div className='control is-vertical-center'>
                <HomeLogo size={45} />
                <label htmlFor={`matchup-${matchupNumber}-home-team`} className={chosenTeam === homeTeam ? 'chosen' : ''}>
                    <input
                        type='radio'
                        id={`matchup-${matchupNumber}-home-team`}
                        name={`matchup-${matchupNumber}`}
                        value={homeTeam}
                        checked={chosenTeam === homeTeam}
                        onChange={onChoiceChange}
                    />
                    {` ${homeTeamInfo.displayName} (${homeTeamInfo.wins}-${homeTeamInfo.losses}-${homeTeamInfo.ties})`}
                </label>
            </div>
        </div>
    );
}

export default MatchupCard;