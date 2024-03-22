import { MARCH_MADNESS_CURRENT_ROUND, SubmissionInfo } from '../../constants';
import matchups from '../../../data/2024/marchmadness/matchups.json';
import playerPicks from '../../../data/2024/marchmadness/playerPicks.json';

type MatchupPerformanceInfo = {
    topTeam: string;
    topNumPicks: number;
    topPercent: string;
    bottomTeam: string;
    bottomNumPicks: number;
    bottomPercent: string;
    matchupId: string;
    matchupTotalParticipants: number;
};

type MarchMadnessPerformanceReportProps = {
    round: number;
};

const regions = ['WEST', 'EAST', 'SOUTH', 'MIDWEST'];
const gamesPerRound = [8, 4, 2, 1, 1];

function MarchMadnessPerformanceReport(props: MarchMadnessPerformanceReportProps) {
    const { round } = props;

    if (round > MARCH_MADNESS_CURRENT_ROUND) {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, we haven't made it that far in the tournament. Please check back later</h3>
                </div>
            </section>
        );
    }

    const matchupsInRound = matchups.filter(matchup => matchup.round === round);
    const performanceArr: MatchupPerformanceInfo[] = [];
    const gamesPerTable = gamesPerRound[round - 1];

    // First set up the initial values for the consensus info
    matchupsInRound.forEach(matchup => {
        performanceArr.push({
            topTeam: matchup.topTeam.name as string,
            topNumPicks: 0,
            topPercent: '0',
            bottomTeam: matchup.bottomTeam.name as string,
            bottomNumPicks: 0,
            bottomPercent: '0',
            matchupId: matchup.id,
            matchupTotalParticipants: 0,
        });
    });

    // Now go through every players response and update the consensus info
    playerPicks.forEach(playerInfo => {
        const { userPicks } = playerInfo;
        performanceArr.forEach(matchup => {
            const userMatchInfo = userPicks.find(pick => pick.id === matchup.matchupId)!;
            const userWinner = userMatchInfo.winner === 'top' ? userMatchInfo.topTeam.name : userMatchInfo.bottomTeam.name;
            if (userWinner === matchup.topTeam) {
                matchup.topNumPicks++;
                matchup.matchupTotalParticipants++;
            } else if (userWinner === matchup.bottomTeam) {
                matchup.bottomNumPicks++;
                matchup.matchupTotalParticipants++;
            }
        });
    });

    // Now calculate the percent and avg
    performanceArr.forEach(matchupInfo => {
        matchupInfo.topPercent = `${((matchupInfo.topNumPicks / matchupInfo.matchupTotalParticipants) * 100).toFixed(1)}%`;
        matchupInfo.bottomPercent = `${((matchupInfo.bottomNumPicks / matchupInfo.matchupTotalParticipants) * 100).toFixed(1)}%`;
    });

    return (
        <section className='section'>
            {
                regions.map((region, index) => {
                    console.log(region, index)
                    return (
                        <>
                            <h1 className='title is-1 has-text-centered'>{region}</h1>
                            {
                                <table className='table is-hoverable has-text-centered mx-auto'>
                                    <tbody>
                                        <tr>
                                            <td className='is-vcentered'><b>Team #1</b></td>
                                            {
                                                performanceArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                                                    return <td key={`${info.topTeam}-name`}>{info.topTeam}</td>
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            <td># Times Chosen</td>
                                            {
                                                performanceArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                                                    return <td key={`${info.topTeam}-name`}>{info.topNumPicks}</td>
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            <td>Percent</td>
                                            {
                                                performanceArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                                                    return <td key={`${info.topTeam}-name`}>{info.topPercent}</td>
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            <td className='is-vcentered'><b>Team #2</b></td>
                                            {
                                                performanceArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                                                    return <td key={`${info.bottomTeam}-name`}>{info.bottomTeam}</td>
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            <td># Times Chosen</td>
                                            {
                                                performanceArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                                                    return <td key={`${info.bottomTeam}-name`}>{info.bottomNumPicks}</td>
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            <td>Percent</td>
                                            {
                                                performanceArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                                                    return <td key={`${info.bottomTeam}-name`}>{info.bottomPercent}</td>
                                                })
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            }
                        </>

                    )
                })
            }
        </section>
    );
}

export default MarchMadnessPerformanceReport;

{/* <table className='table is-hoverable has-text-centered'>
    <tbody>
        <tr>
            <td className='is-vcentered'><b>Team #1</b></td>
            {
                performanceArr.map(info => {
                    return <td key={`${info.topTeam}-name`}>{info.topTeam}</td>
                })
            }
        </tr>
        <tr>
            <td># Times Chosen</td>
            {
                performanceArr.map(info => (
                    <td key={`${info.topTeam}-numPicks`}>{info.topNumPicks}</td>
                ))
            }
        </tr>
        <tr>
            <td>Percent</td>
            {
                performanceArr.map(info => (
                    <td key={`${info.topTeam}-percent`}>{info.topPercent}</td>
                ))
            }
        </tr>
        <tr>
            <td className='is-vcentered'><b>Team #2</b></td>
            {
                performanceArr.map(info => {
                    return <td key={`${info.bottomTeam}-name`}>{info.bottomTeam}</td>
                })
            }
        </tr>
        <tr>
            <td># Times Chosen</td>
            {
                performanceArr.map(info => (
                    <td key={`${info.bottomTeam}-weekly-numPicks`}>{info.bottomNumPicks}</td>
                ))
            }
        </tr>
        <tr>
            <td>Percent</td>
            {
                performanceArr.map(info => (
                    <td key={`${info.bottomTeam}-weekly-percent`}>{info.bottomPercent}</td>
                ))
            }
        </tr>
    </tbody>
</table> */}