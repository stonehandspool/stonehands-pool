import { CURRENT_WEEK, SEASON_READY, DatabaseData, MatchupInfo } from '../../../constants';
import seasonData from '../../../../data/2025/football/season.json';
import * as TeamLogos from '../../../assets/logos';

type MatchupConsensusInfo = {
  homeTeam: string;
  homeNumPicks: number;
  homePercent: string;
  homePoints: number;
  homePointsAvg: number;
  awayTeam: string;
  awayNumPicks: number;
  awayPercent: string;
  awayPoints: number;
  awayPointsAvg: number;
};

type ConfidenceWeeklyConsensusTableProps = {
  weeklyPicks: DatabaseData[];
  showCurrentWeek: boolean;
  weekToShow: number;
};

function ConfidenceWeeklyConsensusTable(props: ConfidenceWeeklyConsensusTableProps) {
  const { weeklyPicks, showCurrentWeek, weekToShow } = props;

  if (!SEASON_READY || (CURRENT_WEEK === 1 && !showCurrentWeek)) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, there is no data to show yet. This will update after the 1pm cutoff.
          </h3>
        </div>
      </section>
    );
  }

  const weeklyConsensusArr: MatchupConsensusInfo[] = [];
  const weeksGames: MatchupInfo[] = seasonData.find(weeks => weeks.weekId === `week_${weekToShow}`)!.matchups;

  // First set up the initial values for the consensus info
  weeksGames.forEach(matchInfo => {
    weeklyConsensusArr.push({
      homeTeam: matchInfo.homeTeam,
      homeNumPicks: 0,
      homePercent: '0',
      homePoints: 0,
      homePointsAvg: 0,
      awayTeam: matchInfo.awayTeam,
      awayNumPicks: 0,
      awayPercent: '0',
      awayPoints: 0,
      awayPointsAvg: 0,
    });
  });

  // Now go through every players response and update the consensus info
  weeklyPicks.forEach(pickInfo => {
    const { submission_data: picks } = pickInfo;
    for (let i = 0; i < weeksGames.length; i++) {
      const consensusInfo = weeklyConsensusArr[i];
      const { team, confidence } = picks.confidencePicks.find(p => p.matchupId === `matchup_${i + 1}`)!;
      if (team === consensusInfo.homeTeam) {
        consensusInfo.homeNumPicks++;
        consensusInfo.homePoints += confidence as number;
      } else {
        consensusInfo.awayNumPicks++;
        consensusInfo.awayPoints += confidence as number;
      }
    }
  });

  // Now calculate the percent and avg
  weeklyConsensusArr.forEach(consensusInfo => {
    // Odds are there will always be at least one person picking a team, but just in case have this check
    if (consensusInfo.homeNumPicks > 0) {
      consensusInfo.homePointsAvg =
        Math.trunc((consensusInfo.homePoints / consensusInfo.homeNumPicks) * Math.pow(10, 2)) / Math.pow(10, 2);
    } else {
      // If no one picked the home team, set the percents here
      consensusInfo.homePercent = '0%';
      consensusInfo.awayPercent = '100%';
    }
    if (consensusInfo.awayNumPicks > 0) {
      consensusInfo.awayPointsAvg =
        Math.trunc((consensusInfo.awayPoints / consensusInfo.awayNumPicks) * Math.pow(10, 2)) / Math.pow(10, 2);
    } else {
      consensusInfo.homePercent = '100%';
      consensusInfo.awayPercent = '0%';
    }

    if (consensusInfo.homeNumPicks > 0 && consensusInfo.awayNumPicks > 0) {
      const totalPicks = consensusInfo.homeNumPicks + consensusInfo.awayNumPicks;
      consensusInfo.homePercent = `${((consensusInfo.homeNumPicks / totalPicks) * 100).toFixed(1)}%`;
      consensusInfo.awayPercent = `${((consensusInfo.awayNumPicks / totalPicks) * 100).toFixed(1)}%`;
    }
  });

  return (
    <table className="table is-hoverable has-text-centered">
      <tbody>
        <tr>
          <td className="is-vcentered">
            <b>Away</b>
          </td>
          {weeklyConsensusArr.map(info => {
            const Logo = TeamLogos[info.awayTeam as keyof typeof TeamLogos];
            return (
              <td key={`${info.awayTeam}-weekly`}>
                <Logo size={45} />
              </td>
            );
          })}
        </tr>
        <tr>
          <td># Times Chosen</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.awayTeam}-weekly-numPicks`}>{info.awayNumPicks}</td>
          ))}
        </tr>
        <tr>
          <td>Percent</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.awayTeam}-weekly-percent`}>{info.awayPercent}</td>
          ))}
        </tr>
        <tr>
          <td>Points</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.awayTeam}-weekly-points`}>{info.awayPoints}</td>
          ))}
        </tr>
        <tr>
          <td>Avg. Points</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.awayTeam}-weekly-pointsAvg`}>{info.awayPointsAvg}</td>
          ))}
        </tr>
        <tr>
          <td className="is-vcentered">
            <b>Home</b>
          </td>
          {weeklyConsensusArr.map(info => {
            const Logo = TeamLogos[info.homeTeam as keyof typeof TeamLogos];
            return (
              <td key={`${info.homeTeam}-weekly`}>
                <Logo size={45} />
              </td>
            );
          })}
        </tr>
        <tr>
          <td># Times Chosen</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.homeTeam}-weekly-numPicks`}>{info.homeNumPicks}</td>
          ))}
        </tr>
        <tr>
          <td>Percent</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.homeTeam}-weekly-percent`}>{info.homePercent}</td>
          ))}
        </tr>
        <tr>
          <td>Points</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.homeTeam}-weekly-points`}>{info.homePoints}</td>
          ))}
        </tr>
        <tr>
          <td>Avg. Points</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.homeTeam}-weekly-pointsAvg`}>{info.homePointsAvg}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default ConfidenceWeeklyConsensusTable;
