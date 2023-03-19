import { CURRENT_WEEK } from '../../constants';

type TableProps = {
    highFivePoints: number[];
};

const weeksArr = Array.from({ length: CURRENT_WEEK }, (_, i) => i + 1);
const headers: string[] = ['Week'];
for (let i = 0; i < weeksArr.length; i++) {
    headers.push(weeksArr[i].toString());
}

function HighFivePointsTable(props: TableProps) {
    const { highFivePoints } = props;
    return(
        <table className='table is-bordered is-hoverable'>
            <thead>
                <tr>
                    {headers.map(heading => {
                        return <th key={heading}>{heading}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Points</td>
                    {
                        highFivePoints.map((points, ind) => {
                            return <td key={`${ind}`}>{highFivePoints[ind]}</td>
                        })
                    }
                </tr>
            </tbody>
        </table>
    );
}

export default HighFivePointsTable;