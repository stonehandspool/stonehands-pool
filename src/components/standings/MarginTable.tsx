import playerData from '../../../data/2025/football/players.json';
import seasonData from '../../../data/2025/football/season.json';

import { CURRENT_WEEK_STATUS, CURRENT_WEEK_CUTOFF_TIME, CURRENT_WEEK, MatchupInfo } from '../../constants';

interface MarginPick {
  team: string | null;
  margin: number | null;
}

interface PlayerInfo {
  name: string;
  marginPicks: MarginPick[];
  marginTotal: number;
  numWins: number;
}

const headers: string[] = [
  'Rank',
  'Player',
  'Total',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  'Wins',
];
const weeksArr = [...Array(18)];

const weeklyResults: MatchupInfo[] = seasonData.find(weekInfo => weekInfo.weekId === `week_${CURRENT_WEEK}`)!.matchups;
const getGameCompleted = (teamName: string | null) => {
  if (teamName === null) {
    return false;
  }
  let gameCompleted = false;
  weeklyResults.map(matchupInfo => {
    if (matchupInfo.homeTeam === teamName || matchupInfo.awayTeam === teamName) {
      gameCompleted = matchupInfo.winner !== '';
    }
  });
  return gameCompleted;
};

function MarginTable() {
  // Calculate the standings
  const playerPicks: PlayerInfo[] = [];
  for (let i = 0; i < playerData.length; i++) {
    const playerInfo = playerData[i];
    let numWins = 0;
    for (let i = 0; i < playerInfo.marginPicks.length; i++) {
      const { margin } = playerInfo.marginPicks[i];
      if (margin !== null && margin > 0) {
        numWins++;
      }
    }
    const rowInfo: PlayerInfo = {
      name: `${playerInfo.firstName.trim()} ${playerInfo.lastName.trim()}`,
      marginPicks: playerInfo.marginPicks,
      marginTotal: playerInfo.marginTotal,
      numWins,
    };
    playerPicks.push(rowInfo);
  }

  // Sort everyone by their margin total
  playerPicks.sort((row1, row2) => {
    const firstName1 = row1.name.split(' ')[0];
    const lastName1 = row1.name.split(' ').pop()!;
    const firstName2 = row2.name.split(' ')[0];
    const lastName2 = row2.name.split(' ').pop()!;
    return (
      row2.marginTotal - row1.marginTotal || lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2)
    );
  });

  // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
  // can't see what people have chosen prior to the cutoff happening
  const currentTime = new Date();
  const showAllPicks = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;

  return (
    <section className="section">
      <div className="container pb-6">
        <table className="table is-bordered mx-auto">
          <thead>
            <tr>
              <th colSpan={3} className="has-text-centered">
                Color Codes
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="has-background-success">Team Won</td>
              <td>Team Tied</td>
              <td className="has-background-danger">Team Lost</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <table className="table is-bordered is-striped is-hoverable mx-auto has-text-centered">
          <thead>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <th className="has-text-centered" colSpan={18}>
                Week
              </th>
              <td></td>
            </tr>
            <tr>
              {headers.map(heading => {
                return (
                  <th key={heading} className="has-text-centered">
                    {heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {playerPicks.map((row, index) => {
              return (
                <tr key={`${index}`}>
                  <td key={`${row.name}-rank-${index}`} className="is-vcentered">
                    {index + 1}
                  </td>
                  <td key={`${row.name}-row-${index}`} className="is-vcentered">
                    {row.name}
                  </td>
                  <td key={`${row.name}-total-${index}`} className="is-vcentered">
                    <strong>
                      {row.marginTotal > 0 ? '+' : ''}
                      {row.marginTotal}
                    </strong>
                  </td>
                  {weeksArr.map((week, ind) => {
                    const gameCompleted = getGameCompleted(row.marginPicks[ind]?.team);
                    const isCurrentWeek = ind === CURRENT_WEEK - 1;
                    if (isCurrentWeek && !showAllPicks && !gameCompleted) {
                      return <td key={`${row.name}-hidden`}></td>;
                    } else if (isCurrentWeek && !showAllPicks && gameCompleted) {
                      // If we don't want to show everything but a user has picked a game that has completed already
                      if (row.marginPicks[ind].margin !== null && row.marginPicks[ind].margin! > 0) {
                        //If the margin of victory was over 0, have a green background
                        return (
                          <td key={`${row.name}-${ind}`} className="has-background-success">
                            {row.marginPicks[ind].team}
                            <br />+{row.marginPicks[ind].margin}
                          </td>
                        );
                      } else if (row.marginPicks[ind].margin !== null && row.marginPicks[ind].margin! < 0) {
                        // If the margin of victory was under 0, have a red background
                        return (
                          <td key={`${row.name}-${ind}`} className="has-background-danger">
                            {row.marginPicks[ind].team}
                            <br />
                            {row.marginPicks[ind].margin}
                          </td>
                        );
                      } else {
                        // If the margin of victory was 0 or null (unfinished game) then no background
                        return (
                          <td key={`${row.name}-${ind}`}>
                            {row.marginPicks[ind].team}
                            <br />
                            {row.marginPicks[ind].margin}
                          </td>
                        );
                      }
                    } else if (row.marginPicks[ind]) {
                      if (row.marginPicks[ind].margin !== null && row.marginPicks[ind].margin! > 0) {
                        //If the margin of victory was over 0, have a green background
                        return (
                          <td key={`${row.name}-${ind}`} className="has-background-success">
                            {row.marginPicks[ind].team}
                            <br />+{row.marginPicks[ind].margin}
                          </td>
                        );
                      } else if (row.marginPicks[ind].margin !== null && row.marginPicks[ind].margin! < 0) {
                        // If the margin of victory was under 0, have a red background
                        return (
                          <td key={`${row.name}-${ind}`} className="has-background-danger">
                            {row.marginPicks[ind].team}
                            <br />
                            {row.marginPicks[ind].margin}
                          </td>
                        );
                      } else {
                        // If the margin of victory was 0 or null (unfinished game) then no background
                        return (
                          <td key={`${row.name}-${ind}`}>
                            {row.marginPicks[ind].team}
                            <br />
                            {row.marginPicks[ind].margin}
                          </td>
                        );
                      }
                    } else {
                      return <td key={`${row.name}-${ind}`}></td>;
                    }
                  })}
                  <td key={`${row.name}-wins-${index}`} className="is-vcentered">
                    {row.numWins}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MarginTable;
