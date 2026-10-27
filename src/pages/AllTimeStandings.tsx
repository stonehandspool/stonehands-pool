import AllTimeStandingsTable from '../components/standings/AllTimeStandingsTable';

function SeasonStandings() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">All Time Standings</h2>
        <AllTimeStandingsTable />
      </div>
    </section>
  );
}

export default SeasonStandings;
