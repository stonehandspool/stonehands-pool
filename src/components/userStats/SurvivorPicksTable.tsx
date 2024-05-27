import { CURRENT_WEEK } from "../../constants";

interface TableProps {
  survivorPicks: string[];
  aliveInSurvivor: boolean;
}

const weeksArr = Array.from({ length: CURRENT_WEEK }, (_, i) => i + 1);
const headers: string[] = ["Week"];
for (let i = 0; i < weeksArr.length; i++) {
  headers.push(weeksArr[i].toString());
}

function SurvivorPicksTable(props: TableProps) {
  const { survivorPicks, aliveInSurvivor } = props;
  // Calculate the standings
  return (
    <table className="table is-bordered is-hoverable">
      <thead>
        <tr>
          {headers.map((heading) => {
            return <th key={heading}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Team</td>
          {survivorPicks.map((pick, ind) => {
            if (ind < survivorPicks.length - 1) {
              // If this is a selection from a prior week that was correct
              return (
                <td key={`${ind}`} className="has-background-success">
                  {survivorPicks[ind]}
                </td>
              );
            } else if (ind === survivorPicks.length - 1 && aliveInSurvivor) {
              // If this was the most recent pick and it was correct
              return (
                <td key={`${ind}`} className="has-background-success">
                  {survivorPicks[ind]}
                </td>
              );
            } else if (ind === survivorPicks.length - 1 && !aliveInSurvivor) {
              // If this was the most recent pick and it was incorrect
              return (
                <td key={`${ind}`} className="has-background-danger">
                  {survivorPicks[ind]}
                </td>
              );
            } else {
              // If this player was eliminated at this point or just a week that hasn't happened yet
              return <td key={`${ind}`}></td>;
            }
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default SurvivorPicksTable;
