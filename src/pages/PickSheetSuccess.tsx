import { useLocation } from 'react-router-dom';
import { ConfidenceMatchupInfo, CURRENT_WEEK } from '../constants';
import teamData from '../../data/2025/football/teams.json';

function PickSheetSuccess() {
  // Get the users picks via the navigate hook
  const { state: userPicks } = useLocation();
  const { firstName, lastName, confidencePicks, survivorPick, marginPick, highFivePicks, tiebreaker } = userPicks;

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
                  Week {CURRENT_WEEK} picks for {`${firstName} ${lastName}`}
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">Game</th>
                <th className="has-text-centered">Team</th>
                <th className="has-text-centered">Points</th>
              </tr>
            </thead>
            <tbody>
              {confidencePicks.map((pickData: ConfidenceMatchupInfo, index: number) => {
                const { team, confidence } = pickData;
                const displayName = teamData.find(teamInfo => teamInfo.teamCode === team)!.teamName;
                return (
                  <tr key={`confidence-${index}`}>
                    <td className="has-text-centered">{index + 1}</td>
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
                <td className="has-text-centered">{survivorPick}</td>
              </tr>
              <tr>
                <td className="has-text-centered">Margin Pick</td>
                <td className="has-text-centered">{marginPick}</td>
              </tr>
              <tr>
                <td className="has-text-centered">Tiebreaker</td>
                <td className="has-text-centered">{tiebreaker}</td>
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
                {highFivePicks.map((team: string, index: number) => {
                  const displayName = teamData.find(teamInfo => teamInfo.teamCode === team)!.teamName;
                  return (
                    <td className="has-text-centered" key={`high-5-${index}`}>
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
