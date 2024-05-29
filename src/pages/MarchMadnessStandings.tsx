import StandingsTable from '../components/marchmadness/StandingsTable';
import { CURRENT_YEAR } from '../constants';

function MarchMadnessStandings() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">March Madness Standings</h2>
        <StandingsTable />
      </div>
    </section>
  );
}

export default MarchMadnessStandings;
