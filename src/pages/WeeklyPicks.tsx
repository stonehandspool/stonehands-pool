import WeeklyPicksTable from '../components/weeklypicks/WeeklyPicksTable';
import { week18Results } from '../temp/dummyData';
import { fakePicks } from '../temp/fakePicks';

function WeeklyPicks() {
    return (
        <div className='weekly-picks'>
            <WeeklyPicksTable weeklyResults={week18Results} submittedPicks={fakePicks} />
        </div>
    );
}

export default WeeklyPicks;