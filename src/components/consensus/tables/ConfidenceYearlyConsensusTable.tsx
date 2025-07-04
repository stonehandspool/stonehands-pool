import { CURRENT_WEEK, SEASON_READY, DatabaseData, MatchupInfo } from '../../../constants';
import seasonData from '../../../../data/2025/football/season.json';
import * as TeamLogos from '../../../assets/logos';
import { TEAM_CODES } from '../../../constants';
import { useWeeklyPick } from '../../../utils/useWeeklyPicks';

type YearlyConsensusInfo = {
  teamName: string;
  numTimesPicked: number;
  numTimesOppPicked: number;
  pickDiff: number;
  percent: string;
  pointsFor: number;
  pointsAgainst: number;
  pointDiff: number;
};

type ConfidenceYearlyConsensusTableProps = {
  showCurrentWeek: boolean;
  weekToShow: number;
};

function ConfidenceYearlyConsensusTable(props: ConfidenceYearlyConsensusTableProps) {
  const { showCurrentWeek, weekToShow } = props;

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

  const weeklyPicks = useWeeklyPick(1, weekToShow === 1 ? undefined : weekToShow);
  const allWeekData = weeklyPicks.length > 0 ? weeklyPicks : [];

  // If it hasn't loaded all of the data yet, then just return nothing
  if (allWeekData.length === 0) {
    return <></>;
  }

  const yearlyConsensusArr: YearlyConsensusInfo[] = [];

  // First set up the initial values for the consensus info
  TEAM_CODES.forEach(teamCode => {
    yearlyConsensusArr.push({
      teamName: teamCode,
      numTimesPicked: 0,
      numTimesOppPicked: 0,
      pickDiff: 0,
      percent: '',
      pointsFor: 0,
      pointsAgainst: 0,
      pointDiff: 0,
    });
  });

  // Now loop through every week that has been played so far
  for (let i = 0; i < weekToShow; i++) {
    const weekPicks: DatabaseData[] = allWeekData.find(weekData => weekData.id === `week_${i + 1}`)!.picks;
    const weekGames: MatchupInfo[] = seasonData.find(weekInfo => weekInfo.weekId === `week_${i + 1}`)!.matchups;

    // Now loop through every players response and update the consensus info
    weekPicks.forEach(pickInfo => {
      const { submission_data: picks } = pickInfo;
      weekGames.forEach((matchupInfo, index) => {
        const { homeTeam, awayTeam } = matchupInfo;
        const { team, confidence } = picks.confidencePicks.find(p => p.matchupId === `matchup_${index + 1}`)!;
        const homeTeamConsensusInfo = yearlyConsensusArr.find(info => info.teamName === homeTeam);
        const awayTeamConsensusInfo = yearlyConsensusArr.find(info => info.teamName === awayTeam);

        if (homeTeamConsensusInfo !== undefined && awayTeamConsensusInfo !== undefined) {
          if (team === homeTeam) {
            homeTeamConsensusInfo.numTimesPicked++;
            homeTeamConsensusInfo.pointsFor += confidence as number;
            awayTeamConsensusInfo.numTimesOppPicked++;
            awayTeamConsensusInfo.pointsAgainst += confidence as number;
          } else {
            homeTeamConsensusInfo.numTimesOppPicked++;
            homeTeamConsensusInfo.pointsAgainst += confidence as number;
            awayTeamConsensusInfo.numTimesPicked++;
            awayTeamConsensusInfo.pointsFor += confidence as number;
          }
        }
      });
    });
  }

  // Now calculate the percent and avg
  yearlyConsensusArr.forEach(consensusInfo => {
    if (consensusInfo.numTimesPicked === 0) {
      consensusInfo.percent = '0%';
      consensusInfo.pickDiff = -consensusInfo.numTimesOppPicked;
      consensusInfo.pointDiff = -consensusInfo.pointsAgainst;
    } else {
      const totalPicks = consensusInfo.numTimesPicked + consensusInfo.numTimesOppPicked;
      consensusInfo.percent = `${((consensusInfo.numTimesPicked / totalPicks) * 100).toFixed(1)}%`;
      consensusInfo.pickDiff = consensusInfo.numTimesPicked - consensusInfo.numTimesOppPicked;
      consensusInfo.pointDiff = consensusInfo.pointsFor - consensusInfo.pointsAgainst;
    }
  });

  return (
    <table className="table is-hoverable has-text-centered">
      <thead>
        <tr>
          <th className="is-vcentered">Team</th>
          <th className="has-text-centered">
            <abbr title="Number of Times Picked"></abbr># Times <br /> Picked
          </th>
          <th className="has-text-centered">
            <abbr title="Number of Times Opponent was Picked"></abbr># Times <br /> Opponent Picked
          </th>
          <th className="is-vcentered">
            <abbr title="Pick Differential (Num Times Picked - Num Opp. Picked)"></abbr>
            Difference
          </th>
          <th className="is-vcentered">Percent</th>
          <th className="is-vcentered">
            <abbr title="Cumulative Points from all times picked"></abbr>Points For
          </th>
          <th className="is-vcentered">
            <abbr title="Cumulative Points from all times opponent was picked"></abbr>
            Points Against
          </th>
          <th className="has-text-centered">
            <abbr title="Point Differential (Points For - Points Against)"></abbr>
            Point <br /> Difference
          </th>
        </tr>
      </thead>
      <tbody>
        {yearlyConsensusArr.map((info, index) => {
          return (
            <tr key={`row-${index}`}>
              {Object.keys(info).map((key, index) => {
                if (index === 0) {
                  const Logo = TeamLogos[info.teamName as keyof typeof TeamLogos];
                  return (
                    <td key={`${info.teamName}-yearly`} className="is-vcentered">
                      <Logo size={45} />
                    </td>
                  );
                } else {
                  return (
                    <td key={`${info.teamName}-${key}`} className="is-vcentered">
                      {info[key as keyof typeof info]}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ConfidenceYearlyConsensusTable;
