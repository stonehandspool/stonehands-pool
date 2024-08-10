import { CURRENT_WEEK, SEASON_READY, DatabaseData, MatchupInfo } from '../../../constants';
import seasonData from '../../../../data/2024/football/season.json';
import * as TeamLogos from '../../../assets/logos';

type MatchupConsensusInfo = {
  homeTeam: string;
  homeNumPicks: number;
  homePercent: string;
  awayTeam: string;
  awayNumPicks: number;
  awayPercent: string;
};

type HighFiveConsensusTableProps = {
  weeklyPicks: DatabaseData[];
  showCurrentWeek: boolean;
  weekToShow: number;
};

function HighFiveConsensusTable(props: HighFiveConsensusTableProps) {
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
  const weekGames: MatchupInfo[] = seasonData.find(week => week.weekId === `week_${weekToShow}`)!.matchups;

  // First set up the initial values for the consensus info
  weekGames.forEach(matchup => {
    weeklyConsensusArr.push({
      homeTeam: matchup.homeTeam,
      homeNumPicks: 0,
      homePercent: '0',
      awayTeam: matchup.awayTeam,
      awayNumPicks: 0,
      awayPercent: '0',
    });
  });

  // Now go through every players response and update the consensus info
  let totalPicks = 0;
  weeklyPicks.forEach(pickInfo => {
    const { submission_data: picks } = pickInfo;
    for (let i = 0; i < weekGames.length; i++) {
      const consensusInfo = weeklyConsensusArr[i];
      const userChoices = picks.highFivePicks;
      if (userChoices.includes(consensusInfo.homeTeam)) {
        consensusInfo.homeNumPicks++;
        totalPicks++;
      } else if (userChoices.includes(consensusInfo.awayTeam)) {
        consensusInfo.awayNumPicks++;
        totalPicks++;
      }
    }
  });

  // Now calculate the percent
  weeklyConsensusArr.forEach(consensusInfo => {
    consensusInfo.homePercent =
      consensusInfo.homeNumPicks > 0 ? `${((consensusInfo.homeNumPicks / totalPicks) * 100).toFixed(1)}%` : '0%';
    consensusInfo.awayPercent =
      consensusInfo.awayNumPicks > 0 ? `${((consensusInfo.awayNumPicks / totalPicks) * 100).toFixed(1)}%` : '0%';
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
              <td key={info.awayTeam}>
                <Logo size={45} />
              </td>
            );
          })}
        </tr>
        <tr>
          <td># Times Chosen</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.awayTeam}-numPicks`}>{info.awayNumPicks}</td>
          ))}
        </tr>
        <tr>
          <td>Percent of Pool</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.awayTeam}-percent`}>{info.awayPercent}</td>
          ))}
        </tr>
        <tr>
          <td className="is-vcentered">
            <b>Home</b>
          </td>
          {weeklyConsensusArr.map(info => {
            const Logo = TeamLogos[info.homeTeam as keyof typeof TeamLogos];
            return (
              <td key={info.homeTeam}>
                <Logo size={45} />
              </td>
            );
          })}
        </tr>
        <tr>
          <td># Times Chosen</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.homeTeam}-numPicks`}>{info.homeNumPicks}</td>
          ))}
        </tr>
        <tr>
          <td>Percent of Pool</td>
          {weeklyConsensusArr.map(info => (
            <td key={`${info.homeTeam}-percent`}>{info.homePercent}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default HighFiveConsensusTable;
