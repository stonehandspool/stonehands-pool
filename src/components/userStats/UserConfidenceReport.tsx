import * as TeamLogos from '../../assets/logos';
import * as teamData from '../../../data/2023/teams.json';
import UserConfidencePicksTable from './UserConfidencePicksTable';

function getProgressBarColor(percent: number) {
    if (percent > .8) {
        return 'is-success';
    } else if (percent > 0.4) {
        return 'is-warning';
    } else {
        return 'is-danger';
    }
}

function UserConfidenceReport(props: any) {
    const { userPicks, teamsByPicks, pointsByWeek } = props;
    const { teams } = teamData;
    return (
        <div className='container'>
            <h4 className='title is-4'>Confidence Picks by Week:</h4>
            <UserConfidencePicksTable confidencePicks={userPicks} pointsByWeek={pointsByWeek} />
            <h4 className='title is-4'>Picks by Team:</h4>
            <div className='columns is-vcentered'>
                <div className='column is-1'>
                    <h6 className='title is-6 has-text-centered'>Team</h6>
                </div>
                <div className='column is-half'>
                    <h6 className='title is-6 has-text-centered'>Percentage of weeks picked to win</h6>
                </div>
                <div className='column is-1'></div>
                <div className='column is-1'>
                    <h6 className='title is-6 has-text-centered'>Projected Record</h6>
                </div>
                <div className='column is-1'>
                    <h6 className='title is-6 has-text-centered'>Actual Record</h6>
                </div>
                <div className='column is-1'>
                    <h6 className='title is-6 has-text-centered'>Accuracy</h6>
                </div>
            </div>
            {
                teamsByPicks.map((key: any, index: number) => {
                    const { team, wins, ties, losses} = teamsByPicks[index];
                    const { wins: teamWins, ties: teamTies, losses: teamLosses } = teams[team as keyof typeof teams];
                    const Logo = TeamLogos[team as keyof typeof TeamLogos];
                    const percentage = ((wins + (ties / 2)) / (wins + ties + losses)) * 100;
                    let accuracy;
                    if (wins === teamWins && losses === teamLosses && ties === teamTies) {
                        accuracy = 100;
                    } else {
                        let winAccuracy;
                        let lossAccuracy;
                        let tieAccuracy;

                        if (teamWins === 0 && wins === 0){
                            winAccuracy = 100;
                        } else if (teamWins === 0 && wins !== 0 || teamWins !== 0 && wins === 0) {
                            winAccuracy = 0;
                        } else {
                            winAccuracy = 100 - Math.abs((((wins - teamWins) / teamWins) * 100));
                        }

                        if (teamLosses === 0 && losses === 0) {
                            lossAccuracy = 100;
                        } else if (teamLosses === 0 && losses !== 0 || teamLosses !== 0 && losses === 0) {
                            lossAccuracy = 0;
                        } else {
                            lossAccuracy = 100 - Math.abs((((losses - teamLosses) / teamLosses) * 100));
                        }

                        if (teamTies === 0 && ties === 0) {
                            tieAccuracy = 100;
                        } else if (teamTies === 0 && ties !== 0 || teamTies !== 0 && ties === 0) {
                            tieAccuracy = 0;
                        } else {
                            tieAccuracy = 100 - Math.abs((((ties - teamTies) / teamTies) * 100));
                        }

                        if (teamTies === 0) {
                            accuracy = ((winAccuracy + lossAccuracy) / 2).toFixed(2);
                        } else {
                            accuracy = ((winAccuracy + lossAccuracy + tieAccuracy) / 3).toFixed(2);
                        }
                    }
                    return <div className='columns is-vcentered' key={`${key.team}`}>
                        <div className='column is-1 has-text-centered'><Logo /></div>
                        <div className='column is-half'>
                            <progress className={`progress ${getProgressBarColor((wins + (ties / 2)) / (wins + ties + losses))}`} value={wins + (ties / 2)} max={wins + ties + losses}>{percentage}</progress>
                        </div>
                        <div className='column is-1'>
                            <h6 className='title is-6'>{percentage}%</h6>
                        </div>
                        <div className='column is-1'>
                            <h6 className='title is-6 has-text-centered'>{wins}-{losses}-{ties}</h6>
                        </div>
                        <div className='column is-1'>
                            <h6 className='title is-6 has-text-centered'>{teamWins}-{teamLosses}-{teamTies}</h6>
                        </div>
                        <div className='column is-1'>
                            <h6 className='title is-6 has-text-centered'>{accuracy}%</h6>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default UserConfidenceReport;