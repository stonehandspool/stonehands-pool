import playerData from '../../../data/allTime/football/allTimeStats.json';

interface TableColumns {
  position: number;
  name: string;
  wins: number;
  losses: number;
  ties: number;
  percent: string;
  points: number;
  numSeasons: number;
}

function SeasonStandingsTable() {
  // Calculate the standings
  const calculatedPicks: TableColumns[] = [];

  // The normal flow during the season
  for (let i = 0; i < playerData.length; i++) {
    const playerInfo = playerData[i];
    const rowInfo: TableColumns = {
      position: 0,
      name: `${playerInfo.firstName} ${playerInfo.lastName}`,
      points: playerInfo.totalPoints,
      wins: playerInfo.totalWins,
      losses: playerInfo.totalLosses,
      ties: playerInfo.totalTies,
      percent: `${(playerInfo.percent * 100).toFixed(1)}%`,
      numSeasons: playerInfo.totalSeasons,
    };
    calculatedPicks.push(rowInfo);
  }

  calculatedPicks.sort((row1, row2) => row2.points - row1.points || row2.wins - row1.wins);

  for (let i = 0; i < playerData.length; i++) {
    calculatedPicks[i].position = i + 1;
  }

  // For looping through the submissions
  const tableKeys: string[] = Object.keys(calculatedPicks[0]);

  return (
    <section className="section">
      <div className="container">
        <table className="table is-striped is-hoverable mx-auto">
          <thead>
            <tr>
              <th className="is-vcentered">
                <abbr title="Position">Pos</abbr>
              </th>
              <th className="is-vcentered">Name</th>
              <th className="is-vcentered">Points</th>
              <th className="is-vcentered">Wins</th>
              <th className="is-vcentered">Losses</th>
              <th className="is-vcentered">Ties</th>
              <th className="is-vcentered">Percent</th>
              <th className="is-vcentered">Seasons</th>
            </tr>
          </thead>
          <tbody>
            {calculatedPicks.map((row, index) => {
              return (
                <tr key={`${index}`}>
                  {tableKeys.map((key, ind) => {
                    if (key !== 'username') {
                      if (key === 'position') {
                        return (
                          <td
                            key={`${row.position}-${ind}`}

                            style={{ cursor: 'pointer' }}
                          >
                            {row[key as keyof TableColumns]}
                          </td>
                        );
                      } else {
                        return (
                          <td key={`${row.position}-${ind}`} className="is-nowrap">
                            {row[key as keyof TableColumns]}
                          </td>
                        );
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
