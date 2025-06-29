import { ChangeEvent, useState } from 'react';

import * as TeamLogos from '../../assets/logos';
import teamData from '../../../data/2025/football/teams.json';
import ConfidenceDropDown from './ConfidenceDropDown';
import { MatchupInfo } from '../../constants';

type ConfidenceCardProps = {
  matchupInfo: MatchupInfo;
  gameStarted: boolean;
  numGames: number;
  selectedNumbers: (number | null)[];
  priorTeam: string | null;
  priorConfidence: number | null;
  onUpdateConfidenceTeam: (matchupId: string, teamName: string) => void;
  onUpdateConfidenceValue: (matchupId: string, confidence: number) => void;
};

type TeamLogoKey = keyof typeof TeamLogos;

function ConfidenceCard(props: ConfidenceCardProps) {
  const {
    matchupInfo,
    gameStarted,
    numGames,
    selectedNumbers,
    priorTeam,
    priorConfidence,
    onUpdateConfidenceTeam,
    onUpdateConfidenceValue,
  } = props;
  const { homeTeam, awayTeam, matchupId, gameInfo, winner } = matchupInfo;
  const [chosenTeam, setChosenTeam] = useState<string | null>(null);

  const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
  const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

  const homeTeamInfo = teamData.find(team => team.teamCode === homeTeam)!;
  const awayTeamInfo = teamData.find(team => team.teamCode === awayTeam)!;

  const { wins: homeWins, losses: homeLosses, ties: homeTies, teamName: homeName } = homeTeamInfo;
  const { wins: awayWins, losses: awayLosses, ties: awayTies, teamName: awayName } = awayTeamInfo;

  // If the user has previously submitted, select that radio button
  if (priorTeam !== chosenTeam) {
    setChosenTeam(priorTeam);
  }

  const onChoiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChosenTeam(event.target.value);
      onUpdateConfidenceTeam(matchupId, event.target.value);
    }
  };

  const gameCompleted = winner !== '';
  const shouldDisable = gameStarted || gameCompleted;
  const textColor = shouldDisable ? 'has-text-grey-light' : 'has-text-grey-dark';

  return (
    <div className="box">
      <div className="is-vertical-center">
        <span className="is-size-7 has-text-grey-light">{gameInfo}</span>
      </div>
      <div className="columns is-mobile">
        <div className="column">
          <div className="is-vertical-center">
            <AwayLogo size={45} opacity={shouldDisable ? 0.4 : 1} />
            <label htmlFor={`${matchupId}-away-team`} className={textColor}>
              <input
                type="radio"
                id={`${matchupId}-away-team`}
                name={`${matchupId}`}
                value={awayTeam}
                checked={chosenTeam === awayTeam}
                onChange={onChoiceChange}
                disabled={shouldDisable}
              />
              {` ${awayName} (${awayWins}-${awayLosses}${awayTies > 0 ? `-${awayTies}` : ''})`}
            </label>
          </div>
          <div className="is-vertical-center">
            <HomeLogo size={45} opacity={shouldDisable ? 0.4 : 1} />
            <label htmlFor={`${matchupId}-home-team`} className={textColor}>
              <input
                type="radio"
                id={`${matchupId}-home-team`}
                name={`${matchupId}`}
                value={homeTeam}
                checked={chosenTeam === homeTeam}
                onChange={onChoiceChange}
                disabled={shouldDisable}
              />
              {` ${homeName} (${homeWins}-${homeLosses}${homeTies > 0 ? `-${homeTies}` : ''})`}
            </label>
          </div>
        </div>
        <div className="column is-narrow is-vertical-center">
          <ConfidenceDropDown
            numOptions={numGames}
            matchupChoice={chosenTeam}
            matchupId={matchupId}
            gameStarted={gameStarted}
            gameCompleted={gameCompleted}
            priorConfidence={priorConfidence || -1}
            selectedNumbers={selectedNumbers}
            onUpdateConfidence={onUpdateConfidenceValue}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfidenceCard;
