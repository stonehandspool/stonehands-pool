import PickOneTeam from './PickOneTeam';

function SurvivorPick(props: any) {
    const { weekInfo, userInfo, survivorTeam, handleSurvivorSelection } = props;

    const findMatchupByTeam = (team: string) => {
        const matchupId = Object.keys(weekInfo).find((matchup: any) => weekInfo[matchup].home_team === team || weekInfo[matchup].away_team === team);
        return matchupId !== undefined ? weekInfo[matchupId] : null;
    };

    // See if the priorPick from this week has already happened (e.g. if their pick was the Thurs game and its now Fri)
    const priorPickMatchupInfo = findMatchupByTeam(survivorTeam);
    const priorPickGameCompleted = priorPickMatchupInfo && priorPickMatchupInfo.winner !== '' ? true : false;

    return (
        <div className='container pb-6'>
        <h3 className='title is-3'>Survivor Pick:</h3>
        {   userInfo.aliveInSurvivor &&
            <>
                <h4 className='subtitle'>
                    Pick one team each week that you are certain will win. You can only pick each team <b>once</b>. If you are right
                    you will continue on to the next week, if you are wrong you are eliminated from the survivor pool, so be careful!
                </h4>
                {priorPickGameCompleted && <h6 className='subtitle is-6 has-text-danger'>Your choice from this week has already played their game. you can no longer change your pick</h6>}
                <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => (
                        <div className='column is-one-quarter' key={`survivor-container-${index}`}>
                            <PickOneTeam
                                key={`card-${index}`}
                                homeTeam={weekInfo[matchup].home_team}
                                awayTeam={weekInfo[matchup].away_team}
                                gameInfo={weekInfo[matchup].gameInfo}
                                gameCompleted={weekInfo[matchup].winner !== ''}
                                matchupNumber={index}
                                name={'survivor-pick'}
                                selectedTeam={survivorTeam}
                                handleSelection={handleSurvivorSelection}
                                priorSurvivorPicks={userInfo.survivorPicks}
                                priorPickGameCompleted={priorPickGameCompleted}
                            />
                        </div>
                    ))
                }
                </div>
            </>
        }
        {
            !userInfo.aliveInSurvivor &&
            <h4 className='subtitle'>Sorry, you are no longer in the survivor pool, maybe next year!</h4>
        }
        </div>
    );
}

export default SurvivorPick;