import playerData from '../../../data/2024/football/players.json';
import { useNavigate } from 'react-router-dom';

interface TableColumns {
  position: number;
  name: string;
  wins: number;
  losses: number;
  ties: number;
  percent: string;
  points: number;
  tiebreaker: number;
  lastWeek: number;
  change: string;
  username: string;
}

function SeasonStandingsTable() {
  const navigate = useNavigate();

  const goToUserStats = (username: string) => {
    navigate(`/user/${username}`);
  };

  // Calculate the standings
  const calculatedPicks: TableColumns[] = [];
  for (let i = 0; i < playerData.length; i++) {
    const playerInfo = playerData[i];
    const rowInfo: TableColumns = {
      position: playerInfo.currentWeekRank,
      name: `${playerInfo.firstName} ${playerInfo.lastName}`,
      points: playerInfo.points,
      wins: playerInfo.wins,
      losses: playerInfo.losses,
      ties: playerInfo.ties,
      percent: `${(playerInfo.percent * 100).toFixed(1)}%`,
      tiebreaker: +playerInfo.tbAvg.toFixed(1),
      lastWeek: playerInfo.lastWeekRank,
      change: playerInfo.change,
      username: playerInfo.username,
    };
    calculatedPicks.push(rowInfo);
  }

  // Sort everyone by points now
  calculatedPicks.sort((row1, row2) => row2.points - row1.points || row2.wins - row1.wins);

  // For looping through the submissions
  const tableKeys: string[] = Object.keys(calculatedPicks[0]);

  return (
    <section className="section">
      <div className="container">
        <table className="table is-striped is-hoverable mx-auto">
          <thead>
            <tr>
              <th className="is-vcentered">Position</th>
              <th className="is-vcentered">Name</th>
              <th className="is-vcentered">Points</th>
              <th className="is-vcentered">Wins</th>
              <th className="is-vcentered">Losses</th>
              <th className="is-vcentered">Ties</th>
              <th className="is-vcentered">Percent</th>
              <th className="is-vcentered">
                Tiebreaker <br /> Average
              </th>
              <th className="is-vcentered">
                Last <br /> Week
              </th>
              <th className="is-vcentered">Change</th>
            </tr>
          </thead>
          <tbody>
            {calculatedPicks.map((row, index) => {
              return (
                <tr key={`${index}`}>
                  {tableKeys.map((key, ind) => {
                    if (key !== 'username') {
                      if (key === 'name') {
                        return (
                          <td
                            key={`${row.position}-${ind}`}
                            onClick={() => {
                              goToUserStats(row.username);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {row[key as keyof TableColumns]}
                          </td>
                        );
                      } else {
                        return <td key={`${row.position}-${ind}`}>{row[key as keyof TableColumns]}</td>;
                      }
                    } else {
                      return;
                    }
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

export default SeasonStandingsTable;
