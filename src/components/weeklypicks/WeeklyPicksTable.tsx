import { useEffect, useState } from 'react';

import players from '../../../data/2024/football/players.json';
import seasonInfo from '../../../data/2024/football/season.json';

import {
  CURRENT_WEEK,
  CURRENT_WEEK_CUTOFF_TIME,
  CURRENT_WEEK_STATUS,
  MatchupInfo,
  SEASON_READY,
  DatabaseData,
} from '../../constants';

import './WeeklyPicksTable.css';
import { useWeeklyPick } from '../../utils/useWeeklyPicks';

function WeeklyPicksTable() {
  if (!SEASON_READY) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">Sorry, there are no picks to show yet</h3>
        </div>
      </section>
    );
  }

  const weeklyPicks = useWeeklyPick(CURRENT_WEEK);
  const [currentWeekPicks, setCurrentWeekPicks] = useState<DatabaseData[]>([]);

  useEffect(() => {
    if (weeklyPicks && weeklyPicks.length > 0) {
      setCurrentWeekPicks(weeklyPicks[0].picks);
    }
  }, [weeklyPicks]);

  const currentWeekMatches: MatchupInfo[] = seasonInfo.find(
    weekInfo => weekInfo.weekId === `week_${CURRENT_WEEK}`
  )!.matchups;
  const numGamesThisWeek = currentWeekMatches.length;

  const atArr = Array(numGamesThisWeek).fill('@');
  const emptyArr = Array(numGamesThisWeek + 4).fill('');

  // Sort everyone alphabetically by name
  currentWeekPicks.sort((row1, row2) => {
    const { firstName: firstName1, lastName: lastName1 } = row1.submission_data;
    const { firstName: firstName2, lastName: lastName2 } = row2.submission_data;
    return lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2);
  });

  // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
  // can't see what people have chosen prior to the cutoff happening
  const currentTime = new Date();
  const showAllPicks = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;

  return (
    <table className="table is-striped is-hoverable mx-auto has-text-centered">
      <tbody>
        <tr className="weekly-picks-table-top">
          <td colSpan={numGamesThisWeek + 4} align={'center'}>
            Pool members sorted by their last name in alphabetical order (<b>Bold = Win</b>)
          </td>
        </tr>
        <tr>
          <td className="weekly-picks-table-away">
            <b>Away</b>
            <br />
            Score:
          </td>
          {currentWeekMatches.map((matchupInfo, index) => {
            const { awayTeam, awayScore } = matchupInfo;
            return (
              <td key={`away-${index}`}>
                {awayTeam}
                <br />
                {awayScore}
              </td>
            );
          })}
        </tr>
        <tr>
          <td></td>
          {atArr.map((at, index) => {
            return <td key={`at-${index}`}>{at}</td>;
          })}
        </tr>
        <tr>
          <td className="weekly-picks-table-home">
            <b>Home</b>
            <br />
            Score:
          </td>
          {currentWeekMatches.map((matchupInfo, index) => {
            const { homeTeam, homeScore } = matchupInfo;
            return (
              <td key={`home-${index}`}>
                {homeTeam}
                <br />
                {homeScore}
              </td>
            );
          })}
          <td>
            Weekly <br />
            Tiebreaker
          </td>
          <td>
            Weekly <br />
            Points
          </td>
          <td>
            Season <br />
            Points
          </td>
        </tr>
        <tr>
          {emptyArr.map((_, index) => {
            return <td key={`empty-${index}`}></td>;
          })}
        </tr>
        {currentWeekPicks.map((pickInfo, index) => {
          const { submission_data: picks } = pickInfo;
          const playerInfo = players.find(player => player.id === pickInfo.user_id)!;
          return (
            <tr key={`picks-${index}`}>
              <td className="names is-vcentered">{`${picks.firstName} ${picks.lastName}`}</td>
              {currentWeekMatches.map((matchupInfo, index) => {
                const { winner, evaluated } = matchupInfo;
                const { team, confidence } = picks.confidencePicks.find(
                  confPick => confPick.matchupId === `matchup_${index + 1}`
                )!;
                const correct = team === winner;
                if ((!showAllPicks && evaluated) || showAllPicks) {
                  // If the game has been played (i.e. Thu game) we can show it
                  return (
                    <td
                      key={`${pickInfo.user_id}-${index}`}
                      className={correct ? 'weekly-picks-table-correct-choice' : 'weekly-picks-table-incorrect-choice'}
                    >
                      {team === undefined ? 'N/A' : team}
                      <br />
                      {confidence}
                    </td>
                  );
                } else {
                  return <td key={`${pickInfo.user_id}-${index}`}></td>;
                }
              })}
              <td className="is-vcentered">{playerInfo.currentWeekTiebreaker}</td>
              <td className="is-vcentered">{playerInfo.currentWeekPoints}</td>
              <td className="is-vcentered">{playerInfo.points}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default WeeklyPicksTable;
