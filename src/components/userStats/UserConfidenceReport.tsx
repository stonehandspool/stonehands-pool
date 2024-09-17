import { DatabaseData } from '../../constants';
import UserConfidencePicksTable from './UserConfidencePicksTable';

import * as TeamLogos from '../../assets/logos';
import teamData from '../../../data/2024/football/teams.json';

type TeamInfo = {
  team: string;
  wins: number;
  losses: number;
  ties: number;
  timesCorrect: number;
  timesIncorrect: number;
};

type UserConfidenceReportProps = {
  userPicks: DatabaseData[];
  teamsByPicks: TeamInfo[];
  pointsByWeek: number[];
};

function getProgressBarColor(percent: number) {
  if (percent >= 0.8) {
    return 'is-success';
  } else if (percent > 0.4) {
    return 'is-warning';
  } else {
    return 'is-danger';
  }
}

function UserConfidenceReport(props: UserConfidenceReportProps) {
  const { userPicks, teamsByPicks, pointsByWeek } = props;
  return (
    <div className="container">
      <h4 className="title is-4">Confidence Picks by Week:</h4>
      <UserConfidencePicksTable confidencePicks={userPicks} pointsByWeek={pointsByWeek} />
      <h4 className="title is-4">Picks by Team:</h4>
      <div className="columns is-vcentered">
        <div className="column is-1">
          <h6 className="title is-6 has-text-centered">Team</h6>
        </div>
        <div className="column is-half">
          <h6 className="title is-6 has-text-centered">Percentage of weeks picked to win</h6>
        </div>
        <div className="column is-1"></div>
        <div className="column is-1">
          <h6 className="title is-6 has-text-centered">Projected Record</h6>
        </div>
        <div className="column is-1">
          <h6 className="title is-6 has-text-centered">Actual Record</h6>
        </div>
        <div className="column is-1">
          <h6 className="title is-6 has-text-centered">Times Correct</h6>
        </div>
        <div className="column is-1">
          <h6 className="title is-6 has-text-centered">Times Incorrect</h6>
        </div>
        <div className="column is-1">
          <h6 className="title is-6 has-text-centered">Accuracy</h6>
        </div>
      </div>
      {teamsByPicks.map((key: any, index: number) => {
        const { team, wins, ties, losses, timesCorrect, timesIncorrect } = teamsByPicks[index];
        const { wins: teamWins, ties: teamTies, losses: teamLosses } = teamData.find(t => t.teamCode === team)!;
        const Logo = TeamLogos[team as keyof typeof TeamLogos];
        const percentage = ((wins + ties / 2) / (wins + ties + losses)) * 100;
        const accuracy = (timesCorrect / (timesCorrect + timesIncorrect)) * 100;
        return (
          <div className="columns is-vcentered" key={`${key.team}`}>
            <div className="column is-1 has-text-centered">
              <Logo />
            </div>
            <div className="column is-half">
              <progress
                className={`progress ${getProgressBarColor((wins + ties / 2) / (wins + ties + losses))}`}
                value={wins + ties / 2}
                max={wins + ties + losses}
              >
                {percentage}
              </progress>
            </div>
            <div className="column is-1">
              <h6 className="title is-6">{Math.round(percentage * 100) / 100}%</h6>
            </div>
            <div className="column is-1">
              <h6 className="title is-6 has-text-centered">
                {wins}-{losses}-{ties}
              </h6>
            </div>
            <div className="column is-1">
              <h6 className="title is-6 has-text-centered">
                {teamWins}-{teamLosses}-{teamTies}
              </h6>
            </div>
            <div className="column is-1">
              <h6 className="title is-6 has-text-centered">{timesCorrect}</h6>
            </div>
            <div className="column is-1">
              <h6 className="title is-6 has-text-centered">{timesIncorrect}</h6>
            </div>
            <div className="column is-1">
              <h6 className="title is-6 has-text-centered">{+accuracy.toFixed(2)}%</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserConfidenceReport;
