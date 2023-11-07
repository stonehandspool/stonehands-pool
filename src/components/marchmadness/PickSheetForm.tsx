import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import MatchupCard from './MatchupCard';
import { MarchMadnessMatchupInfo, MarchMadnessTeamInfo } from '../../constants';
import matchups from '../../../data/2024/marchmadness/matchups.json';

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
    // Create an array of only the information we need for the pick information
    const initialPicks: MarchMadnessMatchupInfo[] = [];
    for (let i = 0; i < matchups.length; i++) {
        initialPicks.push(matchups[i]);
    }
    const [userPicks, setUserPicks] = useState<MarchMadnessMatchupInfo[]>(initialPicks);

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
        const picksCopy = JSON.parse(JSON.stringify(userPicks)) as MarchMadnessMatchupInfo[];
        if (idNum % 2 === 1) {
            // If it is an odd number, that means it is the top matchup so the next matchup needs to get its `topTeam` prop changed
            const nextIndex = picksCopy.findIndex((matchups: MarchMadnessMatchupInfo) => matchups.id === nextMatchup);
            picksCopy[nextIndex].topTeam = winner === 'top' ? topTeam : bottomTeam;
            picksCopy[nextIndex].winner = null; // Reset this so that the newly selected team isn't marked as a winner
            const teamToClear: string = winner === 'top' ? bottomTeam.name as string : topTeam.name as string;
            clearGamesAfter(picksCopy, nextIndex, teamToClear);
            setUserPicks(picksCopy);
        } else {
            // If it is an even number, that means it is the top matchup so the next matchup needs to get its `bottomTeam` prop changed
            const nextIndex = picksCopy.findIndex((matchups: MarchMadnessMatchupInfo) => matchups.id === nextMatchup);
            picksCopy[nextIndex].bottomTeam = winner === 'top' ? topTeam : bottomTeam;
            picksCopy[nextIndex].winner = null; // Reset this so that the newly selected team isn't marked as a winner
            const teamToClear: string = winner === 'top' ? bottomTeam.name as string : topTeam.name as string;
            clearGamesAfter(picksCopy, nextIndex, teamToClear);
            setUserPicks(picksCopy);
        }
    };

    return (
        <>
            <section className='section px-0'>
                <div className='container'>
                    <h1 className='title is-1'>March Madness 2024 Picksheet</h1>
                    <h2 className='subtitle'>Make sure to fill out every match below. If you would like to change your picks you can at any time prior to the below. Once the first game of the tournament has started you will be unable to change your picks</h2>
                    <h2 className='subtitle has-text-danger'>Submission cutoff: {tempDate.toLocaleDateString('en-US', { dateStyle: 'full', timeZone: 'America/New_York' })} at {tempDate.toLocaleTimeString('en-US', { timeZone: 'America/New_York' })} ET</h2>
                </div>
            </section>
            <div className='columns px-6'>
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
                <div className='column' style={{ borderRight: '1px dashed #d6d6d6' }}>
                    {
                        Array.from(Array(32).keys()).map((index) => {
                            return (
                                <MatchupCard key={`round-of-64-${index}`} matchupInfo={userPicks[index]} onClick={handleClick} />
                            )
                        })
                    }
                </div>
                <div className='column is-flex is-flex-direction-column is-justify-content-space-around' style={{ borderRight: '1px dashed #d6d6d6' }}>
                    {
                        Array.from(Array(16).keys()).map((index) => {
                            return (
                                <MatchupCard key={`round-of-64-${index}`} matchupInfo={userPicks[32 + index]} onClick={handleClick} />
                            )
                        })
                    }
                </div>
                <div className='column is-flex is-flex-direction-column is-justify-content-space-around' style={{ borderRight: '1px dashed #d6d6d6' }}>
                    {
                        Array.from(Array(8).keys()).map((index) => {
                            return (
                                <MatchupCard key={`round-of-64-${index}`} matchupInfo={userPicks[48 + index]} onClick={handleClick} />
                            )
                        })
                    }
                </div>
                <div className='column is-flex is-flex-direction-column is-justify-content-space-around' style={{ borderRight: '1px dashed #d6d6d6' }}>
                    {
                        Array.from(Array(4).keys()).map((index) => {
                            return (
                                <MatchupCard key={`round-of-64-${index}`} matchupInfo={userPicks[56 + index]} onClick={handleClick} />
                            )
                        })
                    }
                </div>
                <div className='column is-flex is-flex-direction-column is-justify-content-space-around' style={{ borderRight: '1px dashed #d6d6d6' }}>
                    {
                        Array.from(Array(2).keys()).map((index) => {
                            return (
                                <MatchupCard key={`round-of-64-${index}`} matchupInfo={userPicks[60 + index]} onClick={handleClick} />
                            )
                        })
                    }
                </div>
                <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                    <MatchupCard matchupInfo={userPicks[userPicks.length - 1]} onClick={handleClick} />
                </div>
            </div>
        </>
    )
}

export default PickSheetForm;