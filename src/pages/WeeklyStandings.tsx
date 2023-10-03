import WeeklyStandingsTable from '../components/standings/WeeklyStandingsTable';
import { CURRENT_WEEK, CURRENT_WEEK_FINAL_GAME, CURRENT_WEEK_STATUS, CURRENT_YEAR, MONDAY_NIGHT_TOTAL } from '../constants';

function WeeklyStandings() {
    // If the current week is currently marked as START we don't want to show anything yet, so show the prior weeks data
    const weekToShow = CURRENT_WEEK_STATUS === 'START' && CURRENT_WEEK > 1 ? CURRENT_WEEK - 1 : CURRENT_WEEK;

    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>Player standings for week {weekToShow}</h2>
                {
                    (CURRENT_WEEK_STATUS === 'START' && CURRENT_WEEK > 1) &&
                    <h2 className='subtitle has-text-centered has-text-danger'>
                        This page will show the prior weeks standings until the first game of week {CURRENT_WEEK} finishes
                        and the website is updated.
                    </h2>
                }
                {
                    (CURRENT_WEEK_STATUS === 'COMPLETE') &&
                    <h4 className='subtitle is-5 has-text-centered'>
                        The tiebreaker game for this week was <b>{CURRENT_WEEK_FINAL_GAME}</b> and the total score was <b>{MONDAY_NIGHT_TOTAL}</b>.
                    </h4>
                }
                <WeeklyStandingsTable />
            </div>
        </section>
    );
}

export default WeeklyStandings;