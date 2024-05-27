import { useState } from "react";
import SeasonStandingsTable from "../components/standings/SeasonStandingsTable";

import { CURRENT_YEAR, CURRENT_WEEK } from "../constants";

function SeasonStandings() {
  const [notificationVisible, setNotificationVisible] = useState(true);

  const removeNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">
          {CURRENT_YEAR} Stonehands Pool
        </h1>
        <h2 className="subtitle has-text-centered">
          Season standings as of week {CURRENT_WEEK}
        </h2>
        {notificationVisible && CURRENT_WEEK <= 2 && (
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="notification is-info is-narrow">
                <button
                  className="delete"
                  onClick={removeNotification}
                ></button>
                If you'd like to see a players in-depth season stats you can
                click on their name!
              </div>
            </div>
          </div>
        )}
        <SeasonStandingsTable />
      </div>
    </section>
  );
}

export default SeasonStandings;
