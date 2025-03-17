import { MARCH_MADNESS_CURRENT_ROUND } from '../../constants';
import matchups from '../../../data/2025/marchmadness/matchups.json';
import playerPicks from '../../../data/2025/marchmadness/playerPicks.json';

interface MatchupConsensusInfo {
  topTeam: string;
  topNumPicks: number;
  topPercent: string;
  bottomTeam: string;
  bottomNumPicks: number;
  bottomPercent: string;
  matchupId: string;
  matchupTotalParticipants: number;
  numTimeDifferentTeamChosen: number;
  differentTeamPercent: string;
}

interface MarchMadnessConsensusReportProps {
  round: number;
}

const regions = ['WEST', 'EAST', 'SOUTH', 'MIDWEST'];
const regionsF4 = ['Final Four Game #1', 'Final Four Game #2'];
const regionsFinals = ['Finals'];
const gamesPerRound = [8, 4, 2, 1, 1, 1];

function MarchMadnessConsensusReport(props: MarchMadnessConsensusReportProps) {
  const { round } = props;

  let regionsToShow;
  if (round === 6) {
    regionsToShow = regionsFinals;
  } else if (round === 5) {
    regionsToShow = regionsF4;
  } else {
    regionsToShow = regions;
  }

  if (round > MARCH_MADNESS_CURRENT_ROUND) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, we haven't made it that far in the tournament. Please check back later
          </h3>
        </div>
      </section>
    );
  }

  const matchupsInRound = matchups.filter(matchup => matchup.round === round);
  const consensusArr: MatchupConsensusInfo[] = [];
  const gamesPerTable = gamesPerRound[round - 1];

  // First set up the initial values for the consensus info
  // TODO: Remove this any and find a better solution for next year
  matchupsInRound.forEach((matchup: any) => {
    consensusArr.push({
      topTeam: matchup.topTeam.name,
      topNumPicks: 0,
      topPercent: '0',
      bottomTeam: matchup.bottomTeam.name,
      bottomNumPicks: 0,
      bottomPercent: '0',
      matchupId: matchup.id,
      matchupTotalParticipants: 0,
      numTimeDifferentTeamChosen: 0,
      differentTeamPercent: '0',
    });
  });

  // Now go through every players response and update the consensus info
  playerPicks.forEach(playerInfo => {
    const { userPicks } = playerInfo;
    consensusArr.forEach(matchup => {
      // TODO: same as above
      const userMatchInfo = (userPicks as any).find((pick: any) => pick.id === matchup.matchupId)!;
      const userWinner = userMatchInfo.winner === 'top' ? userMatchInfo.topTeam.name : userMatchInfo.bottomTeam.name;
      if (userWinner === matchup.topTeam) {
        matchup.topNumPicks++;
        matchup.matchupTotalParticipants++;
      } else if (userWinner === matchup.bottomTeam) {
        matchup.bottomNumPicks++;
        matchup.matchupTotalParticipants++;
      } else {
        matchup.numTimeDifferentTeamChosen++;
      }
    });
  });

  // Now calculate the percent and avg
  consensusArr.forEach(matchupInfo => {
    matchupInfo.topPercent = `${((matchupInfo.topNumPicks / matchupInfo.matchupTotalParticipants) * 100).toFixed(1)}%`;
    matchupInfo.bottomPercent = `${((matchupInfo.bottomNumPicks / matchupInfo.matchupTotalParticipants) * 100).toFixed(1)}%`;
    matchupInfo.differentTeamPercent = `${((matchupInfo.numTimeDifferentTeamChosen / playerPicks.length) * 100).toFixed(1)}%`;
  });

  return (
    <section className="section">
      {regionsToShow.map((region, index) => {
        return (
          <div className="section" key={`table-holder${index}`}>
            <h1 className="title is-1 has-text-centered">{region}</h1>
            {
              <table className="table is-hoverable has-text-centered mx-auto">
                <tbody>
                  <tr>
                    <td className="is-vcentered">
                      <b>Team #1</b>
                    </td>
                    {consensusArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                      return <td key={`${info.topTeam}-name`}>{info.topTeam}</td>;
                    })}
                  </tr>
                  <tr>
                    <td># Times Chosen</td>
                    {consensusArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                      return <td key={`${info.topTeam}-times-chosen`}>{info.topNumPicks}</td>;
                    })}
                  </tr>
                  <tr>
                    <td>Percent</td>
                    {consensusArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                      return <td key={`${info.topTeam}-percent`}>{info.topPercent}</td>;
                    })}
                  </tr>
                  <tr>
                    <td className="is-vcentered">
                      <b>Team #2</b>
                    </td>
                    {consensusArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                      return <td key={`${info.bottomTeam}-name`}>{info.bottomTeam}</td>;
                    })}
                  </tr>
                  <tr>
                    <td># Times Chosen</td>
                    {consensusArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                      return <td key={`${info.bottomTeam}-times-chosen`}>{info.bottomNumPicks}</td>;
                    })}
                  </tr>
                  <tr>
                    <td>Percent</td>
                    {consensusArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                      return <td key={`${info.bottomTeam}-percent`}>{info.bottomPercent}</td>;
                    })}
                  </tr>
                  {round > 1 && (
                    <tr>
                      <td>
                        <b># Brackets w/ Different Winner</b>
                      </td>
                      {consensusArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                        return <td key={`${info.matchupId}-other`}>{info.numTimeDifferentTeamChosen}</td>;
                      })}
                    </tr>
                  )}
                  {round > 1 && (
                    <tr>
                      <td>
                        <b>% Pool w/ Different Winner</b>
                      </td>
                      {consensusArr.slice(gamesPerTable * index, gamesPerTable * index + gamesPerTable).map(info => {
                        return <td key={`${info.matchupId}-percent`}>{info.differentTeamPercent}</td>;
                      })}
                    </tr>
                  )}
                </tbody>
              </table>
            }
          </div>
        );
      })}
    </section>
  );
}

export default MarchMadnessConsensusReport;
