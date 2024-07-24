import { ChangeEvent, useEffect, useState } from 'react';
import * as TeamLogos from '../../assets/logos';
import teamData from '../../../data/2024/football/teams.json';

import { MatchupInfo } from '../../constants';

type HighFiveCardProps = {
  matchupInfo: MatchupInfo;
  gameStarted: boolean;
  handleSelection: (type: string, teamA: string, teamB?: string) => void;
  picksArray: string[];
  maxPicks: number;
};

type TeamLogoKey = keyof typeof TeamLogos;

function HighFiveCard(props: HighFiveCardProps) {
  const { matchupInfo, gameStarted, handleSelection, picksArray, maxPicks } = props;
  const { homeTeam, awayTeam, gameInfo, matchupId } = matchupInfo;

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const HomeLogo = TeamLogos[homeTeam as TeamLogoKey];
  const AwayLogo = TeamLogos[awayTeam as TeamLogoKey];

  const homeTeamInfo = teamData.find(team => team.teamCode === homeTeam)!;
  const awayTeamInfo = teamData.find(team => team.teamCode === awayTeam)!;

  const { wins: homeWins, losses: homeLosses, ties: homeTies, teamName: homeName } = homeTeamInfo;
  const { wins: awayWins, losses: awayLosses, ties: awayTies, teamName: awayName } = awayTeamInfo;

  useEffect(() => {
    const { homeTeam, awayTeam } = matchupInfo;
    if (picksArray.includes(homeTeam) && selectedTeam !== homeTeam) {
      setSelectedTeam(homeTeam);
    } else if (picksArray.includes(awayTeam) && selectedTeam !== awayTeam) {
      setSelectedTeam(awayTeam);
    }
  }, [picksArray]);

  const onChoiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const team = event.target.value;
    if (
      picksArray.length === maxPicks &&
      !picksArray.includes(team) &&
      !(team !== selectedTeam && selectedTeam && picksArray.includes(selectedTeam))
    ) {
      return;
    }

    if (team === selectedTeam) {
      // If deselecting a selected team
      handleSelection('remove', selectedTeam);
      setSelectedTeam(null);
      return;
    } else if (selectedTeam !== null && team !== selectedTeam) {
      // If selecting the opposite team
      handleSelection('swap', selectedTeam, team);
    } else {
      // Picking a team with no prior choice
      handleSelection('add', team);
    }
    setSelectedTeam(team);
  };

  const shouldDisable = gameStarted || matchupInfo.winner !== '';
  const textColor = shouldDisable ? 'has-text-grey-light' : 'has-text-grey-dark';

  return (
    <div className="box">
      <div className="py-0">
        <p className="is-size-7 has-text-grey-light">{gameInfo}</p>
      </div>
      <div className="control is-vertical-center">
        <AwayLogo size={45} opacity={shouldDisable ? 0.4 : 1} />
        <label className={`checkbox ${textColor}`} htmlFor={`high-five-matchup-${matchupId}-away-team`}>
          <input
            type="checkbox"
            id={`high-five-matchup-${matchupId}-away-team`}
            name="high-five"
            value={awayTeam}
            checked={selectedTeam === awayTeam}
            onChange={onChoiceChange}
            disabled={shouldDisable}
          />
          {` ${awayName} (${awayWins}-${awayLosses}${awayTies > 0 ? `-${awayTies}` : ''})`}
        </label>
      </div>
      <div className="control is-vertical-center">
        <HomeLogo size={45} opacity={shouldDisable ? 0.4 : 1} />
        <label className={`checkbox ${textColor}`} htmlFor={`high-five-matchup-${matchupId}-home-team`}>
          <input
            type="checkbox"
            id={`high-five-matchup-${matchupId}-home-team`}
            name="high-five"
            value={homeTeam}
            checked={selectedTeam === homeTeam}
            onChange={onChoiceChange}
            disabled={shouldDisable}
          />
          {` ${homeName} (${homeWins}-${homeLosses}${homeTies > 0 ? `-${homeTies}` : ''})`}
        </label>
      </div>
    </div>
  );
}

export default HighFiveCard;
