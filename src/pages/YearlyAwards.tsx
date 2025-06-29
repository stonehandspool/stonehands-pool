import { CURRENT_YEAR } from '../constants';
import accolades from '../../data/2024/football/accolades.json';

interface ForgetfulPeopleData {
  userId: string;
  firstName: string;
  lastName: string;
  timesForgotten: number;
}

interface EagerPeopleData {
  userId: string;
  firstName: string;
  lastName: string;
  places: number[];
  average: number;
}

interface PointsData {
  userId: string;
  firstName: string;
  lastName: string;
  timesCorrect: number;
  timesIncorrect: number;
  totalPoints: number;
  pointsRisked: number;
  weeksChecked: string[];
  efficiency: number;
}

interface LoneWolfData {
  userId: string;
  firstName: string;
  lastName: string;
  team: string;
  losingTeam: string;
  pickedRight: boolean;
  weekKey: string;
  gameKey: string;
  description: string;
}

interface MarginPicks {
  team: string;
  margin: number;
}

interface HighFive {
  team: string;
  won: boolean;
}

interface MostPointsData {
  id: string; // TODO: make this userId
  username: string;
  firstName: string;
  lastName: string;
  wins: number;
  winsByWeek: number[];
  losses: number;
  lossesByWeek: number[];
  ties: number;
  tiesByWeek: number[];
  percent: number;
  points: number;
  pointsByWeek: number[];
  tbAvg: number;
  tiebreakerByWeek: number[];
  lastWeekRank: number;
  currentWeekRank: number;
  rankByWeek: number[];
  change: string;
  currentWeekWins: number;
  currentWeekLosses: number;
  currentWeekTies: number;
  currentWeekPoints: number;
  currentWeekTiebreaker: number;
  survivorPicks: string[];
  aliveInSurvivor: boolean;
  marginPicks: MarginPicks[];
  marginTotal: number;
  highFiveValues: number[];
  highFiveTotal: number;
  highFiveThisWeek: HighFive[];
}

interface WinsInWeekData {
  id: string;
  firstName: string;
  lastName: string;
  year: number;
  week: number;
  wins: number;
  losses: number;
  points: number;
}

interface TeamsPickedData {
  name: string;
  count: number;
  pickedBy: string[];
}

interface BestPickedData {
  userId: string;
  firstName: string;
  lastName: string;
  team: string;
  timesCorrect: number;
  timesIncorrect: number;
}

interface SecretMangoData {
  name: string;
  week: string;
  year: number;
}

interface SecretMurphyData {
  name: string;
  week: string;
  year: number;
}

interface SurvivorData {
  name: string;
  weeksSurvived: number;
  year: number;
}

interface MarginData {
  id: string;
  firstName: string;
  lastName: string;
  marginTotal: string;
  totalWins: number;
}

interface HighFiveData {
  firstName: string;
  lastName: string;
  highFiveTotal: string;
  totalWins: number;
}

interface MostIndecisiveData {
  firstName: string;
  lastName: string;
  timesUpdated: number;
}

interface AccoladeInfo {
  id: string;
  title: string;
  description: string;
  data: any[]; // eslint-ignore no-explicit-any
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

function YearlyAwards() {
  const mostPoints = accolades.find(accolade => accolade.id === 'mostPoints') as AccoladeInfo;
  const mostWins = accolades.find(accolade => accolade.id === 'mostWins') as AccoladeInfo;
  const thursdayPoints = accolades.find(accolade => accolade.id === 'thursdayPoints') as AccoladeInfo;
  const thursdayWins = accolades.find(accolade => accolade.id === 'thursdayWins') as AccoladeInfo;
  const thursdayPointsRisked = accolades.find(accolade => accolade.id === 'thursdayPointsRisked') as AccoladeInfo;
  const thursdayEfficiency = accolades.find(accolade => accolade.id === 'thursdayEfficiency') as AccoladeInfo;
  const mondayPoints = accolades.find(accolade => accolade.id === 'mondayPoints') as AccoladeInfo;
  const mondayWins = accolades.find(accolade => accolade.id === 'mondayWins') as AccoladeInfo;
  const mondayPointsRisked = accolades.find(accolade => accolade.id === 'mondayPointsRisked') as AccoladeInfo;
  const mondayEfficiency = accolades.find(accolade => accolade.id === 'mondayEfficiency') as AccoladeInfo;
  const eagerPeople = accolades.find(accolade => accolade.id === 'eagerPeople') as AccoladeInfo;
  const loneWolf = accolades.find(accolade => accolade.id === 'loneWolf') as AccoladeInfo;
  const teamsAlwaysPicked = accolades.find(accolade => accolade.id === 'teamsAlwaysPicked') as AccoladeInfo;
  const teamsNeverPicked = accolades.find(accolade => accolade.id === 'teamsNeverPicked') as AccoladeInfo;
  const forgetfulPeople = accolades.find(accolade => accolade.id === 'forgetfulPeople') as AccoladeInfo;
  const leastEagerPeople = accolades.find(accolade => accolade.id === 'leastEagerPeople') as AccoladeInfo;
  const leastPointsInWeek = accolades.find(accolade => accolade.id === 'leastPointsInWeek') as AccoladeInfo;
  const loneLoser = accolades.find(accolade => accolade.id === 'loneLoser') as AccoladeInfo;
  const survivor = accolades.find(accolade => accolade.id === 'survivor') as AccoladeInfo;
  const marginPoints = accolades.find(accolade => accolade.id === 'marginPoints') as AccoladeInfo;
  const marginWins = accolades.find(accolade => accolade.id === 'marginWins') as AccoladeInfo;
  const highFivePoints = accolades.find(accolade => accolade.id === 'highFivePoints') as AccoladeInfo;
  const highFiveWins = accolades.find(accolade => accolade.id === 'highFiveWins') as AccoladeInfo;
  const teamsBestPicked = accolades.find(accolade => accolade.id === 'teamsBestPicked') as AccoladeInfo;
  const teamsWorstPicked = accolades.find(accolade => accolade.id === 'teamsWorstPicked') as AccoladeInfo;
  const secretMango = accolades.find(accolade => accolade.id === 'secretMango') as AccoladeInfo;
  const secretMurphy = accolades.find(accolade => accolade.id === 'secretMurphy') as AccoladeInfo;
  const mostIndecisive = accolades.find(accolade => accolade.id === 'indecisivePeople') as AccoladeInfo;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">
          A collection of awards, highlights, and lowlights from the 2024 season
        </h2>
        <br />
        <br />
        <h3 className="title is-1 has-text-centered">Confidence Awards</h3>
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
                {mostPoints.data.map((info: MostPointsData, index) => {
                  return (
                    <tr key={`${info.username}-mostWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.points}</b>
                      </td>
                      <td>{info.wins}</td>
                      <td>{info.losses}</td>
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
                {mostWins.data.map((info: MostPointsData, index) => {
                  return (
                    <tr key={`${info.username}-mostWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.wins}</b>
                      </td>
                      <td>{info.losses}</td>
                      <td>{info.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="title is-2 has-text-centered">Thursday Performance</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{thursdayPoints.title}</h2>
            <h3 className="subtitle has-text-centered">{thursdayPoints.description}</h3>
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
                {thursdayPoints.data.map((info: PointsData, index) => {
                  return (
                    <tr key={`${info.userId}-thursdayPoints`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.totalPoints}</b>
                      </td>
                      <td>{info.timesCorrect}</td>
                      <td>{info.timesIncorrect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{thursdayWins.title}</h2>
            <h3 className="subtitle has-text-centered">{thursdayWins.description}</h3>
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
                {thursdayWins.data.map((info: PointsData, index) => {
                  return (
                    <tr key={`${info.userId}-thursdayWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.timesCorrect}</b>
                      </td>
                      <td>{info.timesIncorrect}</td>
                      <td>{info.totalPoints}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{thursdayPointsRisked.title}</h2>
            <h3 className="subtitle has-text-centered">{thursdayPointsRisked.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>
                    Points
                    <br /> Risked
                  </th>
                  <th>Wins</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                {thursdayPointsRisked.data.map((info: PointsData, index) => {
                  return (
                    <tr key={`${info.userId}-thursdayPointsRisked`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.pointsRisked}</b>
                      </td>
                      <td>{info.timesCorrect}</td>
                      <td>{info.timesIncorrect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{thursdayEfficiency.title}</h2>
            <h3 className="subtitle has-text-centered">{thursdayEfficiency.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Efficiency</th>
                  <th>Points</th>
                  <th>
                    Points <br /> Risked
                  </th>
                </tr>
              </thead>
              <tbody>
                {thursdayEfficiency.data.map((info: PointsData, index) => {
                  return (
                    <tr key={`${info.userId}-thursdayEfficiency`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.efficiency}%</b>
                      </td>
                      <td>{info.totalPoints}</td>
                      <td>{info.pointsRisked}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="title is-2 has-text-centered">Monday Performance</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{mondayPoints.title}</h2>
            <h3 className="subtitle has-text-centered">{mondayPoints.description}</h3>
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
                {mondayPoints.data.map((info: PointsData, index) => {
                  return (
                    <tr key={`${info.userId}-mondayPoints`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.totalPoints}</b>
                      </td>
                      <td>{info.timesCorrect}</td>
                      <td>{info.timesIncorrect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{mondayWins.title}</h2>
            <h3 className="subtitle has-text-centered">{mondayWins.description}</h3>
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
                {mondayWins.data.map((info: PointsData, index) => {
                  return (
                    <tr key={`${info.userId}-mondayWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.timesCorrect}</b>
                      </td>
                      <td>{info.timesIncorrect}</td>
                      <td>{info.totalPoints}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{mondayPointsRisked.title}</h2>
            <h3 className="subtitle has-text-centered">{mondayPointsRisked.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>
                    Points
                    <br /> Risked
                  </th>
                  <th>Wins</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                {mondayPointsRisked.data.map((info: PointsData, index) => {
                  return (
                    <tr key={`${info.userId}-mondayPointsRisked`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.pointsRisked}</b>
                      </td>
                      <td>{info.timesCorrect}</td>
                      <td>{info.timesIncorrect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{mondayEfficiency.title}</h2>
            <h3 className="subtitle has-text-centered">{mondayEfficiency.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Efficiency</th>
                  <th>Points</th>
                  <th>
                    Points <br /> Risked
                  </th>
                </tr>
              </thead>
              <tbody>
                {mondayEfficiency.data.map((info: PointsData, index) => {
                  return (
                    <tr key={`${info.userId}-mondayEfficiency`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.efficiency}%</b>
                      </td>
                      <td>{info.totalPoints}</td>
                      <td>{info.pointsRisked}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="title is-1 has-text-centered">Survivor Award</h3>
        <h2 className="title has-text-centered">{survivor.title}</h2>
        <h3 className="subtitle has-text-centered">{survivor.description}</h3>
        <table className="table is-striped is-hoverable mx-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Weeks Survived</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {survivor.data.map((info: SurvivorData) => {
              return (
                <tr key={`${info.name}-survivor`}>
                  <td>{info.name}</td>
                  <td>{info.weeksSurvived}</td>
                  <td>{info.year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3 className="title is-1 has-text-centered">Margin Awards</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{marginPoints.title}</h2>
            <h3 className="subtitle has-text-centered">{marginPoints.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {marginPoints.data.map((info: MarginData, index) => {
                  return (
                    <tr key={`${info.firstName}-marginPoints`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.marginTotal}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{marginWins.title}</h2>
            <h3 className="subtitle has-text-centered">{marginWins.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Wins</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {marginWins.data.map((info: MarginData, index) => {
                  return (
                    <tr key={`${info.firstName}-${info.lastName}-marginWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.totalWins}</b>
                      </td>
                      <td>{info.marginTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="title is-1 has-text-centered">High Five Awards</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{highFivePoints.title}</h2>
            <h3 className="subtitle has-text-centered">{highFivePoints.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {highFivePoints.data.map((info: HighFiveData, index) => {
                  return (
                    <tr key={`${info.firstName}-${info.lastName}-highFivePoints`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.highFiveTotal}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{highFiveWins.title}</h2>
            <h3 className="subtitle has-text-centered">{highFiveWins.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Wins</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {highFiveWins.data.map((info: HighFiveData, index) => {
                  return (
                    <tr key={`${info.firstName}-${info.lastName}-highFiveWins`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.totalWins}</b>
                      </td>
                      <td>{info.highFiveTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="title is-1 has-text-centered">Random Awards</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{eagerPeople.title}</h2>
            <h3 className="subtitle has-text-centered">{eagerPeople.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Average Place</th>
                </tr>
              </thead>
              <tbody>
                {eagerPeople.data.map((info: EagerPeopleData, index) => {
                  return (
                    <tr key={`${info.userId}-eagerPeople`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>
                          {Math.round(info.average)}
                          <sup>{getEnding(Math.round(info.average))}</sup>
                        </b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{loneWolf.title}</h2>
            <h3 className="subtitle has-text-centered">{loneWolf.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {loneWolf.data.map((info: LoneWolfData, index) => {
                  return (
                    <tr key={`${info.userId}-loneWolf`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.description}</b>
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
            <h2 className="title has-text-centered">{teamsAlwaysPicked.title}</h2>
            <h3 className="subtitle has-text-centered">{teamsAlwaysPicked.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team</th>
                  <th>Times Picked</th>
                  <th>Picked By</th>
                </tr>
              </thead>
              <tbody>
                {teamsAlwaysPicked.data.map((info: TeamsPickedData, index) => {
                  return (
                    <tr key={`${info.name}-teamsAlwaysPicked`}>
                      <td>{index + 1}</td>
                      <td>{info.name}</td>
                      <td>
                        <b>{info.count}</b>
                      </td>
                      <td>{info.pickedBy.join(', ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{teamsNeverPicked.title}</h2>
            <h3 className="subtitle has-text-centered">{teamsNeverPicked.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team</th>
                  <th>Times Picked</th>
                  <th>Picked By</th>
                </tr>
              </thead>
              <tbody>
                {teamsNeverPicked.data.map((info: TeamsPickedData, index) => {
                  return (
                    <tr key={`${info.name}-teamsNeverPicked`}>
                      <td>{index + 1}</td>
                      <td>{info.name}</td>
                      <td>
                        <b>{info.count}</b>
                      </td>
                      <td>{info.pickedBy.join(', ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{teamsBestPicked.title}</h2>
            <h3 className="subtitle has-text-centered">{teamsBestPicked.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Teams</th>
                  <th>Record (W-L)</th>
                </tr>
              </thead>
              <tbody>
                {teamsBestPicked.data.map((info: BestPickedData, index) => {
                  return (
                    <tr key={`${info.firstName}-${info.lastName}-teamsBestPicked`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.team}</b>
                      </td>
                      <td>
                        ({info.timesCorrect}-{info.timesIncorrect})
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{mostIndecisive.title}</h2>
            <h3 className="subtitle has-text-centered">{mostIndecisive.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th># Picksheet Updates</th>
                </tr>
              </thead>
              <tbody>
                {mostIndecisive.data.map((info: MostIndecisiveData) => {
                  return (
                    <tr key={`${info.firstName}-${info.lastName}-mostIndecisive`}>
                      <td>
                        {info.firstName} {info.lastName}
                      </td>
                      <td>
                        <b>{info.timesUpdated} updates</b>
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
            <h2 className="title has-text-centered">{secretMango.title}</h2>
            <h3 className="subtitle has-text-centered">{secretMango.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Week</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {secretMango.data.map((info: SecretMangoData) => {
                  return (
                    <tr key={`${info.name}-secretMango`}>
                      <td>{info.name}</td>
                      <td>
                        <b>{info.week}</b>
                      </td>
                      <td>{info.year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{secretMurphy.title}</h2>
            <h3 className="subtitle has-text-centered">{secretMurphy.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Week</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {secretMurphy.data.map((info: SecretMurphyData) => {
                  return (
                    <tr key={`${info.name}-secretMurphy`}>
                      <td>{info.name}</td>
                      <td>
                        <b>{info.week}</b>
                      </td>
                      <td>{info.year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="title is-1 has-text-centered">Lowlights from 2023</h3>
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">{forgetfulPeople.title}</h2>
            <h3 className="subtitle has-text-centered">{forgetfulPeople.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Times Forgotten</th>
                </tr>
              </thead>
              <tbody>
                {forgetfulPeople.data.map((info: ForgetfulPeopleData, index) => {
                  return (
                    <tr key={`${info.userId}-forgetfulPeople`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.timesForgotten}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{leastEagerPeople.title}</h2>
            <h3 className="subtitle has-text-centered">{leastEagerPeople.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Average Place</th>
                </tr>
              </thead>
              <tbody>
                {leastEagerPeople.data.map((info: EagerPeopleData, index) => {
                  return (
                    <tr key={`${info.userId}-leastEagerPeople`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>
                          {Math.round(info.average)}
                          <sup>{getEnding(Math.round(info.average))}</sup>
                        </b>
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
            <h2 className="title has-text-centered">{loneLoser.title}</h2>
            <h3 className="subtitle has-text-centered">{loneLoser.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {loneLoser.data.map((info: LoneWolfData, index) => {
                  return (
                    <tr key={`${info.userId}-loneLoser-${index}`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.description}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title has-text-centered">{leastPointsInWeek.title}</h2>
            <h3 className="subtitle has-text-centered">{leastPointsInWeek.description}</h3>
            <table className="table is-striped is-hoverable mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Week</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {leastPointsInWeek.data.map((info: WinsInWeekData, index) => {
                  return (
                    <tr key={`${info.id}-leastPointsInWeek-${index}`}>
                      <td>{index + 1}</td>
                      <td>{`${info.firstName} ${info.lastName}`}</td>
                      <td>
                        <b>{info.points}</b>
                      </td>
                      <td>{info.week}</td>
                      <td>{info.year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <h2 className="title has-text-centered">{teamsWorstPicked.title}</h2>
        <h3 className="subtitle has-text-centered">{teamsWorstPicked.description}</h3>
        <table className="table is-striped is-hoverable mx-auto">
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Teams</th>
              <th>Record (W-L)</th>
            </tr>
          </thead>
          <tbody>
            {teamsWorstPicked.data.map((info: BestPickedData, index) => {
              return (
                <tr key={`${info.firstName}-${info.lastName}-teamsWorstPicked-${index}`}>
                  <td>{index + 1}</td>
                  <td>{`${info.firstName} ${info.lastName}`}</td>
                  <td>
                    <b>{info.team}</b>
                  </td>
                  <td>
                    ({info.timesCorrect}-{info.timesIncorrect})
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default YearlyAwards;
