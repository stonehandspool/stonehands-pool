import { Session } from '@supabase/supabase-js';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../config/supabaseClient';
import { TABLE_NAMES } from '../../config/supabaseConfig';
import {
  CURRENT_WEEK,
  CURRENT_WEEK_CUTOFF_TIME,
  CURRENT_WEEK_FINAL_GAME,
  CURRENT_WEEK_STATUS,
  CURRENT_YEAR,
  MARCH_MADNESS_STATE,
  SEASON_READY,
  SubmissionInfo,
  UserInfo,
} from '../../constants';
import * as seasonData from '../../../data/2023/season.json';
import * as playerData from '../../../data/2023/players.json';
import * as weeklyPicks from '../../../data/2023/weeklyPicks.json';
import ConfidencePicks from './ConfidencePicks';
import HighFivePicks from './HighFivePicks';
import MarginPick from './MarginPick';
import SurvivorPick from './SurvivorPick';
import TieBreaker from './TieBreaker';

interface PicksheetFormProps {
  session: Session;
}

export interface choiceFormat {
  [key: string]: string | number | string[];
  highFivePicks: string[];
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

const currentWeekInfo = seasonData.weeks[`week_${CURRENT_WEEK}` as keyof typeof seasonData.weeks];
const currentWeeksPicks = weeklyPicks.weeklyPicks[
  `week_${CURRENT_WEEK}` as keyof typeof weeklyPicks.weeklyPicks
] as unknown as SubmissionInfo[];

const findSubmission = (submissionId: string) => {
  return currentWeeksPicks.find(submission => submission.user_id === submissionId);
};

function PickSheetForm(props: PicksheetFormProps) {
  const { session } = props;
  const { players } = playerData;
  const navigate = useNavigate();

  if (MARCH_MADNESS_STATE === 'READY_FOR_PICKS' || MARCH_MADNESS_STATE === 'ACTIVE') {
    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered">
            Sorry, this is the page for the picksheet for the football pools, you probably want to look{' '}
            <a href="/march-madness/picksheet">HERE</a> for the March Madness Bracket Picksheet
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
            Sorry, the season hasn't started yet, please wait until the season has been loaded
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
            becomes available
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
            Sorry, the cutoff for this week has passed. You can no longer make a submission
          </h3>
        </div>
      </section>
    );
  }

  const [selections, setSelections] = useState({});
  const [priorPicks, setPriorPicks] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  //States for the different parts of the form

  // Confidence Pool
  const numGamesThisWeek = Object.keys(currentWeekInfo).length;
  const lastGameCompleted =
    currentWeekInfo[`matchup_${numGamesThisWeek}` as keyof typeof currentWeekInfo].winner !== '';
  const [selectedPicks, setSelectedPicks] = useState<string[]>(new Array(numGamesThisWeek));
  const [selectedConfidences, setSelectedConfidences] = useState<number[]>(new Array(numGamesThisWeek));

  const onUpdatePick = (newValue: string, index: number) => {
    const pickCopy = [...selectedPicks];
    pickCopy[index] = newValue;
    setSelectedPicks(pickCopy);
  };

  const onUpdateConfidence = (newValue: number, index: number) => {
    const confidencesCopy = [...selectedConfidences];
    confidencesCopy[index] = newValue;
    setSelectedConfidences(confidencesCopy);
  };

  // Survivor Pick
  const [survivorTeam, setSurvivorTeam] = useState<string | null>(null);

  const handleSurvivorSelection = (team: string) => {
    setSurvivorTeam(team);
  };

  // Confidence Pick
  const [marginTeam, setMarginTeam] = useState<string | null>(null);

  const handleMarginSelection = (team: string) => {
    setMarginTeam(team);
  };

  // High Five Picks
  const [highFivePicks, setHighFivePicks] = useState<string[]>([]);

  const handleHighFiveSelection = (type: string, teamA: string, teamB?: string) => {
    if (type === 'remove') {
      // Remove the previous value if we're changing a drop down
      setHighFivePicks(previousPicks => previousPicks.filter(pick => pick !== teamA));
    } else if (type === 'swap') {
      // First remove the previous selection
      setHighFivePicks(previousPicks => previousPicks.filter(pick => pick !== teamA));
      // Now add the other value
      setHighFivePicks(previousPicks => [...previousPicks, teamB!]);
    } else if (!highFivePicks.includes(teamA)) {
      setHighFivePicks(previousPicks => [...previousPicks, teamA]);
    }
  };

  // Tiebreaker
  const [tiebreaker, setTiebreaker] = useState<string>('');

  const handleTiebreakerInput = (event: ChangeEvent<HTMLInputElement>) => {
    const numRegex = /^[0-9\b]+$/;
    if (event.target.value === '' || numRegex.test(event.target.value)) {
      setTiebreaker(event.target.value);
    }
  };

  const userInfo = players.find(playerInfo => playerInfo.id === session.user.id) as unknown as UserInfo;

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

  // Ping the database to see if there are picks from this week for this user
  useEffect(() => {
    const fetchPicks = async (callback: () => void) => {
      const { data, error } = await supabaseClient
        .from('user_picks')
        .select()
        .eq('week', CURRENT_WEEK)
        .eq('year', CURRENT_YEAR)
        .eq('user_id', userInfo.id);

      if (error) {
        console.error('An error occurred when getting your prior picks from the database', error);
      }

      if (data && data.length > 0) {
        const { submission_data: priorPicks } = data[0];

        // Set prior picks and confidences
        const priorConfidencePicks = [];
        const priorConfidenceValues = [];
        for (let i = 0; i < numGamesThisWeek; i++) {
          priorConfidencePicks.push(priorPicks[`matchup-${i}`]);
          priorConfidenceValues.push(priorPicks[`matchup-${i}-confidence`]);
        }
        setSelectedPicks(priorConfidencePicks);
        setSelectedConfidences(priorConfidenceValues);

        // Set prior survivor pick
        if (userInfo.aliveInSurvivor) {
          setSurvivorTeam(priorPicks['survivor-pick']);
        }
        // Set prior margin pick
        setMarginTeam(priorPicks['margin-pick']);

        // Set prior high five picks
        setHighFivePicks(priorPicks.highFivePicks);

        // Set prior tiebreaker
        setTiebreaker(priorPicks.tiebreaker);
        setSelections(priorPicks);

        // Update other state
        setPriorPicks(true);
      } else {
        callback();
      }
    };

    // Backup in case the database search doesn't return anything
    // This will really only happen if a user forgot to submit prior to Thu and has a forced Thu pick
    const searchJSON = () => {
      const submission = findSubmission(userInfo.id);
      if (submission) {
        const { submission_data: priorPicks, submission_id } = submission;
        // Set prior picks and confidences
        const priorConfidencePicks: string[] = [];
        const priorConfidenceValues: number[] = [];
        for (let i = 0; i < numGamesThisWeek; i++) {
          priorConfidencePicks.push(priorPicks[`matchup-${i}` as keyof typeof priorPicks] as string);
          priorConfidenceValues.push(
            parseInt(priorPicks[`matchup-${i}-confidence` as keyof typeof priorPicks] as string, 10)
          );
        }
        setSelectedPicks(priorConfidencePicks);
        setSelectedConfidences(priorConfidenceValues);

        // Set prior survivor pick
        if (userInfo.aliveInSurvivor) {
          setSurvivorTeam(priorPicks['survivor-pick']);
        }
        // Set prior margin pick
        setMarginTeam(priorPicks['margin-pick']);

        // Set prior high five picks
        setHighFivePicks(priorPicks.highFivePicks);

        // Set prior tiebreaker
        setTiebreaker(priorPicks.tiebreaker);

        // Update other state
        setSelections(priorPicks);
        // There won't be a submission to update in the database if it was auto-generated
        // So we want to make sure on a submit that a new entry is made
        if (submission_id !== -1) {
          setPriorPicks(true);
        }
      }
    };

    // First, check the database since that is the most up-to-date version most of the time
    fetchPicks(searchJSON).catch(err => {
      console.error(err);
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const currentTime = new Date();
    if (currentTime > CURRENT_WEEK_CUTOFF_TIME) {
      return (
        <section className="section">
          <div className="container">
            <h3 className="title is-3 has-text-centered">
              Sorry, the cutoff for this week has passed. You can no longer make a submission
            </h3>
          </div>
        </section>
      );
    }

    const { id } = session.user;
    const { first_name: firstName, last_name: lastName, username } = session.user.user_metadata;
    const choices: choiceFormat = {
      id,
      firstName,
      lastName,
      username,
      highFivePicks: [],
    };

    // Set the values via the state of this component rather than using the form
    // This is done because completed games lock the options and those can't be found by the form data

    // Set the confidence team picks
    let missingConfidencePick = false;
    for (let i = 0; i < selectedPicks.length; i++) {
      const pick = selectedPicks[i];
      if (pick === undefined) {
        setFormError('Please make sure you have chosen a winner for each confidence matchup');
        missingConfidencePick = true;
        break;
      } else {
        choices[`matchup-${i}`] = pick;
      }
    }

    if (missingConfidencePick) {
      return;
    }

    // Set the confidence values
    let missingConfidenceValue = false;
    for (let i = 0; i < selectedConfidences.length; i++) {
      const value = selectedConfidences[i];
      if (value === undefined) {
        setFormError('Please make sure you have chosen a confidence value for every matchup');
        missingConfidenceValue = true;
        break;
      } else {
        choices[`matchup-${i}-confidence`] = value;
      }
    }

    if (missingConfidenceValue) {
      return;
    }

    // Set the survivor pick
    if (userInfo.aliveInSurvivor && !survivorTeam) {
      setFormError('Please make sure you have chosen a survivor pick');
      return;
    } else {
      choices['survivor-pick'] = survivorTeam!;
    }

    // Set the margin pick
    if (!marginTeam) {
      setFormError('Please make sure you have chosen a margin pick');
      return;
    } else {
      choices['margin-pick'] = marginTeam;
    }

    // Set the high five picks
    if (highFivePicks.length !== 5) {
      setFormError('Please make sure you have made all of your high five picks');
      return;
    } else {
      choices.highFivePicks = highFivePicks;
    }

    if (tiebreaker.length === 0) {
      setFormError('Please make sure you have submitted a tiebreaker');
      return;
    } else {
      choices.tiebreaker = tiebreaker;
    }

    setSelections(choices);
    setFormError(null);

    if (priorPicks) {
      const { data: picksheetSubmissionData, error: picksheetSubmissionError } = await supabaseClient
        .from(TABLE_NAMES.USER_PICKS)
        .update({ submission_data: choices })
        .eq('week', CURRENT_WEEK)
        .eq('year', CURRENT_YEAR)
        .eq('user_id', id)
        .select();

      if (picksheetSubmissionError) {
        console.error(picksheetSubmissionError);
        setFormError('Something went wrong updating your picksheet, please reach out to Ryan');
        return;
      }

      if (picksheetSubmissionData) {
        setFormError(null);
        navigate('/picksheet-success', { state: choices });
      }
    } else {
      const { data: picksheetSubmissionData, error: picksheetSubmissionError } = await supabaseClient
        .from(TABLE_NAMES.USER_PICKS)
        .insert({
          user_id: id,
          week: CURRENT_WEEK,
          year: CURRENT_YEAR,
          submission_data: choices,
        })
        .select();

      if (picksheetSubmissionError) {
        console.error(picksheetSubmissionError);
        setFormError('Something went wrong submitting your picksheet, please reach out to Ryan');
        return;
      }

      if (picksheetSubmissionData) {
        setFormError(null);
        navigate('/picksheet-success', { state: choices });
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">Week {CURRENT_WEEK} Picksheet</h1>
        <h2 className="subtitle">
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
        <form className="box" onSubmit={handleSubmit}>
          <ConfidencePicks
            weekInfo={currentWeekInfo}
            priorPicks={selections}
            selectedPicks={selectedPicks}
            onUpdatePick={onUpdatePick}
            selectedConfidences={selectedConfidences}
            onUpdateConfidence={onUpdateConfidence}
          />
          <SurvivorPick
            weekInfo={currentWeekInfo}
            userInfo={userInfo}
            survivorTeam={survivorTeam}
            handleSurvivorSelection={handleSurvivorSelection}
          />
          <MarginPick
            weekInfo={currentWeekInfo}
            userInfo={userInfo}
            marginTeam={marginTeam}
            handleMarginSelection={handleMarginSelection}
          />
          <HighFivePicks
            weekInfo={currentWeekInfo}
            highFivePicks={highFivePicks}
            handleHighFiveSelection={handleHighFiveSelection}
          />
          <TieBreaker
            finalGame={CURRENT_WEEK_FINAL_GAME}
            lastGameCompleted={lastGameCompleted}
            tiebreaker={tiebreaker}
            handleTiebreakerInput={handleTiebreakerInput}
          />
          <div className="field">
            <div className="control">
              <button className="button is-primary" disabled={lastGameCompleted}>
                Submit Choices
              </button>
            </div>
          </div>
          {formError && formError.length > 0 && <p className="has-text-danger">{formError}</p>}
        </form>
      </div>
    </section>
  );
}

export default PickSheetForm;
