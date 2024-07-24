import { DatabaseData } from '../../constants';

interface TableProps {
  confidencePicks: DatabaseData[];
  pointsByWeek: number[];
}

const gameArr = Array.from({ length: 16 }, (_, i) => i + 1);
const headers: string[] = ['Week'];
for (let i = 0; i < gameArr.length; i++) {
  headers.push(`Game ${gameArr[i]}`);
}
headers.push('Points');

function UserConfidencePicksTable(props: TableProps) {
  const { confidencePicks, pointsByWeek } = props;
  return (
    <table className="table is-bordered is-hoverable">
      <thead>
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
        {confidencePicks.map((weekInfo, index) => {
          const confidencePicks = weekInfo.submission_data.confidencePicks;
          return (
            <tr key={`${index}-row`}>
              <td className="has-text-centered">{index + 1}</td>
              {Array.from({ length: 16 }, (_, i) => i).map((_: unknown, ind: number) => {
                const { team, confidence } = confidencePicks[index];
                if (team) {
                  return (
                    <td key={`week-${index}-pick-${ind}`} className="has-text-centered">
                      {team}
                      <br />
                      {confidence}
                    </td>
                  );
                } else {
                  return <td key={`week-${index}-pick-${ind}`}></td>;
                }
              })}
              <td className="has-text-centered is-vcentered">
                <b>{pointsByWeek[index]}</b>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserConfidencePicksTable;
