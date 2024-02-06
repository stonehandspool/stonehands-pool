import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import MatchupCard from './MatchupCard';
import { MarchMadnessMatchupInfo, MarchMadnessTeamInfo, MARCH_MADNESS_CUTOFF, MARCH_MADNESS_STATE, ROUND_VALUES } from '../../constants';
import matchups from '../../../data/2024/marchmadness/matchups.json';
import supabaseClient from '../../config/supabaseClient';
import { TABLE_NAMES } from '../../config/supabaseConfig';

type PicksheetFormProps = {
    session: Session;
};

const resetValue: MarchMadnessTeamInfo = {
    seed: null,
    name: null,
    record: null,
};

const tempDate = new Date('03/01/2024');

function PickSheetForm(props: PicksheetFormProps) {
    const { session } = props;
    const navigate = useNavigate();
    const [submissionMade, setSubmissionMade] = useState<boolean>(false);
    const [priorPicks, setPriorPicks] = useState<boolean>(false);
    const [timesUpdated, setTimesUpdated] = useState<number>(0);
    const { user } = session;
    const { id, user_metadata: userInfo } = user;
    const { first_name: firstName, last_name: lastName, username } = userInfo;

    if (MARCH_MADNESS_STATE === 'INACTIVE') {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, the March Madness Bracket hasn't been loaded yet, it will be available as soon as possible</h3>
                </div>
            </section>
        )
    }

    if (MARCH_MADNESS_STATE === 'ACTIVE') {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, the tournament has begun and picksheets are no longer available. Please join us next year!</h3>
                </div>
            </section>
        )
    }

    const currentTime = new Date();
    if (currentTime > MARCH_MADNESS_CUTOFF) {
        return (
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3 has-text-centered'>Sorry, the cutoff for submitting picksheets has occurred. You can no longer make a submission</h3>
                </div>
            </section>
        )
    }

    // Create an array of only the information we need for the pick information
    const initialPicks: MarchMadnessMatchupInfo[] = [];
    for (let i = 0; i < matchups.length; i++) {
        initialPicks.push(matchups[i]);
    }
    const [userPicks, setUserPicks] = useState<MarchMadnessMatchupInfo[]>(initialPicks);
    const [allPicksFilled, setAllPicksFilled] = useState<boolean>(false);
    const [tiebreaker, setTiebreaker] = useState<string>('');

    const handleTiebreakerInput = (event: ChangeEvent<HTMLInputElement>) => {
        const numRegex = /^[0-9\b]+$/;
        if (event.target.value === '' || numRegex.test(event.target.value)) {
            setTiebreaker(event.target.value);
        }
    }

    const clearGamesAfter = (picksCopy: MarchMadnessMatchupInfo[], startingIndex: number, teamToClear: string) => {
        // I was gonna do this recursively but that was too much work. Just loop through the array starting
        // at the next matchup and remove any instances of the team we switched away from
        for (let i = startingIndex; i < picksCopy.length; i++) {
            const { topTeam, bottomTeam, winner } = picksCopy[i];
            if (topTeam.name === teamToClear) {
                picksCopy[i].topTeam = resetValue;
                if (winner === 'top') {
                    picksCopy[i].winner = null;
                }
            } else if (bottomTeam.name === teamToClear) {
                picksCopy[i].bottomTeam = resetValue;
                if (winner === 'bottom') {
                    picksCopy[i].winner = null;
                }
            }
        }
    };

    const handleClick = (matchupInfo: MarchMadnessMatchupInfo) => {
        const { id, topTeam, bottomTeam, winner, nextMatchup } = matchupInfo;
        const idNum = parseInt(id.split('-').pop() as string, 10);
        const picksCopy = _.cloneDeep(userPicks);
        const currentIndex = picksCopy.findIndex((matchups: MarchMadnessMatchupInfo) => matchups.id === id);
        picksCopy[currentIndex].winner = winner;
        if (idNum % 2 === 1 && idNum !== 63) {
            // If it is an odd number, that means it is the top matchup so the next matchup needs to get its `topTeam` prop changed
            const nextIndex = picksCopy.findIndex((matchups: MarchMadnessMatchupInfo) => matchups.id === nextMatchup);
            picksCopy[nextIndex].topTeam = winner === 'top' ? topTeam : bottomTeam;
            if (picksCopy[nextIndex].winner === 'top') {
                // Reset this so that the newly selected team isn't marked as a winner if the other team was the original winner
                picksCopy[nextIndex].winner = null;
            }
            const teamToClear: string = winner === 'top' ? bottomTeam.name as string : topTeam.name as string;
            clearGamesAfter(picksCopy, nextIndex, teamToClear);
            setUserPicks(picksCopy);
        } else if (idNum !== 63) {
            // If it is an even number, that means it is the top matchup so the next matchup needs to get its `bottomTeam` prop changed
            const nextIndex = picksCopy.findIndex((matchups: MarchMadnessMatchupInfo) => matchups.id === nextMatchup);
            picksCopy[nextIndex].bottomTeam = winner === 'top' ? topTeam : bottomTeam;
            if (picksCopy[nextIndex].winner === 'bottom') {
                // Reset this so that the newly selected team isn't marked as a winner if the other team was the original winner
                picksCopy[nextIndex].winner = null;
            }
            const teamToClear: string = winner === 'top' ? bottomTeam.name as string : topTeam.name as string;
            clearGamesAfter(picksCopy, nextIndex, teamToClear);
            setUserPicks(picksCopy);
        } else {
            // To handle picking the finals game so that their chosen winner is saved
            setUserPicks(picksCopy);
        }
    };

    useEffect(() => {
        let allPicksMade = true;
        for (let i = 0; i < userPicks.length - 1; i++) {
            const pickInfo = userPicks[i];
            const { topTeam, bottomTeam, winner } = pickInfo;
            if (topTeam.name === null || bottomTeam.name === null || winner === null) {
                allPicksMade = false;
                break;
            }
        }
        if (allPicksMade && tiebreaker !== '') {
            setAllPicksFilled(true);
        } else if (!allPicksMade && allPicksFilled) {
            setAllPicksFilled(false);
        }
    }, [userPicks, tiebreaker]);

    // Ping the database to see if a prior submission was made
    useEffect(() => {
        const fetchPicks = async (callback?: () => void) => {
            const { data, error } = await supabaseClient
                .from(TABLE_NAMES.MARCH_MADNESS_PICKS)
                .select()
                .eq('user_id', id);

            if (error) {
                console.error('An error occurred when getting your prior picks from the database', error);
            }

            if (data && data.length > 0) {
                const { submission_data: submissionData, tiebreaker, times_updated: priorTimesUpdated } = data[0];
                const { userPicks: priorPicks } = submissionData;

                setUserPicks(priorPicks);
                setTiebreaker(tiebreaker);
                setTimesUpdated(priorTimesUpdated);
                setPriorPicks(true);
            } else {
                callback && callback();
            }
        };

        // First, check the database since that is the most up-to-date version most of the time
        fetchPicks().catch(err => console.error(err));
    }, []);

    const onClick = async () => {
        // To stop duplicate responses from getting submitted
        if (submissionMade) {
            return;
        }
        setSubmissionMade(true);

        let maxPoints = 0;
        userPicks.forEach((pickInfo) => {
            const { topTeam, bottomTeam, winner, round } = pickInfo;
            const winnerSeed: number = (winner === 'top' ? topTeam.seed : bottomTeam.seed) as number;
            maxPoints += ROUND_VALUES[round - 1] * winnerSeed;
        });

        const submission_data = {
            firstName,
            lastName,
            username,
            userPicks,
            points: 0,
            numCorrect: 0,
            numIncorrect: 0,
            pointsByRound: [0, 0, 0, 0, 0, 0],
            currentMaxPoints: maxPoints,
            startingMaxPoints: maxPoints,
        };

        if (priorPicks) {
            const { data: picksheetSubmissionData, error: picksheetSubmissionError } = await supabaseClient
                .from(TABLE_NAMES.MARCH_MADNESS_PICKS)
                .update({
                    submission_data,
                    tiebreaker,
                    times_updated: timesUpdated + 1,
                })
                .eq('user_id', id)
                .select();

            if (picksheetSubmissionError) {
                console.error(picksheetSubmissionError);
                return;
            }

            if (picksheetSubmissionData) {
                navigate('/march-madness/picksheet-success', { state: userPicks });
            }
        } else {
            const { data: picksheetSubmissionData, error: picksheetSubmissionError } = await supabaseClient
                .from(TABLE_NAMES.MARCH_MADNESS_PICKS)
                .insert({
                    user_id: id,
                    submission_data,
                    tiebreaker,
                })
                .select();

            if (picksheetSubmissionError) {
                console.error(picksheetSubmissionError);
                return;
            }

            if (picksheetSubmissionData) {
                navigate('/march-madness/picksheet-success', { state: userPicks });
            }
        }
    };

    return (
        <section className='section px-0'>
            <section className='section px-0'>
                <div className='container'>
                    <h1 className='title is-1'>March Madness 2024 Picksheet</h1>
                    <h2 className='subtitle'>Make sure to fill out every match below. If you would like to change your picks you can at any time prior to the below. Once the first game of the tournament has started you will be unable to change your picks</h2>
                    <h2 className='subtitle has-text-danger'>Submission cutoff: {tempDate.toLocaleDateString('en-US', { dateStyle: 'full', timeZone: 'America/New_York' })} at {tempDate.toLocaleTimeString('en-US', { timeZone: 'America/New_York' })} ET</h2>
                </div>
            </section>
            <section className='section px-0 pt-0'>
                <div className='columns px-6'>
                    <div className='column is-narrow is-flex is-flex-direction-column is-justify-content-space-around'>
                        <p style={{ visibility: 'hidden', writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>A</b></p>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Round of 64</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Round of 32</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Sweet Sixteen</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Elite Eight</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Final Four</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Finals</h4>
                    </div>
                </div>
                <div className='columns px-6'>
                    <div className='column is-narrow is-flex is-flex-direction-column is-justify-content-space-around'>
                        <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>WEST</b></p>
                        <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>EAST</b></p>
                        <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>SOUTH</b></p>
                        <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>MIDWEST</b></p>
                    </div>
                    <div className='column'>
                        {
                            Array.from(Array(32).keys()).map((index) => {
                                return (
                                    <MatchupCard key={`round-of-64-${index}`} customClass='first-col' matchupInfo={userPicks[index]} onClick={handleClick} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        {
                            Array.from(Array(16).keys()).map((index) => {
                                return (
                                    <MatchupCard key={`round-of-64-${index}`} customClass='col-2' matchupInfo={userPicks[32 + index]} onClick={handleClick} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        {
                            Array.from(Array(8).keys()).map((index) => {
                                return (
                                    <MatchupCard key={`round-of-64-${index}`} customClass='col-3' matchupInfo={userPicks[48 + index]} onClick={handleClick} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        {
                            Array.from(Array(4).keys()).map((index) => {
                                return (
                                    <MatchupCard key={`round-of-64-${index}`} customClass='col-4' matchupInfo={userPicks[56 + index]} onClick={handleClick} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        {
                            Array.from(Array(2).keys()).map((index) => {
                                return (
                                    <MatchupCard key={`round-of-64-${index}`} customClass='col-5' matchupInfo={userPicks[60 + index]} onClick={handleClick} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        <MatchupCard customClass='last-col' matchupInfo={userPicks[userPicks.length - 1]} onClick={handleClick} />
                    </div>
                </div>
            </section>
            <section className='section'>
                <div className='container'>
                    <h3 className='title is-3'>Tiebreaker:</h3>
                    <h4 className='subtitle'>Please enter what you think the combined score will be in the Final game of the tournament</h4>
                    <div className='columns'>
                        <div className='column is-1'>
                            <input
                                className='input'
                                type='text'
                                id='tiebreaker'
                                name='tiebreaker'
                                value={tiebreaker}
                                onChange={handleTiebreakerInput}
                            />
                        </div>
                    </div>
                    <button className='button is-primary' disabled={!allPicksFilled} onClick={onClick}>Submit Choices</button>
                </div>
            </section>
        </section>
    )
}

export default PickSheetForm;