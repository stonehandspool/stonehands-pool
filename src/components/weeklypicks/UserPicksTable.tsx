import { useEffect, useRef, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import { ConfidenceMatchupInfo, CURRENT_WEEK, PicksheetData } from '../../constants';
import { useWeeklyPick } from '../../utils/useWeeklyPicks';

import teamData from '../../../data/2024/football/teams.json';
import supabaseClient from '../../config/supabaseClient';
import { TABLE_NAMES } from '../../config/supabaseConfig';

type UserPicksTableProps = {
  session: Session;
};

function UserPicksTable(props: UserPicksTableProps) {
  const { session } = props;
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const userId = session?.user.id;

  // Get the users picks via the navigate hook
  const weeklyPicks = useWeeklyPick(CURRENT_WEEK);
  const [currentWeekPicks, setCurrentWeekPicks] = useState<PicksheetData>();

  // Ping the database to see if there are picks from this week for this user
  useEffect(() => {
    const fetchPicks = async () => {
      const { data, error } = await supabaseClient
        .from(TABLE_NAMES.USER_PICKS)
        .select()
        .eq('week', CURRENT_WEEK)
        .eq('user_id', userId);

      if (error) {
        console.error('An error occurred when getting your prior picks from the database', error);
      }

      if (data && data.length > 0) {
        const priorPicks = data[0].submission_data as PicksheetData;
        setCurrentWeekPicks(priorPicks);
      }
      setDataFetched(true);
    };
    // First, check the database since that is the most up-to-date version most of the time
    fetchPicks().catch(err => {
      console.error(err);
      setDataFetched(true);
    });
  }, []);

  useEffect(() => {
    if (dataFetched && !currentWeekPicks && weeklyPicks && weeklyPicks.length > 0) {
      const userData = weeklyPicks[0].picks.find(pickData => pickData.user_id === userId);
      if (userData) {
        setCurrentWeekPicks(userData.submission_data);
      }
    }
  }, [weeklyPicks, dataFetched]);

  if (!currentWeekPicks) {
    return <></>;
  }

  const { firstName, lastName, confidencePicks, tiebreaker, survivorPick, marginPick, highFivePicks } =
    currentWeekPicks;

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-three-quarters">
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

export default UserPicksTable;
