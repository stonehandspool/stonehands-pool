import WeeklyStandingsTable from '../components/standings/WeeklyStandingsTable';
import { CURRENT_WEEK, CURRENT_YEAR } from '../constants';

function WeeklyStandings() {
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>Player standings for week {CURRENT_WEEK}</h2>
                <WeeklyStandingsTable />
            </div>
        </section>
    );
}

export default WeeklyStandings;