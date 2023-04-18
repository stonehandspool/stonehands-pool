import { useEffect, useState } from 'react';
import * as TeamLogos from '../../assets/logos';
import * as TeamInfo from '../../../data/2023/teams.json';
import { ValidPicks } from '../../constants';

export interface MatchupCardProps {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    matchupNumber: number;
    gameCompleted: boolean;
    priorChoice: ValidPicks;
};

type TeamLogoKey = keyof typeof TeamLogos;
const { teams } = TeamInfo;

function MatchupCard(props: MatchupCardProps) {
    const { homeTeam, awayTeam, matchupNumber, gameCompleted, priorChoice } = props;
    const [chosenTeam, setChosenTeam] = useState<ValidPicks | null>(null);

    const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
    const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

    const homeTeamInfo = teams[homeTeam];
    const awayTeamInfo = teams[awayTeam];

    const textColor = gameCompleted ? 'has-text-grey-light' : 'has-text-grey-dark';

    // If the user had previously submitted, select that radio button
    useEffect(() => {
        if (priorChoice) {
            setChosenTeam(priorChoice);
        }
    }, [priorChoice]);

    const onChoiceChange = (e: any) => {
        if (e.target.checked) {
            setChosenTeam(e.target.value);
        }
    };

    return (
        <div className='container'>
            <div className='control is-vertical-center'>
                <AwayLogo size={45} opacity={gameCompleted ? 0.4 : 1} />
                <label htmlFor={`matchup-${matchupNumber}-away-team`} className={textColor}>
                    <input
                        type='radio'
                        id={`matchup-${matchupNumber}-away-team`}
                        name={`matchup-${matchupNumber}`}
                        value={awayTeam}
                        checked={chosenTeam === awayTeam}
                        onChange={onChoiceChange}
                        disabled={gameCompleted}
                    />
                    {` ${awayTeamInfo.displayName} (${awayTeamInfo.wins}-${awayTeamInfo.losses}-${awayTeamInfo.ties})`}
                </label>
            </div>
            <div className='control is-vertical-center'>
                <HomeLogo size={45} opacity={gameCompleted ? 0.4 : 1} />
                <label htmlFor={`matchup-${matchupNumber}-home-team`} className={textColor}>
                    <input
                        type='radio'
                        id={`matchup-${matchupNumber}-home-team`}
                        name={`matchup-${matchupNumber}`}
                        value={homeTeam}
                        checked={chosenTeam === homeTeam}
                        onChange={onChoiceChange}
                        disabled={gameCompleted}
                    />
                    {` ${homeTeamInfo.displayName} (${homeTeamInfo.wins}-${homeTeamInfo.losses}-${homeTeamInfo.ties})`}
                </label>
            </div>
        </div>
    );
}

export default MatchupCard;