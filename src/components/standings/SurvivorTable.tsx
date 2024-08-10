import playerData from '../../../data/2024/football/players.json';
import seasonData from '../../../data/2024/football/season.json';
import { CURRENT_WEEK, CURRENT_WEEK_STATUS, CURRENT_WEEK_CUTOFF_TIME, MatchupInfo } from '../../constants';

interface PlayerInfo {
  name: string;
  survivorPicks: string[];
  aliveInSurvivor: boolean;
}

const headers: string[] = [
  'Player',
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
];
const weeksArr = [...Array(18)];

const weeklyResults: MatchupInfo[] = seasonData.find(weekInfo => weekInfo.weekId === `week_${CURRENT_WEEK}`)!.matchups;
const getGameCompleted = (teamName: string) => {
  let gameCompleted = false;
  weeklyResults.map(matchupInfo => {
    if (matchupInfo.homeTeam === teamName || matchupInfo.awayTeam === teamName) {
      gameCompleted = matchupInfo.winner !== '';
    }
  });
  return gameCompleted;
};

function SurvivorTable() {
  // Calculate the standings
  const playerPicks: PlayerInfo[] = [];
  for (let i = 0; i < playerData.length; i++) {
    const playerInfo = playerData[i];
    const rowInfo: PlayerInfo = {
      name: `${playerInfo.firstName.trim()} ${playerInfo.lastName.trim()}`,
      survivorPicks: playerInfo.survivorPicks,
      aliveInSurvivor: playerInfo.aliveInSurvivor,
    };
    playerPicks.push(rowInfo);
  }

  // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
  // can't see what people have chosen prior to the cutoff happening
  const currentTime = new Date();
  const showAllPicks = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;

  // Sort everyone by how many weeks they've survived and alphabetically, survivors first
  playerPicks.sort((row1, row2) => {
    const firstName1 = row1.name.split(' ')[0];
    const lastName1 = row1.name.split(' ').pop()!;
    const firstName2 = row2.name.split(' ')[0];
    const lastName2 = row2.name.split(' ').pop()!;
    return (
      row2.survivorPicks.length - row1.survivorPicks.length ||
      Number(row2.aliveInSurvivor) - Number(row1.aliveInSurvivor) ||
      lastName1.localeCompare(lastName2) ||
      firstName1.localeCompare(firstName2)
    );
  });

  return (
    <section className="section">
      <div className="container pb-6">
        <table className="table is-bordered mx-auto">
          <thead>
            <tr>
              <th colSpan={2} className="has-text-centered">
                Color Codes
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="has-background-success">Team Won</td>
              <td className="has-background-danger">Team Lost or Tied</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <table className="table is-bordered is-striped is-hoverable mx-auto">
          <thead>
            <tr>
              <td></td>
              <th className="has-text-centered" colSpan={18}>
                Week
              </th>
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
                  <td key={`${row.name}-row-${index}`} className="has-text-centered">
                    {row.name}
                  </td>
                  {weeksArr.map((week, ind) => {
                    const gameCompleted = getGameCompleted(row.survivorPicks[ind]);
                    const isCurrentWeek = ind === CURRENT_WEEK - 1;
                    const weekMissed = row.survivorPicks[ind] === '';
                    const pickWasMade = ind < row.survivorPicks.length - 1;
                    const isMostRecentPick = ind === row.survivorPicks.length - 1;
                    if (isCurrentWeek) {
                      if (showAllPicks) {
                        if (row.aliveInSurvivor && gameCompleted) {
                          // If the user is still alive and the game is completed show as correct
                          return (
                            <td key={`${row.name}-${ind}`} className="has-background-success">
                              {row.survivorPicks[ind]}
                            </td>
                          );
                        } else if (!row.aliveInSurvivor && gameCompleted) {
                          // If the user is no longer alive and the game is completed show as incorrect
                          return (
                            <td key={`${row.name}-${ind}`} className="has-background-danger">
                              {row.survivorPicks[ind]}
                            </td>
                          );
                        } else if (!row.aliveInSurvivor) {
                          // If the user is no longer alive and they forgot to make a pick
                          return (
                            <td key={`${row.name}-${ind}`} className="has-background-danger">
                              {row.survivorPicks[ind]}
                            </td>
                          );
                        } else if (!gameCompleted) {
                          // If the submissions have locked but this game hasn't been played yet
                          return <td key={`${row.name}-${ind}`}>{row.survivorPicks[ind]}</td>;
                        }
                      } else {
                        if (gameCompleted) {
                          if (row.aliveInSurvivor) {
                            // If the week hasn't technically locked but the user picked correctly prior to cutoff
                            return (
                              <td key={`${row.name}-${ind}`} className="has-background-success">
                                {row.survivorPicks[ind]}
                              </td>
                            );
                          } else {
                            // If the week hasn't technically locked but the user picked incorrectly prior to cutoff
                            return (
                              <td key={`${row.name}-${ind}`} className="has-background-danger">
                                {row.survivorPicks[ind]}
                              </td>
                            );
                          }
                        } else {
                          // If the game hasn't completed yet and the week hasn't locked, show nothing
                          return <td key={`${row.name}-${ind}`}></td>;
                        }
                      }
                    } else {
                      if (isMostRecentPick && row.aliveInSurvivor) {
                        // If this was the most recent pick the user has made and it's from a prior week and they're still alive
                        return (
                          <td key={`${row.name}-${ind}`} className="has-background-success">
                            {row.survivorPicks[ind]}
                          </td>
                        );
                      } else if (isMostRecentPick && !row.aliveInSurvivor) {
                        // If this was the most recent pick the user has made and it's from a prior week and they're out
                        return (
                          <td key={`${row.name}-${ind}`} className="has-background-danger">
                            {row.survivorPicks[ind]}
                          </td>
                        );
                      } else if (weekMissed) {
                        return <td key={`${row.name}-${ind}`} className="has-background-danger"></td>;
                      } else if (pickWasMade) {
                        // If this was a pick from a prior week that they got correct
                        return (
                          <td key={`${row.name}-${ind}`} className="has-background-success">
                            {row.survivorPicks[ind]}
                          </td>
                        );
                      } else if (ind < CURRENT_WEEK - 1 && !row.aliveInSurvivor) {
                        return <td key={`${row.name}-${ind}`} className="has-background-danger"></td>;
                      } else {
                        // Else, the user has been eliminated at this point so fill with nothing
                        return <td key={`${row.name}-${ind}`}></td>;
                      }
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

export default SurvivorTable;
