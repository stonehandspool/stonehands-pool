import * as TeamLogos from '../../assets/logos'
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
    const { userPicks, teamsByPicks } = props;
    return (
        <div className='container'>
            <h4 className='title is-4'>Confidence Picks by Week:</h4>
            <UserConfidencePicksTable confidencePicks={userPicks} />
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
                    <h6 className='title is-6 has-text-centered'>Proj. Record</h6>
                </div>
            </div>
            {
                teamsByPicks.map((key: any, index: number) => {
                    const { team, wins, ties, losses} = teamsByPicks[index];
                    const Logo = TeamLogos[team as keyof typeof TeamLogos];
                    const percentage = ((wins + (ties / 2)) / (wins + ties + losses)) * 100;
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
                    </div>
                })
            }
        </div>
    );
}

export default UserConfidenceReport;