import teams from '../../../data/2024/marchmadness/teams.json';
import playerPicks from '../../../data/2024/marchmadness/playerPicks.json';

type TeamsRemainingInfo = {
    firstName: string;
    lastName: string;
    teamsRemainingByRound: number[],
};

const teamsPerRound = [32, 16, 8, 4, 2, 1];

function MarchMadnessTeamsRemainingTable() {
    const teamsRemainingArr: TeamsRemainingInfo[] = [];

    // Create all of the needed data
    playerPicks.forEach(player => {
        const teamsRemainingByRound = [0, 0, 0, 0, 0, 0];

        // Now go through each pick and update the array
        player.userPicks.forEach(pickInfo => {
            const { round, topTeam, bottomTeam } = pickInfo;
            if (round !== 1) {
                const topTeamAlive = teams.find(team => team.name === topTeam.name)!.alive;
                const bottomTeamAlive = teams.find(team => team.name === bottomTeam.name)!.alive;
                topTeamAlive && teamsRemainingByRound[round - 2]++;
                bottomTeamAlive && teamsRemainingByRound[round - 2]++;
            }

            if (pickInfo.nextMatchup === null) {
                const champion = pickInfo.winner === 'top' ? topTeam.name : bottomTeam.name;
                const championAlive = teams.find(team => team.name === champion)!.alive;
                championAlive && teamsRemainingByRound[teamsRemainingByRound.length - 1]++;
            }
        });

        teamsRemainingArr.push({
            firstName: player.firstName,
            lastName: player.lastName,
            teamsRemainingByRound,
        });
    });

    // Now make sure to order the table alphabetically
    teamsRemainingArr.sort((row1, row2) => {
        return row1.lastName.localeCompare(row2.lastName) || row1.firstName.localeCompare(row2.firstName);
    });

    return (
        <table className='table is-hoverable mx-auto'>
            <thead>
                <tr>
                    <td colSpan={1}></td>
                    <th colSpan={7} className='has-text-centered'>Teams Remaining in Round</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Rd. of 32</th>
                    <th>Sweet 16</th>
                    <th>Elite 8</th>
                    <th>Final 4</th>
                    <th>Finals</th>
                    <th>Champion</th>
                </tr>
            </thead>
            <tbody>
                {
                    teamsRemainingArr.map(playerInfo => {
                        return (
                            <tr>
                                <td>{`${playerInfo.firstName} ${playerInfo.lastName}`}</td>
                                {
                                    playerInfo.teamsRemainingByRound.map((num, index) => {
                                        if (num === teamsPerRound[index]) {
                                            return (
                                                <td className='has-text-success'>{num}/{teamsPerRound[index]}</td>
                                            )
                                        } else if (num === 0) {
                                            return (
                                                <td className='has-text-danger'>{num}/{teamsPerRound[index]}</td>
                                            )
                                        }
                                        return (
                                            <td>{num}/{teamsPerRound[index]}</td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default MarchMadnessTeamsRemainingTable;