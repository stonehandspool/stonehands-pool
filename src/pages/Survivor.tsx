import playerData from '../../data/2024/football/players.json';
import SurvivorTable from '../components/standings/SurvivorTable';
import { CURRENT_YEAR, CURRENT_WEEK, SEASON_READY } from '../constants';

function Survivor() {
  if (!SEASON_READY) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, the season hasn't started yet, please wait until the season has been loaded
          </h3>
        </div>
      </section>
    );
  }

  const numStarted = playerData.length;
  const numRemaining = playerData.filter(player => player.aliveInSurvivor).length;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">Survivor results as of week {CURRENT_WEEK}</h2>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className="columns">
              <div className="column has-text-centered">
                <div>
                  <p className="heading">Pool Size</p>
                  <p className="title">{numStarted}</p>
                </div>
              </div>
              <div className="column has-text-centered">
                <div>
                  <p className="heading">Remaining</p>
                  <p className="title">{numRemaining}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SurvivorTable />
      </div>
    </section>
  );
}

export default Survivor;
