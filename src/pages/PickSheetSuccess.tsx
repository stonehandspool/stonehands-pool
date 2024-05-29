import { useLocation } from 'react-router-dom';
import { CURRENT_WEEK } from '../constants';
import * as seasonData from '../../data/2023/season.json';
import * as teamData from '../../data/2023/teams.json';

function PickSheetSuccess() {
  // Get the users picks via the navigate hook
  const { state: userPicks } = useLocation();

  const { weeks } = seasonData;
  const { teams } = teamData;
  const currentWeek = weeks[`week_${CURRENT_WEEK}` as keyof typeof weeks];
  const numGamesThisWeek = Object.keys(currentWeek).length;
  const numGamesArr = [...Array(numGamesThisWeek).keys()];

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-three-quarters">
          <h1 className="title has-text-centered no-print">Success!</h1>
          <p className="has-text-centered no-print">
            Thank you for your submission, it has been sent the database for safe keeping!
          </p>
          <p className="has-text-centered no-print">
            Feel free to either print this page or save it as a pdf for yourself. Good luck and thank you for playing!
          </p>
          <br />
          <table className="table is-bordered mx-auto">
            <thead>
              <tr>
                <th className="has-text-centered" colSpan={3}>
                  Week {CURRENT_WEEK} picks for {`${userPicks.firstName} ${userPicks.lastName}`}
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">Game</th>
                <th className="has-text-centered">Team</th>
                <th className="has-text-centered">Points</th>
              </tr>
            </thead>
            <tbody>
              {numGamesArr.map(num => {
                const pick = userPicks[`matchup-${num}`];
                const confidence = userPicks[`matchup-${num}-confidence`];
                const displayName = teams[pick as keyof typeof teams].displayName;
                return (
                  <tr key={`confidence-${num}`}>
                    <td className="has-text-centered">{num + 1}</td>
                    <td className="has-text-centered">{displayName}</td>
                    <td className="has-text-centered">{confidence}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table className="table is-bordered mx-auto">
            <tbody>
              <tr>
                <td className="has-text-centered">Survivor Pick</td>
                <td className="has-text-centered">{userPicks['survivor-pick']}</td>
              </tr>
              <tr>
                <td className="has-text-centered">Margin Pick</td>
                <td className="has-text-centered">{userPicks['margin-pick']}</td>
              </tr>
              <tr>
                <td className="has-text-centered">Tiebreaker</td>
                <td className="has-text-centered">{userPicks.tiebreaker}</td>
              </tr>
            </tbody>
          </table>

          <table className="table is-bordered mx-auto">
            <thead>
              <tr>
                <th className="has-text-centered" colSpan={5}>
                  High 5 Picks
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {userPicks.highFivePicks.map((pick: string) => {
                  const displayName = teams[pick as keyof typeof teams].displayName;
                  return (
                    <td className="has-text-centered" key={`high-5-${pick}`}>
                      {displayName}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PickSheetSuccess;
