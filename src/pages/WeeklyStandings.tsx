import WeeklyStandingsTable from '../components/standings/WeeklyStandingsTable';
import { CURRENT_WEEK, CURRENT_YEAR } from '../constants';
import { week18Results } from '../temp/dummyData';
import { fakePicks } from '../temp/fakePicks';

function WeeklyStandings() {
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehand Pool</h1>
                <h2 className='subtitle has-text-centered'>Player standings for week {CURRENT_WEEK}</h2>
                <WeeklyStandingsTable weeklyResults={week18Results} submittedPicks={fakePicks} />
            </div>
        </section>
    );
}

export default WeeklyStandings;