import WeeklyPicksTable from '../components/weeklypicks/WeeklyPicksTable';
import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';
import { week18Results } from '../temp/dummyData';
import { fakePicks } from '../temp/fakePicks';

function WeeklyPicks() {
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehand Pool</h1>
                <h2 className='subtitle has-text-centered'>Player selections for week {CURRENT_WEEK}</h2>
                <WeeklyPicksTable weeklyResults={week18Results} submittedPicks={fakePicks} />
            </div>
        </section>
    );
}

export default WeeklyPicks;