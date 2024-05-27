import MarginTable from "../components/standings/MarginTable";
import { CURRENT_YEAR, CURRENT_WEEK, SEASON_READY } from "../constants";

function Margin() {
  if (!SEASON_READY) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, the season hasn't started yet, please wait until the season
            has been loaded
          </h3>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">
          {CURRENT_YEAR} Stonehands Pool
        </h1>
        <h2 className="subtitle has-text-centered">
          Margin results as of week {CURRENT_WEEK}
        </h2>
        <MarginTable />
      </div>
    </section>
  );
}

export default Margin;
