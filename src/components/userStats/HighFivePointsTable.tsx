interface TableProps {
  highFivePoints: number[];
  weekToShow: number;
}

function HighFivePointsTable(props: TableProps) {
  const { highFivePoints, weekToShow } = props;

  const weeksArr = Array.from({ length: weekToShow }, (_, i) => i + 1);
  const headers: string[] = ["Week"];
  for (let i = 0; i < weeksArr.length; i++) {
    headers.push(weeksArr[i].toString());
  }

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
          <td>Points</td>
          {highFivePoints.map((points, ind) => {
            if (ind < weekToShow) {
              return <td key={`${ind}`}>{highFivePoints[ind]}</td>;
            }
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default HighFivePointsTable;
