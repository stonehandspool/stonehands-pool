import { useLocation } from 'react-router-dom';

function MarchMadnessPicksheetSuccess() {
  // Get the users picks via the navigate hook
  const { state: userPicks } = useLocation();
  const finalMatchup = userPicks[userPicks.length - 1];
  const winner = finalMatchup.winner === 'top' ? finalMatchup.topTeam.name : finalMatchup.bottomTeam.name;

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-three-quarters">
          <h1 className="title has-text-centered has-text-success">Success!</h1>
          <br />
          <p className="has-text-centered subtitle">Your Champion:</p>
          <p className="has-text-centered title is-1">{winner}</p>
          <p className="has-text-centered">
            Thank you for your submission, it has been sent the database for safe keeping! Good luck and thank you for
            playing!
          </p>
          <p className="has-text-centered">
            Feel free to look at the standings page to make sure your name shows up there.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MarchMadnessPicksheetSuccess;
