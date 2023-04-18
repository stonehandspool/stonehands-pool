import * as seasonStandings from '../../../data/2023/players.json';

type MarginPick = {
    team: string;
    margin: number;
};

type PlayerInfo = {
    name: string;
    marginPicks: MarginPick[];
    marginTotal: number;
    numWins: number;
};

const headers: string[] = ['Player', 'Total', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', 'Wins'];
const weeksArr = [...Array(18)];

function MarginTable() {
    const { players } = seasonStandings;

    // Calculate the standings
    const playerPicks: PlayerInfo[] = [];
    for (let i = 0; i < players.length; i++) {
        const playerInfo = players[i];
        const numWins = playerInfo.marginPicks.filter(pick => pick.margin > 0).length;
        const rowInfo: PlayerInfo = {
            name: `${playerInfo.firstName} ${playerInfo.lastName}`,
            marginPicks: playerInfo.marginPicks,
            marginTotal: playerInfo.marginTotal,
            numWins,
        };
        playerPicks.push(rowInfo);
    }

    // Sort everyone by their margin total
    playerPicks.sort((row1, row2) => {
        // Sort by the margin total
        if (row1.marginTotal > row2.marginTotal) return -1;
        if (row1.marginTotal < row2.marginTotal) return 1;
        return 0;
    });
    
    return (
        <section className='section'>
            <div className='container'>
                <table className='table is-bordered is-hoverable mx-auto has-text-centered'>
                    <thead>
                        <tr>
                            {headers.map(heading => {
                                return <th key={heading} className='has-text-centered'>{heading}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                            {playerPicks.map((row, index) => {
                                return <tr key={`${index}`}>
                                    <td key={`${row.name}-row-${index}`} className='is-vcentered'>{row.name}</td>
                                    <td key={`${row.name}-total-${index}`} className='is-vcentered'><strong>{row.marginTotal > 0 ? '+' : ''}{row.marginTotal}</strong></td>
                                    {
                                        weeksArr.map((week, ind) => {
                                            if (row.marginPicks[ind]) {
                                                if (row.marginPicks[ind].margin > 0) {
                                                    //If the margin of victory was over 0, have a green background
                                                    return <td key={`${row.name}-${ind}`} className='has-background-success'>{row.marginPicks[ind].team}<br />+{row.marginPicks[ind].margin}</td>
                                                } else if (row.marginPicks[ind].margin < 0) {
                                                    // If the margin of victory was under 0, have a red background
                                                    return <td key={`${row.name}-${ind}`} className='has-background-danger'>{row.marginPicks[ind].team}<br />{row.marginPicks[ind].margin}</td>
                                                } else {
                                                    // If the margin of victory was 0 or null (unfinished game) then no background
                                                    return <td key={`${row.name}-${ind}`}>{row.marginPicks[ind].team}<br />{row.marginPicks[ind].margin}</td>
                                                }
                                            } else {
                                                return <td key={`${row.name}-${ind}`}></td>
                                            }
                                        })
                                    }
                                    <td key={`${row.name}-wins-${index}`} className='is-vcentered'>{row.numWins}</td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default MarginTable;