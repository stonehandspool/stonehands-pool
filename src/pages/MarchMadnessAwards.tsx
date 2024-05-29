import { CURRENT_YEAR } from '../constants';
import accolades from '../../data/2024/marchmadness/accolades.json';

interface AccoladeInfo {
  id: string;
  title: string;
  description: string;
  data: any[];
}

function getEnding(place: number) {
  const lastDigit = +place.toString().slice(-1);
  if (lastDigit === 1 && place != 11) {
    return 'st';
  } else if (lastDigit === 2 && place != 12) {
    return 'nd';
  } else if (lastDigit === 3 && place != 13) {
    return 'rd';
  } else {
    return 'th';
  }
}

function MarchMadnessAwards() {
  const mostPoints = accolades.find(accolade => accolade.id === 'successfulPeople') as AccoladeInfo;
  const mostWins = accolades.find(accolade => accolade.id === 'accuratePeople') as AccoladeInfo;
  const indecisivePeople = accolades.find(accolade => accolade.id === 'indecisivePeople') as AccoladeInfo;
  const ambitiousPeople = accolades.find(accolade => accolade.id === 'ambitiousPeople') as AccoladeInfo;
  const bestBracketTitles = accolades.find(accolade => accolade.id === 'bestBracketTitles') as AccoladeInfo;
  const leastWins = accolades.find(accolade => accolade.id === 'inaccuratePeople') as AccoladeInfo;
  const leastPoints = accolades.find(accolade => accolade.id === 'unsuccessfulPeople') as AccoladeInfo;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">
          A collection of awards, highlights, and lowlights from the {CURRENT_YEAR} March Madness Tournament
        </h2>
        <br />
        <br />
        <h3 className="title is-1 has-text-centered">Tournament Highlights</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{mostPoints.title}</h2>
            <h3 className="subtitle has-text-centered">{mostPoints.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Wins</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                {mostPoints.data.map((info, index) => {
                  return (
                    <tr key={`${info.username}-mostWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.points}</b>
                      </td>
                      <td>{info.numCorrect}</td>
                      <td>{info.numIncorrect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{mostWins.title}</h2>
            <h3 className="subtitle has-text-centered">{mostWins.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {mostWins.data.map((info, index) => {
                  return (
                    <tr key={`${info.username}-mostWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.numCorrect}</b>
                      </td>
                      <td>{info.numIncorrect}</td>
                      <td>{info.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="title is-2 has-text-centered">Random Awards</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{ambitiousPeople.title}</h2>
            <h3 className="subtitle has-text-centered">{ambitiousPeople.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Initial Max Points</th>
                  <th>Final Points</th>
                  <th>Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {ambitiousPeople.data.map((info, index) => {
                  return (
                    <tr key={`${info.userId}-ambitiousPeople`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.startingMaxPoints}</b>
                      </td>
                      <td>{info.points}</td>
                      <td>{((info.points / info.startingMaxPoints) * 100).toFixed(2)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{indecisivePeople.title}</h2>
            <h3 className="subtitle has-text-centered">{indecisivePeople.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th># of Updates to Bracket</th>
                </tr>
              </thead>
              <tbody>
                {indecisivePeople.data.map((info, index) => {
                  return (
                    <tr key={`${info.userId}-indecisivePeople`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.timesUpdated}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{bestBracketTitles.title}</h2>
            <h3 className="subtitle has-text-centered">{bestBracketTitles.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Bracket Title</th>
                </tr>
              </thead>
              <tbody>
                {bestBracketTitles.data.map((info, index) => {
                  return (
                    <tr key={`${info.userId}-bestBracketTitles`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.bracketTitle}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="title is-2 has-text-centered">Tournament Lowlights</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{leastWins.title}</h2>
            <h3 className="subtitle has-text-centered">{leastWins.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Wins</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                {leastWins.data.map((info, index) => {
                  return (
                    <tr key={`${info.userId}-leastWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>{info.points}</td>
                      <td>
                        <b>{info.numCorrect}</b>
                      </td>
                      <td>{info.numIncorrect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{leastPoints.title}</h2>
            <h3 className="subtitle has-text-centered">{leastPoints.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Wins</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                {leastPoints.data.map((info, index) => {
                  return (
                    <tr key={`${info.userId}-leastPoints`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.points}</b>
                      </td>
                      <td>{info.numCorrect}</td>
                      <td>{info.numIncorrect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarchMadnessAwards;
