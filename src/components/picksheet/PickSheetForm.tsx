import { Session } from '@supabase/supabase-js';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import supabaseClient from '../../config/supabaseClient';
import { TABLE_NAMES } from '../../config/supabaseConfig';

import seasonData from '../../../data/2024/football/season.json';
import playerData from '../../../data/2024/football/players.json';
import {
  ConfidenceMatchupInfo,
  CURRENT_WEEK,
  CURRENT_WEEK_CUTOFF_TIME,
  CURRENT_WEEK_FINAL_GAME,
  CURRENT_WEEK_STATUS,
  MARCH_MADNESS_STATE,
  SEASON_READY,
  PicksheetData,
  UserInfo,
} from '../../constants';
import { useWeeklyPick } from '../../utils/useWeeklyPicks';

import ConfidencePicks from './ConfidencePicks';
import SurvivorPick from './SurvivorPick';
import MarginPick from './MarginPick';
import HighFivePicks from './HighFivePicks';
import TieBreaker from './TieBreaker';

type PickSheetFormProps = {
  session: Session;
};

function PickSheetForm(props: PickSheetFormProps) {
  const { session } = props;
  const navigate = useNavigate();
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1224px)' });

  if (MARCH_MADNESS_STATE === 'READY_FOR_PICKS' || MARCH_MADNESS_STATE === 'ACTIVE') {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, this is the page for the picksheet for the football pools, you probably want to look{' '}
            <a href="/march-madness/picksheet">HERE</a> for the March Madness Bracket Picksheet.
          </h3>
        </div>
      </section>
    );
  }

  if (!SEASON_READY) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, the season hasn't started yet! The picksheet will become available closer to the start of the season.
          </h3>
        </div>
      </section>
    );
  }

  if (CURRENT_WEEK_STATUS === 'COMPLETE') {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            The prior week has completed and the new picksheet hasn't been uploaded yet. An email will be sent once it
            becomes available.
          </h3>
        </div>
      </section>
    );
  }

  const currentTime = new Date();
  if (currentTime > CURRENT_WEEK_CUTOFF_TIME) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, the cutoff for this week has passed. You can no longer make a submission.
          </h3>
        </div>
      </section>
    );
  }

  const userInfo: UserInfo = playerData.find(playerInfo => playerInfo.id === session.user.id)!;

  if (!userInfo) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Thank you for signing up for the pool! Ryan needs to do something on his end to activate your account. It
            should be activated shortly!
          </h3>
        </div>
      </section>
    );
  }

  if (session.user.aud !== 'authenticated') {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Thank you for signing up for the pool! It looks like you haven't yet activated your account, please check
            your email for the activation link you received when you signed up. If you can't find it, please reach out
            to Ryan.
          </h3>
        </div>
      </section>
    );
  }

  const { firstName, lastName } = userInfo;
  const currentWeekInfo = seasonData.find(weekInfo => weekInfo.weekId === `week_${CURRENT_WEEK}`)!.matchups;
  const numGamesThisWeek = currentWeekInfo.length;
  const lastGameCompleted =
    currentWeekInfo.find(matchupInfo => matchupInfo.matchupId === `matchup_${numGamesThisWeek}`)!.winner !== '';

  const weeklyPicks = useWeeklyPick(CURRENT_WEEK);
  const jsonPickData = weeklyPicks.length > 0 ? weeklyPicks[0].picks : [];

  const initialConfidencePicks: ConfidenceMatchupInfo[] = [];
  for (let i = 0; i < numGamesThisWeek; i++) {
    initialConfidencePicks.push({ matchupId: `matchup_${i + 1}`, team: null, confidence: null });
  }

  // State for the picksheet
  const [confidencePicks, setConfidencePicks] = useState<ConfidenceMatchupInfo[]>(initialConfidencePicks);
  const [survivorTeam, setSurvivorTeam] = useState<string | null>(null);
  const [marginTeam, setMarginTeam] = useState<string | null>(null);
  const [highFiveTeams, setHighFiveTeams] = useState<string[]>([]);
  const [tiebreaker, setTiebreaker] = useState<string>('');
  const [validSubmission, setValidSubmission] = useState<boolean>(false);
  const [timesUpdated, setTimesUpdated] = useState<number>(0);
  const submissionRef = useRef(false);
  const pingedDatabaseRef = useRef(false);

  const [priorPicks, setPriorPicks] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // Callbacks for updating state
  const onUpdateConfidenceTeam = (matchupId: string, teamName: string) => {
    setConfidencePicks(
      confidencePicks.map(pickInfo => {
        if (pickInfo.matchupId === matchupId) {
          return { ...pickInfo, team: teamName };
        } else {
          return pickInfo;
        }
      })
    );
  };

  const onUpdateConfidenceValue = (matchupId: string, value: number) => {
    setConfidencePicks(
      confidencePicks.map(pickInfo => {
        if (pickInfo.matchupId === matchupId) {
          return { ...pickInfo, confidence: value };
        } else {
          return pickInfo;
        }
      })
    );
  };

  const onClearConfidencePicks = () => {
    const currentTime = new Date();
    setConfidencePicks(
      confidencePicks.map(pickInfo => {
        const matchInfo = currentWeekInfo.find(matchup => matchup.matchupId === pickInfo.matchupId)!;
        const matchTime = new Date(matchInfo.time);
        if (matchInfo.winner !== '' || currentTime > matchTime) {
          return pickInfo;
        } else {
          return { matchupId: pickInfo.matchupId, team: null, confidence: null };
        }
      })
    );
  };

  const onUpdateSurvivorTeam = (teamName: string) => {
    setSurvivorTeam(teamName);
  };

  const onUpdateMarginTeam = (teamName: string) => {
    setMarginTeam(teamName);
  };

  const onUpdateHighFiveTeams = (type: string, teamA: string, teamB?: string) => {
    if (type === 'remove') {
      // Remove the previous value if we're changing a drop down
      setHighFiveTeams(previousPicks => previousPicks.filter(pick => pick !== teamA));
    } else if (type === 'swap') {
      // First remove the previous selection
      setHighFiveTeams(previousPicks => previousPicks.filter(pick => pick !== teamA));
      // Now add the other value
      setHighFiveTeams(previousPicks => [...previousPicks, teamB!]);
    } else if (!highFiveTeams.includes(teamA)) {
      setHighFiveTeams(previousPicks => [...previousPicks, teamA]);
    }
  };

  const onUpdateTiebreaker = (event: ChangeEvent<HTMLInputElement>) => {
    const numRegex = /^[0-9\b]+$/;
    const numSubmitted = event.target.value;
    if (numSubmitted === '' || (numRegex.test(numSubmitted) && numSubmitted.length <= 3)) {
      setTiebreaker(event.target.value);
    }
  };

  // For enabling/disabling the submission button
  useEffect(() => {
    let validConfidencePicks = true;
    confidencePicks.forEach(confidencePick => {
      const { team, confidence } = confidencePick;
      if (team === null || confidence === null) {
        validConfidencePicks = false;
      }
    });

    const validSurvivorPick = !userInfo.aliveInSurvivor || (userInfo.aliveInSurvivor && survivorTeam !== null);
    const validMarginPick = marginTeam !== null;
    const validHighFivePicks = highFiveTeams.length === 5;
    const validTiebreaker = tiebreaker.length !== 0;

    if (validConfidencePicks && validSurvivorPick && validMarginPick && validHighFivePicks && validTiebreaker) {
      setValidSubmission(true);
    } else if (validSubmission) {
      setValidSubmission(false);
    }
  }, [confidencePicks, survivorTeam, marginTeam, highFiveTeams, tiebreaker]);

  // Ping the database to see if there are picks from this week for this user
  useEffect(() => {
    const fetchPicks = async () => {
      const { data, error } = await supabaseClient
        .from(TABLE_NAMES.USER_PICKS)
        .select()
        .eq('week', CURRENT_WEEK)
        .eq('user_id', userInfo.id);

      if (error) {
        console.error('An error occurred when getting your prior picks from the database', error);
      }

      if (data && data.length > 0) {
        const priorPicks = data[0].submission_data as PicksheetData;
        const prevTimesUpdated = data[0].times_updated as number;

        // Set the prior picks and confidences
        setConfidencePicks(priorPicks.confidencePicks);

        if (userInfo.aliveInSurvivor) {
          setSurvivorTeam(priorPicks.survivorPick);
        }

        setMarginTeam(priorPicks.marginPick);
        setHighFiveTeams(priorPicks.highFivePicks);
        setTiebreaker(priorPicks.tiebreaker.toString());
        setTimesUpdated(prevTimesUpdated);
        setPriorPicks(true);
      }

      if (!pingedDatabaseRef.current) {
        pingedDatabaseRef.current = true;
      }
    };

    // First, check the database since that is the most up-to-date version most of the time
    fetchPicks().catch(err => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    if (pingedDatabaseRef.current && jsonPickData.length > 0 && !priorPicks) {
      // Backup in case the database search doesn't return anything
      // This will really only happen if a user forgot to submit prior to Thu and has a forced Thu pick
      const submission = jsonPickData.find(picks => picks.user_id === userInfo.id);
      if (submission) {
        const { submission_data: priorPicks } = submission;
        // Set the prior picks and confidences
        setConfidencePicks(priorPicks.confidencePicks);

        if (userInfo.aliveInSurvivor) {
          setSurvivorTeam(priorPicks.survivorPick);
        }

        setMarginTeam(priorPicks.marginPick);
        setHighFiveTeams(priorPicks.highFivePicks);
        setTiebreaker(priorPicks.tiebreaker.toString());
        // If the submission id is -1 that means it was auto generated and we would actually want to
        // do an initial submission to the database as opposed to an update
        if (submission.id !== -1) {
          setPriorPicks(true);
        }
      }
    }
  }, [pingedDatabaseRef.current, jsonPickData, priorPicks]);

  const submitPicksheet = async (event: MouseEvent<HTMLButtonElement>) => {
    if (submissionRef.current) {
      return;
    }
    submissionRef.current = true;

    event.preventDefault();

    const { id, username, firstName, lastName } = userInfo;
    const userSubmission: PicksheetData = {
      userId: id,
      username,
      firstName,
      lastName,
      confidencePicks,
      survivorPick: survivorTeam,
      marginPick: marginTeam as string,
      highFivePicks: highFiveTeams,
      tiebreaker: parseInt(tiebreaker, 10),
    };

    if (priorPicks) {
      const { data: picksheetPicksheetData, error: picksheetSubmissionError } = await supabaseClient
        .from(TABLE_NAMES.USER_PICKS)
        .update({ submission_data: userSubmission, times_updated: timesUpdated + 1 })
        .eq('week', CURRENT_WEEK)
        .eq('user_id', id)
        .select();

      if (picksheetSubmissionError) {
        console.error(picksheetSubmissionError);
        setFormError(
          `Something went wrong updating your picksheet, please reach out to Ryan (Condition B): Temporary debug info: ${JSON.stringify(picksheetSubmissionError)}`
        );
        return;
      }

      if (picksheetPicksheetData) {
        setFormError('');
        navigate('/picksheet-success', { state: userSubmission });
      }
    } else {
      const { data: picksheetPicksheetData, error: picksheetSubmissionError } = await supabaseClient
        .from(TABLE_NAMES.USER_PICKS)
        .insert({
          user_id: id,
          week: CURRENT_WEEK,
          times_updated: timesUpdated,
          submission_data: userSubmission,
        })
        .select();

      if (picksheetSubmissionError) {
        console.error(picksheetSubmissionError);
        setFormError(
          `Something went wrong submitting your picksheet, please reach out to Ryan (Condition A): Temporary debug info: ${JSON.stringify(picksheetSubmissionError)}`
        );
        return;
      }

      if (picksheetPicksheetData) {
        setFormError('');
        navigate('/picksheet-success', { state: userSubmission });
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="block">
          <h1 className={`title ${isMobileOrTablet ? null : 'is-1'}`}>
            Week {CURRENT_WEEK} Picksheet for {firstName} {lastName}
          </h1>
        </div>
        <div className="block">
          <h2 className={`subtitle ${isMobileOrTablet ? 'is-6' : null}`}>
            Make sure to fill out every field below. If you would like to change your picks you can at any time prior to
            the below cutoff and as long as that game hasn't started (i.e. no changing your Thursday pick on Friday).
          </h2>
          <h2 className="subtitle has-text-danger">
            Submission cutoff:{' '}
            {CURRENT_WEEK_CUTOFF_TIME.toLocaleDateString('en-US', {
              dateStyle: 'full',
              timeZone: 'America/New_York',
            })}{' '}
            at{' '}
            {CURRENT_WEEK_CUTOFF_TIME.toLocaleTimeString('en-US', {
              timeZone: 'America/New_York',
            })}{' '}
            ET
          </h2>
          <div className="block">
            <ConfidencePicks
              weekInfo={currentWeekInfo}
              currentChoices={confidencePicks}
              isMobileOrTablet={isMobileOrTablet}
              onUpdateConfidenceTeam={onUpdateConfidenceTeam}
              onUpdateConfidenceValue={onUpdateConfidenceValue}
              onClearConfidencePicks={onClearConfidencePicks}
            />
          </div>
          <div className="block">
            <SurvivorPick
              weekInfo={currentWeekInfo}
              userInfo={userInfo}
              survivorTeam={survivorTeam}
              isMobileOrTablet={isMobileOrTablet}
              onUpdateSurvivorTeam={onUpdateSurvivorTeam}
            />
          </div>
          <div className="block">
            <MarginPick
              weekInfo={currentWeekInfo}
              userInfo={userInfo}
              marginTeam={marginTeam}
              isMobileOrTablet={isMobileOrTablet}
              onUpdateMarginTeam={onUpdateMarginTeam}
            />
          </div>
          <div className="block">
            <HighFivePicks
              weekInfo={currentWeekInfo}
              highFivePicks={highFiveTeams}
              isMobileOrTablet={isMobileOrTablet}
              onUpdateHighFiveTeams={onUpdateHighFiveTeams}
            />
          </div>
          <div className="block">
            <TieBreaker
              finalGame={CURRENT_WEEK_FINAL_GAME}
              lastGameCompleted={lastGameCompleted}
              tiebreaker={tiebreaker}
              isMobileOrTablet={isMobileOrTablet}
              onUpdateTiebreaker={onUpdateTiebreaker}
            />
          </div>
          <div className="container">
            <div className="block">
              <button className="button is-primary" disabled={!validSubmission} onClick={submitPicksheet}>
                Submit Choices
              </button>
            </div>
          </div>
          {formError && formError.length > 0 && <p className="has-text-danger">{formError}</p>}
        </div>
      </div>
    </section>
  );
}

export default PickSheetForm;
