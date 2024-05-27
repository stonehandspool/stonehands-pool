import WeeklyPicksTable from "../components/weeklypicks/WeeklyPicksTable";
import { CURRENT_YEAR, CURRENT_WEEK } from "../constants";

function WeeklyPicks() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">
          {CURRENT_YEAR} Stonehands Pool
        </h1>
        <h2 className="subtitle has-text-centered">
          Player selections for week {CURRENT_WEEK}
        </h2>
        <WeeklyPicksTable />
      </div>
    </section>
  );
}

export default WeeklyPicks;
