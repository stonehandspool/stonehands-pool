import { useLayoutEffect, useRef, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import MatchupCard, { MatchupCardProps } from './MatchupCard';
import matchups from '../../../data/2024/marchmadness/matchups.json';

type PicksheetFormProps = {
    session: Session;
};

const tempDate = new Date('03/01/2024');

type UserPicks = {
    id: string;
    team: string | null;
}

function PickSheetForm(props: PicksheetFormProps) {
    // Create a ref to get the height of the matchup cards
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardHeight, setCardHeight] = useState<number>(0);

    useLayoutEffect(() => {
        const cardHeight = cardRef.current?.clientHeight || 0;
        setCardHeight(cardHeight);
    }, []);
    
    // Create an array of only the information we need for the pick information
    const initialPicks: UserPicks[] = [];
    for (let i = 1; i <= 63; i++) {
        initialPicks.push({ id: `matchup-{i}`, team: null });
    }
    const [userPicks, setUserPicks] = useState<UserPicks[]>(initialPicks)

    // Create these arrays for easier rendering
    const roundOf64 = [];
    for (let i = 0; i < 32; i++) {
        roundOf64.push(matchups[i]);
    }
    const roundOf32 = [];
    for (let i = 32; i < 48; i++) {
        roundOf32.push(matchups[i]);
    }
    const sweetSixteen = [];
    for (let i = 48; i < 56; i++) {
        sweetSixteen.push(matchups[i]);
    }
    const eliteEight = [];
    for (let i = 56; i < 60; i++) {
        eliteEight.push(matchups[i]);
    }
    const finalFour = [];
    for (let i = 60; i < 62; i++) {
        finalFour.push(matchups[i]);
    }

    return (
        <>
            <section className='section px-0'>
                <div className='container'>
                    <h1 className='title is-1'>March Madness 2024 Picksheet</h1>
                    <h2 className='subtitle'>Make sure to fill out every match below. If you would like to change your picks you can at any time prior to the below. Once the first game of the tournament has started you will be unable to change your picks</h2>
                    <h2 className='subtitle has-text-danger'>Submission cutoff: {tempDate.toLocaleDateString('en-US', { dateStyle: 'full', timeZone: 'America/New_York' })} at {tempDate.toLocaleTimeString('en-US', { timeZone: 'America/New_York' })} ET</h2>
                    
                </div>
            </section>
            <div className='columns'>
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
            <div className='columns'>
                        <div className='column'>
                            {
                                roundOf64.map((matchup, index) => {
                                    if (index === 0) {
                                        return(<MatchupCard ref={cardRef} key={`round-of-64-${index}`} {...matchup as unknown as MatchupCardProps} />);
                                    } else {
                                        return(<MatchupCard key={`round-of-64-${index}`} {...matchup as unknown as MatchupCardProps} />);
                                    }
                                })
                            }
                        </div>
                        <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                            {
                                roundOf32.map((matchup, index) => {
                                    return (
                                        <MatchupCard key={`round-of-32-${index}`} {...matchup as unknown as MatchupCardProps} />
                                    );
                                })
                            }
                        </div>
                        <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                            {
                                sweetSixteen.map((matchup, index) => {
                                    return (
                                        <MatchupCard key={`sweet-sixteen-${index}`} {...matchup as unknown as MatchupCardProps} />
                                    )
                                })
                            }
                        </div>
                        <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                            {
                                eliteEight.map((matchup, index) => {
                                    return(<MatchupCard key={`elite-eight-${index}`} {...matchup as unknown as MatchupCardProps} />);
                                })
                            }
                        </div>
                        <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                            {
                                finalFour.map((matchup, index) => {
                                    return(<MatchupCard key={`final-four-${index}`} {...matchup as unknown as MatchupCardProps} />);
                                })
                            }
                        </div>
                        <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                            <MatchupCard {...matchups[matchups.length - 1] as unknown as MatchupCardProps} />
                        </div>
                    </div>
        </>
    )
}

export default PickSheetForm;