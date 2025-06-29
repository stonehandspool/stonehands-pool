import { useEffect, useState } from 'react';
import './WeeklyPicksTable.css';

import playerData from '../../../data/2025/football/players.json';
import seasonData from '../../../data/2025/football/season.json';

import * as TeamLogos from '../../assets/logos';

import {
  CURRENT_WEEK,
  CURRENT_WEEK_CUTOFF_TIME,
  CURRENT_WEEK_STATUS,
  MatchupInfo,
  SEASON_READY,
  DatabaseData,
} from '../../constants';
import { useWeeklyPick } from '../../utils/useWeeklyPicks';

type TeamLogoKey = keyof typeof TeamLogos;

import SortDefault from '../../assets/sort.svg';
import SortUp from '../../assets/sort_up.svg';
import SortDown from '../../assets/sort_down.svg';

enum SortedBy {
  Default,
  WeeklyUp,
  WeeklyDown,
  SeasonUp,
  SeasonDown,
}

function WeeklyPicksImagesTable() {
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
      // Sort everyone alphabetically by name by default
      weeklyPicks[0].picks.sort((row1, row2) => {
        const { firstName: firstName1, lastName: lastName1 } = row1.submission_data;
        const { firstName: firstName2, lastName: lastName2 } = row2.submission_data;
        return lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2);
      });
      setCurrentWeekPicks(weeklyPicks[0].picks);
    }
  }, [weeklyPicks]);

  const currentWeekMatches: MatchupInfo[] = seasonData.find(
    weekInfo => weekInfo.weekId === `week_${CURRENT_WEEK}`
  )!.matchups;
  const numGamesThisWeek = currentWeekMatches.length;

  const atArr = Array(numGamesThisWeek).fill('@');
  const emptyArr = Array(numGamesThisWeek + 4).fill('');

  // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
  // can't see what people have chosen prior to the cutoff happening
  const currentTime = new Date();
  const showAllPicks = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;

  // Logic for sorting the table
  const [sortingMethod, setSortingMethod] = useState<SortedBy>(SortedBy.Default);
  const [tableMessage, setTableMessage] = useState<string>(
    'Pool members sorted by their last name in alphabetical order'
  );

  const sortWeekly = (mostFirst: boolean) => {
    currentWeekPicks.sort((row1, row2) => {
      const playerInfo1 = playerData.find(player => player.id === row1.user_id)!;
      const playerInfo2 = playerData.find(player => player.id === row2.user_id)!;
      return mostFirst
        ? playerInfo2.currentWeekPoints - playerInfo1.currentWeekPoints
        : playerInfo1.currentWeekPoints - playerInfo2.currentWeekPoints;
    });
  };

  const sortSeason = (mostFirst: boolean) => {
    currentWeekPicks.sort((row1, row2) => {
      const playerInfo1 = playerData.find(player => player.id === row1.user_id)!;
      const playerInfo2 = playerData.find(player => player.id === row2.user_id)!;
      return mostFirst ? playerInfo2.points - playerInfo1.points : playerInfo1.points - playerInfo2.points;
    });
  };

  const sortDefault = () => {
    currentWeekPicks.sort((row1, row2) => {
      const { firstName: firstName1, lastName: lastName1 } = row1.submission_data;
      const { firstName: firstName2, lastName: lastName2 } = row2.submission_data;
      return lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2);
    });
  };

  const onWeekSort = () => {
    if (sortingMethod !== SortedBy.WeeklyDown && sortingMethod !== SortedBy.WeeklyUp) {
      setSortingMethod(SortedBy.WeeklyDown);
      setTableMessage('Pool members sorted by their weekly points from most to least');
      sortWeekly(true);
    } else if (sortingMethod === SortedBy.WeeklyDown) {
      setSortingMethod(SortedBy.WeeklyUp);
      setTableMessage('Pool members sorted by their weekly points from least to most');
      sortWeekly(false);
    } else if (sortingMethod === SortedBy.WeeklyUp) {
      setSortingMethod(SortedBy.Default);
      setTableMessage('Pool members sorted by their last name in alphabetical order');
      sortDefault();
    }
  };

  const onSeasonSort = () => {
    if (sortingMethod !== SortedBy.SeasonDown && sortingMethod !== SortedBy.SeasonUp) {
      setSortingMethod(SortedBy.SeasonDown);
      setTableMessage('Pool members sorted by their season points from most to least');
      sortSeason(true);
    } else if (sortingMethod === SortedBy.SeasonDown) {
      setSortingMethod(SortedBy.SeasonUp);
      setTableMessage('Pool members sorted by their season points from least to most');
      sortSeason(false);
    } else if (sortingMethod === SortedBy.SeasonUp) {
      setSortingMethod(SortedBy.Default);
      setTableMessage('Pool members sorted by their last name in alphabetical order');
      sortDefault();
    }
  };

  return (
    <table className="table is-striped is-hoverable mx-auto has-text-centered">
      <tbody>
        <tr className="weekly-picks-table-top">
          <td colSpan={numGamesThisWeek + 4} align={'center'}>
            {tableMessage} (<b>Bold = Win</b>)
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
            Weekly
            <br />
            Tiebreaker
          </td>
          <td>
            <div className="is-flex is-align-items-center is-clickable" onClick={onWeekSort}>
              <span>
                Weekly <br />
                Points
              </span>
              <span className="icon">
                {sortingMethod !== SortedBy.WeeklyDown && sortingMethod !== SortedBy.WeeklyUp && (
                  <img src={SortDefault} />
                )}
                {sortingMethod === SortedBy.WeeklyDown && <img src={SortDown} />}
                {sortingMethod === SortedBy.WeeklyUp && <img src={SortUp} />}
              </span>
            </div>
          </td>
          <td>
            <div className="is-flex is-align-items-center is-clickable" onClick={onSeasonSort}>
              <span>
                Season <br />
                Points
              </span>
              <span className="icon">
                {sortingMethod !== SortedBy.SeasonDown && sortingMethod !== SortedBy.SeasonUp && (
                  <img src={SortDefault} />
                )}
                {sortingMethod === SortedBy.SeasonDown && <img src={SortDown} />}
                {sortingMethod === SortedBy.SeasonUp && <img src={SortUp} />}
              </span>
            </div>
          </td>
        </tr>
        <tr>
          {emptyArr.map((_, index) => {
            return <td key={`empty-${index}`}></td>;
          })}
        </tr>
        {currentWeekPicks.map((pickInfo, index) => {
          const { submission_data: picks } = pickInfo;
          const playerInfo = playerData.find(player => player.id === pickInfo.user_id)!;
          return (
            <tr key={`picks-${index}`}>
              <td className="names is-vcentered">{`${picks.firstName} ${picks.lastName}`}</td>
              {currentWeekMatches.map((matchupInfo, index) => {
                const { winner, evaluated } = matchupInfo;
                const { team, confidence } = picks.confidencePicks.find(
                  confPick => confPick.matchupId === `matchup_${index + 1}`
                )!;
                const correct = team === winner;
                let Logo;
                if (team === 'Tie' || team === undefined) {
                  Logo = TeamLogos.NFL;
                } else {
                  Logo = TeamLogos[team as TeamLogoKey];
                }
                if ((!showAllPicks && evaluated) || showAllPicks) {
                  return (
                    <td
                      key={`${pickInfo.user_id}-${index}`}
                      className={correct ? 'weekly-picks-table-correct-choice' : 'weekly-picks-table-incorrect-choice'}
                    >
                      {<Logo size={35} />}
                      <br />
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

export default WeeklyPicksImagesTable;
