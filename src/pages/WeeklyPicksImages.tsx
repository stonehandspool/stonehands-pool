import WeeklyPicksImagesTable from '../components/weeklypicks/WeeklyPicksImagesTable';
import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';
import { week18Results } from '../temp/dummyData';
import { fakePicks } from '../temp/fakePicks';

function WeeklyPicksImages() {
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>Player selections for week {CURRENT_WEEK}</h2>
                <WeeklyPicksImagesTable weeklyResults={week18Results} submittedPicks={fakePicks} />
            </div>
        </section>
    );
}

export default WeeklyPicksImages;