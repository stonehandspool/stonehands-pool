import { useEffect, useState } from 'react';
import * as TeamLogos from '../../assets/logos';
import teams from '../../../data/2024/football/teams.json';

export interface MatchupCardProps {
  homeTeam: string;
  awayTeam: string;
  matchupNumber: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  priorChoice: string | null;
  onUpdatePick: (value: string, index: number) => void;
}

type TeamLogoKey = keyof typeof TeamLogos;

function MatchupCard(props: MatchupCardProps) {
  const { homeTeam, awayTeam, matchupNumber, gameStarted, gameCompleted, priorChoice, onUpdatePick } = props;
  const [chosenTeam, setChosenTeam] = useState<string | null>(null);

  const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
  const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

  const homeTeamInfo = teams.find(team => team.teamCode === homeTeam)!;
  const awayTeamInfo = teams.find(team => team.teamCode === awayTeam)!;

  const shouldDisable = gameStarted || gameCompleted;
  const textColor = shouldDisable ? 'has-text-grey-light' : 'has-text-grey-dark';

  // If the user had previously submitted, select that radio button
  useEffect(() => {
    if (priorChoice) {
      setChosenTeam(priorChoice);
      onUpdatePick(priorChoice, matchupNumber);
    }
  }, [priorChoice]);

  const onChoiceChange = (e: any) => {
    if (e.target.checked) {
      setChosenTeam(e.target.value);
      onUpdatePick(e.target.value, matchupNumber);
    }
  };

  return (
    <div className="container">
      <div className="control is-vertical-center">
        <AwayLogo size={45} opacity={shouldDisable ? 0.4 : 1} />
        <label htmlFor={`matchup-${matchupNumber}-away-team`} className={textColor}>
          <input
            type="radio"
            id={`matchup-${matchupNumber}-away-team`}
            name={`matchup-${matchupNumber}`}
            value={awayTeam}
            checked={chosenTeam === awayTeam}
            onChange={onChoiceChange}
            disabled={shouldDisable}
          />
          {` ${awayTeamInfo.displayName} (${awayTeamInfo.wins}-${awayTeamInfo.losses}-${awayTeamInfo.ties})`}
        </label>
      </div>
      <div className="control is-vertical-center">
        <HomeLogo size={45} opacity={shouldDisable ? 0.4 : 1} />
        <label htmlFor={`matchup-${matchupNumber}-home-team`} className={textColor}>
          <input
            type="radio"
            id={`matchup-${matchupNumber}-home-team`}
            name={`matchup-${matchupNumber}`}
            value={homeTeam}
            checked={chosenTeam === homeTeam}
            onChange={onChoiceChange}
            disabled={shouldDisable}
          />
          {` ${homeTeamInfo.displayName} (${homeTeamInfo.wins}-${homeTeamInfo.losses}-${homeTeamInfo.ties})`}
        </label>
      </div>
    </div>
  );
}

export default MatchupCard;
