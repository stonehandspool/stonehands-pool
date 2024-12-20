import { CURRENT_YEAR } from '../constants';
import playerData from '../../data/2024/football/players.json';

function AllUserStats() {
  // First, sort the names alphabetically
  playerData.sort((row1, row2) => {
    const firstName1 = row1.firstName.split(' ')[0];
    const lastName1 = row1.lastName.split(' ').pop()!;
    const firstName2 = row2.firstName.split(' ')[0];
    const lastName2 = row2.lastName.split(' ').pop()!;
    return lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2);
  });
  const rows = [...Array(Math.ceil(playerData.length / 4))];
  const namesInRows = rows.map((_, index) => playerData.slice(index * 4, index * 4 + 4));
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">
          All users participating in the current season. Click on a name to see their stats!
        </h2>
        <table className="table is-bordered is-striped is-narrow mx-auto">
          <tbody>
            {namesInRows.map((row, index) => {
              return (
                <tr key={`row-${index}`}>
                  {row.map(r => {
                    return (
                      <td key={r.username}>
                        <a href={`/user/${r.username}`}>{`${r.firstName} ${r.lastName}`}</a>
                      </td>
                    );
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

export default AllUserStats;
