import { ChangeEvent } from 'react';
import * as TeamLogos from '../../assets/logos';
import { CURRENT_WEEK, MarginPick, MatchupInfo } from '../../constants';

import teamData from '../../../data/2024/football/teams.json';

type MarginAndSurvivorCardProps = {
  matchupInfo: MatchupInfo;
  name: 'survivor' | 'margin';
  selectedTeam: string | null;
  gameStarted: boolean;
  handleSelection: (teamName: string) => void;
  priorSurvivorPicks?: string[];
  priorMarginPicks?: MarginPick[];
  priorPickGameCompleted: boolean;
};

type TeamLogoKey = keyof typeof TeamLogos;

function MarginAndSurvivorCard(props: MarginAndSurvivorCardProps) {
  const {
    matchupInfo,
    name,
    selectedTeam,
    gameStarted,
    handleSelection,
    priorSurvivorPicks,
    priorMarginPicks,
    priorPickGameCompleted,
  } = props;
  const { homeTeam, awayTeam, gameInfo, matchupId } = matchupInfo;

  const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
  const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

  const homeTeamInfo = teamData.find(team => team.teamCode === homeTeam)!;
  const awayTeamInfo = teamData.find(team => team.teamCode === awayTeam)!;

  const { wins: homeWins, losses: homeLosses, ties: homeTies, teamName: homeName } = homeTeamInfo;
  const { wins: awayWins, losses: awayLosses, ties: awayTies, teamName: awayName } = awayTeamInfo;

  const onChoiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const team = event.target.value;
      handleSelection(team);
    }
  };

  const teamHasBeenChosen = (team: string) => {
    if (priorSurvivorPicks && priorSurvivorPicks.length > 0) {
      const chosen = priorSurvivorPicks.find(pick => pick === team);
      const chosenIndex = priorSurvivorPicks.findIndex(pick => pick === team);
      if (chosen) {
        // If this was the most recent pick (i.e. a Sunday game after processWeek has ran on Fri) then don't disable it yet
        if (
          chosenIndex === priorSurvivorPicks.length - 1 &&
          priorSurvivorPicks.length === CURRENT_WEEK &&
          !priorPickGameCompleted
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else if (priorMarginPicks && priorMarginPicks.length > 0) {
      const chosen = priorMarginPicks.find(pick => pick.team === team);
      const chosenIndex = priorMarginPicks.findIndex(pick => pick.team === team);
      if (chosen) {
        if (
          chosenIndex === priorMarginPicks.length - 1 &&
          priorMarginPicks.length === CURRENT_WEEK &&
          !priorPickGameCompleted
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const shouldDisable = gameStarted || matchupInfo.winner !== '';
  const awayDisabled = shouldDisable || priorPickGameCompleted || teamHasBeenChosen(matchupInfo.awayTeam);
  const homeDisabled = shouldDisable || priorPickGameCompleted || teamHasBeenChosen(matchupInfo.homeTeam);

  return (
    <div className="box p-4">
      <div className="is-vertical-center">
        <span className="is-size-7 has-text-grey-light">{gameInfo}</span>
      </div>
      <div className="columns">
        <div className="column">
          <div className="is-vertical-center">
            <AwayLogo size={45} opacity={awayDisabled ? 0.4 : 1} />
            <label
              htmlFor={`${name}-${matchupId}-away-team`}
              className={awayDisabled ? 'has-text-grey-light' : 'has-text-grey-dark'}
            >
              <input
                type="radio"
                id={`${name}-${matchupId}-away-team`}
                name={name}
                value={awayTeam}
                checked={selectedTeam === awayTeam}
                onChange={onChoiceChange}
                disabled={awayDisabled}
              />
              {` ${awayName} (${awayWins}-${awayLosses}${awayTies > 0 ? `-${awayTies}` : ''})`}
            </label>
          </div>
          <div className="is-vertical-center">
            <HomeLogo size={45} opacity={homeDisabled ? 0.4 : 1} />
            <label
              htmlFor={`${name}-${matchupId}-home-team`}
              className={homeDisabled ? 'has-text-grey-light' : 'has-text-grey-dark'}
            >
              <input
                type="radio"
                id={`${name}-${matchupId}-home-team`}
                name={name}
                value={homeTeam}
                checked={selectedTeam === homeTeam}
                onChange={onChoiceChange}
                disabled={homeDisabled}
              />
              {` ${homeName} (${homeWins}-${homeLosses}${homeTies > 0 ? `-${homeTies}` : ''})`}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarginAndSurvivorCard;
