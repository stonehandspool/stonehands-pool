import {
  CURRENT_WEEK,
  CURRENT_WEEK_CUTOFF_TIME,
  CURRENT_WEEK_STATUS,
  SEASON_READY,
  SubmissionInfo,
} from "../../../constants";
import * as playerPicks from "../../../../data/2023/weeklyPicks.json";
import * as seasonData from "../../../../data/2023/season.json";
import * as TeamLogos from "../../../assets/logos";

interface MatchupConsensusInfo {
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
}

function ConfidenceWeeklyConsensusTable() {
  // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
  // can't see what people have chosen prior to the cutoff happening
  const currentTime = new Date();
  const showCurrentWeek =
    CURRENT_WEEK_STATUS !== "START" && currentTime > CURRENT_WEEK_CUTOFF_TIME;
  const weekToShow = showCurrentWeek ? CURRENT_WEEK : CURRENT_WEEK - 1;

  if (!SEASON_READY || (CURRENT_WEEK === 1 && !showCurrentWeek)) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, there is no data to show yet. This will update after the 1pm
            cutoff.
          </h3>
        </div>
      </section>
    );
  }

  const weeklyConsensusArr: MatchupConsensusInfo[] = [];
  const allWeeks = seasonData.weeks;
  const weekField = `week_${weekToShow}`;
  const weekPicks: SubmissionInfo[] = playerPicks.weeklyPicks[
    weekField as keyof typeof playerPicks.weeklyPicks
  ] as unknown as SubmissionInfo[];
  const weekGames = allWeeks[weekField as keyof typeof allWeeks];

  // First set up the initial values for the consensus info
  Object.keys(weekGames).map((key) => {
    const matchup = weekGames[key as keyof typeof weekGames];
    weeklyConsensusArr.push({
      homeTeam: matchup.home_team,
      homeNumPicks: 0,
      homePercent: "0",
      homePoints: 0,
      homePointsAvg: 0,
      awayTeam: matchup.away_team,
      awayNumPicks: 0,
      awayPercent: "0",
      awayPoints: 0,
      awayPointsAvg: 0,
    });
  });

  // Now go through every players response and update the consensus info
  const numGames = Object.keys(weekGames).length;
  weekPicks.forEach((pickInfo) => {
    const { submission_data: picks } = pickInfo;
    for (let i = 0; i < numGames; i++) {
      const consensusInfo = weeklyConsensusArr[i];
      const userChoice = picks[`matchup-${i}` as keyof typeof picks] as string;
      const userConfidence = parseInt(
        picks[`matchup-${i}-confidence` as keyof typeof picks] as string,
        10,
      );
      if (userChoice === consensusInfo.homeTeam) {
        consensusInfo.homeNumPicks++;
        consensusInfo.homePoints += userConfidence;
      } else {
        consensusInfo.awayNumPicks++;
        consensusInfo.awayPoints += userConfidence;
      }
    }
  });

  // Now calculate the percent and avg
  weeklyConsensusArr.forEach((consensusInfo) => {
    // Odds are there will always be at least one person picking a team, but just in case have this check
    if (consensusInfo.homeNumPicks > 0) {
      consensusInfo.homePointsAvg =
        Math.trunc(
          (consensusInfo.homePoints / consensusInfo.homeNumPicks) *
            Math.pow(10, 2),
        ) / Math.pow(10, 2);
    } else {
      // If no one picked the home team, set the percents here
      consensusInfo.homePercent = "0%";
      consensusInfo.awayPercent = "100%";
    }
    if (consensusInfo.awayNumPicks > 0) {
      consensusInfo.awayPointsAvg =
        Math.trunc(
          (consensusInfo.awayPoints / consensusInfo.awayNumPicks) *
            Math.pow(10, 2),
        ) / Math.pow(10, 2);
    } else {
      consensusInfo.homePercent = "100%";
      consensusInfo.awayPercent = "0%";
    }

    if (consensusInfo.homeNumPicks > 0 && consensusInfo.awayNumPicks > 0) {
      const totalPicks =
        consensusInfo.homeNumPicks + consensusInfo.awayNumPicks;
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
          {weeklyConsensusArr.map((info) => {
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
          {weeklyConsensusArr.map((info) => (
            <td key={`${info.awayTeam}-weekly-numPicks`}>
              {info.awayNumPicks}
            </td>
          ))}
        </tr>
        <tr>
          <td>Percent</td>
          {weeklyConsensusArr.map((info) => (
            <td key={`${info.awayTeam}-weekly-percent`}>{info.awayPercent}</td>
          ))}
        </tr>
        <tr>
          <td>Points</td>
          {weeklyConsensusArr.map((info) => (
            <td key={`${info.awayTeam}-weekly-points`}>{info.awayPoints}</td>
          ))}
        </tr>
        <tr>
          <td>Avg. Points</td>
          {weeklyConsensusArr.map((info) => (
            <td key={`${info.awayTeam}-weekly-pointsAvg`}>
              {info.awayPointsAvg}
            </td>
          ))}
        </tr>
        <tr>
          <td className="is-vcentered">
            <b>Home</b>
          </td>
          {weeklyConsensusArr.map((info) => {
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
          {weeklyConsensusArr.map((info) => (
            <td key={`${info.homeTeam}-weekly-numPicks`}>
              {info.homeNumPicks}
            </td>
          ))}
        </tr>
        <tr>
          <td>Percent</td>
          {weeklyConsensusArr.map((info) => (
            <td key={`${info.homeTeam}-weekly-percent`}>{info.homePercent}</td>
          ))}
        </tr>
        <tr>
          <td>Points</td>
          {weeklyConsensusArr.map((info) => (
            <td key={`${info.homeTeam}-weekly-points`}>{info.homePoints}</td>
          ))}
        </tr>
        <tr>
          <td>Avg. Points</td>
          {weeklyConsensusArr.map((info) => (
            <td key={`${info.homeTeam}-weekly-pointsAvg`}>
              {info.homePointsAvg}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default ConfidenceWeeklyConsensusTable;
