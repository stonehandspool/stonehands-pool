import WeeklyPicksImagesTable from '../components/weeklypicks/WeeklyPicksImagesTable';
import { week18Results } from '../temp/dummyData';
import { fakePicks } from '../temp/fakePicks';

function WeeklyPicksImages() {
    return (
        <div className='weekly-picks'>
            <WeeklyPicksImagesTable weeklyResults={week18Results} submittedPicks={fakePicks} />
        </div>
    );
}

export default WeeklyPicksImages;