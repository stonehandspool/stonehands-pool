import * as seasonStandings from '../../../data/2023/players.json';
import { CURRENT_WEEK_STATUS, CURRENT_WEEK_CUTOFF_TIME, CURRENT_WEEK } from '../../constants';

type HighFivePick = {
    team: string;
    won: boolean;
};

type PlayerInfo = {
    name: string;
    recentPicks: HighFivePick[];
    weeklyPoints: number[];
    highFiveTotal: number;
};

const headers: string[] = ['Player', 'Total', 'Pick 1', 'Pick 2', 'Pick 3', 'Pick 4', 'Pick 5', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
const weeksArr = [...Array(18)];

function HighFiveTable() {
    const { players } = seasonStandings;

    // Calculate the standings
    const playerPicks: PlayerInfo[] = [];
    for (let i = 0; i < players.length; i++) {
        const playerInfo = players[i];
        const rowInfo: PlayerInfo = {
            name: `${playerInfo.firstName.trim()} ${playerInfo.lastName.trim()}`,
            recentPicks: playerInfo.highFiveThisWeek as HighFivePick[],
            weeklyPoints: playerInfo.highFiveValues,
            highFiveTotal: playerInfo.highFiveTotal,
        };
        playerPicks.push(rowInfo);
    }

    // Sort everyone by their point total
    playerPicks.sort((row1, row2) => {
        const firstName1 = row1.name.split(' ')[0] as string;
        const lastName1 = row1.name.split(' ').pop() as string;
        const firstName2 = row2.name.split(' ')[0] as string;
        const lastName2 = row2.name.split(' ').pop() as string;
        return row2.highFiveTotal - row1.highFiveTotal || lastName1.localeCompare(lastName2) || firstName1.localeCompare(firstName2);
    });

    // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
    // can't see what people have chosen prior to the cutoff happening
    const currentTime = new Date();
    const isBrandNewWeek = CURRENT_WEEK_STATUS === 'START';
    const showAllPicks = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;
    console.log(showAllPicks);

    return(
        <section className='section'>
            <div className='container pb-6'>
                <table className='table is-bordered mx-auto'>
                    <thead>
                        <tr>
                            <th colSpan={2} className='has-text-centered'>Color Codes</th>
                            <th colSpan={5} className='has-text-centered'>Scoring</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='has-background-success'>Team Won</td>
                            <td className='has-background-danger'>Team Lost or Tied</td>
                            <td>1 Win = 1 Point</td>
                            <td>2 Wins = 2 Point</td>
                            <td>3 Wins = 3 Point</td>
                            <td>4 Wins = 5 Point</td>
                            <td>5 Wins = 8 Point</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='container'>
                <table className='table is-narrow is-bordered is-striped is-hoverable mx-auto has-text-centered'>
                    <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <th colSpan={5} align='center'>Past Week Choices</th>
                            <th colSpan={18} align='center'>Points by Week</th>
                        </tr>
                        <tr>
                            {headers.map(heading => {
                                return <th key={heading}>{heading}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                            {playerPicks.map((row, index) => {
                                return <tr key={`${index}`}>
                                    <td key={`${row.name}-row-${index}`} className='is-vcentered'>{row.name}</td>
                                    <td key={`${row.name}-total-${index}`} className='is-vcentered'><strong>{row.highFiveTotal}</strong></td>
                                    {
                                        (row.recentPicks.length > 0) &&
                                        row.recentPicks.map((pick, ind) => {
                                            let className;
                                            // Doing explicit checks for true and false because it can be null and we want a white background for that
                                            if (pick.won === true) {
                                                className = 'has-background-success';
                                            } else if (pick.won === false) {
                                                className = 'has-background-danger';
                                            }
                                            if (showAllPicks || isBrandNewWeek) {
                                                // If we're at a brand new week show prior weeks picks or show current picks once week is locked
                                                return <td key={`${row.name}-pick-${ind}`} className={className}>{pick.team}</td>
                                            } else if (!showAllPicks && className !== undefined && pick.team !== 'N/A') {
                                                // If we're in progress in a week and a pick has completed then we can show it
                                                return <td key={`${row.name}-pick-${ind}`} className={className}>{pick.team}</td>
                                            } else {
                                                return <td key={`${row.name}-pick-${ind}`}>{' '}</td>
                                            }
                                        })
                                    }
                                    {
                                        row.recentPicks.length === 0 &&
                                        Array.from({ length: 5 }).map((key, ind) => {
                                            return <td key={`${row.name}-pick-${ind}`}>{' '}</td>
                                        })
                                    }
                                    {
                                        weeksArr.map((week, ind) => {
                                            const isCurrentWeek = ind === CURRENT_WEEK - 1;
                                            if (isCurrentWeek && !showAllPicks) {
                                                return <td key={`${row.name}-hidden`}></td>
                                            } else if (row.weeklyPoints[ind] || row.weeklyPoints[ind] === 0) {
                                                return <td key={`${row.name}-${ind}`}>{row.weeklyPoints[ind]}</td>
                                            } else {
                                                return <td key={`${row.name}-${ind}`}></td>
                                            }
                                        })
                                    }
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HighFiveTable;