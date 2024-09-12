import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import { ConfidenceMatchupInfo, CURRENT_WEEK, DatabaseData } from '../constants';
import { useWeeklyPick } from '../utils/useWeeklyPicks';
import supabaseClient from '../config/supabaseClient';
import PickSheetLogin from '../components/picksheet/PickSheetLogin';

import teamData from '../../data/2024/football/teams.json';

function UserPicks() {
  // Get the users picks via the navigate hook
  const weeklyPicks = useWeeklyPick(CURRENT_WEEK);
  const [currentWeekPicks, setCurrentWeekPicks] = useState<DatabaseData[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (weeklyPicks && weeklyPicks.length > 0) {
      setCurrentWeekPicks(weeklyPicks[0].picks);
    }
  }, [weeklyPicks]);

  if (!session) {
    return <PickSheetLogin />;
  }

  const userId = session?.user.id;
  console.log('userId', userId);
  console.log('currentWeekPicks', currentWeekPicks);
  const userData = currentWeekPicks?.find(pickData => pickData.user_id === userId);
  const userPicks = userData?.submission_data;

  if (!userPicks) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, your picks weren't found. If you forgot to make your picks this week then something will show up once
            the site is updated.
          </h3>
        </div>
      </section>
    );
  }

  const { firstName, lastName, confidencePicks, survivorPick, marginPick, highFivePicks, tiebreaker } = userPicks;

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

export default UserPicks;
