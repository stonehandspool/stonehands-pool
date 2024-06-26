import { SubmissionInfo } from '../../constants';

interface TableProps {
  confidencePicks: SubmissionInfo[];
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
          const { submission_data } = weekInfo;
          return (
            <tr key={`${index}-row`}>
              <td className="has-text-centered">{index + 1}</td>
              {Array.from({ length: 16 }, (_, i) => i).map(number => {
                const team = submission_data[`matchup-${number}` as keyof typeof submission_data];
                const confidence = submission_data[`matchup-${number}-confidence` as keyof typeof submission_data];
                if (team) {
                  return (
                    <td key={`week-${index}-pick-${number}`} className="has-text-centered">
                      {team}
                      <br />
                      {confidence}
                    </td>
                  );
                } else {
                  return <td key={`week-${index}-pick-${number}`}></td>;
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
