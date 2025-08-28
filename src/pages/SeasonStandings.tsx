import SeasonStandingsTable from '../components/standings/SeasonStandingsTable';

import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';

function SeasonStandings() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">Season standings as of week {CURRENT_WEEK}</h2>
        <SeasonStandingsTable />
      </div>
    </section>
  );
}

export default SeasonStandings;
