// Re-add this after week 1 finishes
// import SeasonStandingsTable from '../components/standings/SeasonStandingsTable';

import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';

function SeasonStandings() {
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehand Pool</h1>
                <h2 className='subtitle has-text-centered'>Season standings as of week {CURRENT_WEEK}</h2>
                {/* <SeasonStandingsTable /> */}
                <h1>Coming Soon! (There's no results yet!)</h1>
            </div>
        </section>
    );
}

export default SeasonStandings;