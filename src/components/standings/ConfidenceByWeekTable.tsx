import playerData from '../../../data/2024/football/players.json';
import seasonData from '../../../data/2024/football/season.json';

import { CURRENT_WEEK, CURRENT_WEEK_STATUS, MatchupInfo } from '../../constants';

interface TableColumns {
  position: number;
  name: string;
  wins: number;
  losses: number;
  ties: number;
  points: number;
  tiebreaker: number;
  result: string;
}

interface ConfidenceByWeekTableProps {
  week: number;
}

const headers: string[] = ['Position', 'Name', 'Points', 'Wins', 'Losses', 'Ties', 'Tiebreaker', 'Result'];

function ConfidenceByWeekTable(props: ConfidenceByWeekTableProps) {
  const { week } = props;

  // If we somehow get here, just don't return anything because that would break this
  if (week > CURRENT_WEEK) {
    return <></>;
  }

  const weekGames: MatchupInfo[] = seasonData.find(weekInfo => weekInfo.weekId === `week_${week}`)!.matchups;
  const numGames = weekGames.length;
  const lastMatchup = weekGames.find(game => game.matchupId === `matchup_${numGames}`)!;
  const mondayTotal = lastMatchup.awayScore + lastMatchup.homeScore;

  // Calculate the standings
  const calculatedPicks: TableColumns[] = [];
  for (let i = 0; i < playerData.length; i++) {
    const playerInfo = playerData[i];
    const rowInfo: TableColumns = {
      position: -1,
      name: `${playerInfo.firstName.trim()} ${playerInfo.lastName.trim()}`,
      points: playerInfo.pointsByWeek[week - 1],
      wins: playerInfo.winsByWeek[week - 1],
      losses: playerInfo.lossesByWeek[week - 1],
      ties: playerInfo.tiesByWeek[week - 1],
      tiebreaker: playerInfo.tiebreakerByWeek[week - 1],
      result: '',
    };
    calculatedPicks.push(rowInfo);
  }

  // Sort everyone by points now
  calculatedPicks.sort((row1, row2) => {
    const row1Tb = Math.abs(mondayTotal - row1.tiebreaker);
    const row2Tb = Math.abs(mondayTotal - row2.tiebreaker);
    return row2.points - row1.points || row2.wins - row1.wins || row1Tb - row2Tb;
  });

  // Now update the position and result for the table
  for (let i = 0; i < calculatedPicks.length; i++) {
    calculatedPicks[i].position = i + 1;
    if (i === 0 && week < CURRENT_WEEK) {
      calculatedPicks[i].result = 'Winner';
    } else if (i === 0 && week === CURRENT_WEEK && CURRENT_WEEK_STATUS === 'COMPLETE') {
      calculatedPicks[i].result = 'Winner';
    } else {
      calculatedPicks[i].result = '**';
    }
  }

  // For looping through the submissions
  const tableKeys: string[] = Object.keys(calculatedPicks[0]);

  return (
    <section className="section">
      <div className="container">
        <table className="table is-striped is-hoverable mx-auto">
          <thead>
            <tr>
              {headers.map(heading => {
                return <th key={heading}>{heading}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {calculatedPicks.map((row, index) => {
              return (
                <tr key={`${index}`}>
                  {tableKeys.map((key, ind) => {
                    return <td key={`${row.position}-${ind}`}>{row[key as keyof TableColumns]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ConfidenceByWeekTable;
