import WeeklyStandingsTable from '../components/standings/WeeklyStandingsTable';
import { week18Results } from '../temp/dummyData';
import { fakePicks } from '../temp/fakePicks';

function WeeklyStandings() {
    return (
        <div className='weekly-standings'>
            <WeeklyStandingsTable weeklyResults={week18Results} submittedPicks={fakePicks} />
        </div>
    );
}

export default WeeklyStandings;