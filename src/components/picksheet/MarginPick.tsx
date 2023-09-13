import PickOneTeam from './PickOneTeam';

function MarginPicks(props: any) {
    const { weekInfo, userInfo, marginTeam, handleMarginSelection } = props;

    const findMatchupByTeam = (team: string) => {
        const matchupId = Object.keys(weekInfo).find((matchup: any) => weekInfo[matchup].home_team === team || weekInfo[matchup].away_team === team);
        return matchupId !== undefined ? weekInfo[matchupId] : null;
    };

    // See if the priorPick from this week has already happened (e.g. if their pick was the Thurs game and its now Fri)
    const priorPickMatchupInfo = findMatchupByTeam(marginTeam);
    const priorPickGameCompleted = priorPickMatchupInfo && priorPickMatchupInfo.winner !== '' ? true : false;
    const currentTime = new Date();

    return (
        <div className='container pb-6'>
            <h3 className='title is-3'>Margin Pick:</h3>
            <h4 className='subtitle'>
                Pick one team each week that you think will win by the most. If you are right, that teams winning margin is added to your margin pool score.
                If you are wrong, that teams losing margin is subtracted from your margin pool score. You can only choose each team <b>once</b> in the margin pool,
                so choose carefully! You cannot be eliminated from this pool.
            </h4>
            {priorPickGameCompleted && <h6 className='subtitle is-6 has-text-danger'>Your choice from this week has already played their game. you can no longer change your pick</h6>}
            <div className='columns is-multiline'>
                {
                    Object.keys(weekInfo).map((matchup, index) => (
                        <div className='column is-one-quarter' key={`margin-container-${index}`}>
                            <PickOneTeam
                                key={`card-${index}`}
                                homeTeam={weekInfo[matchup].home_team}
                                awayTeam={weekInfo[matchup].away_team}
                                gameInfo={weekInfo[matchup].gameInfo}
                                gameStarted={currentTime > new Date(weekInfo[matchup].time)}
                                gameCompleted={weekInfo[matchup].winner !== ''}
                                matchupNumber={index}
                                name={'margin-pick'}
                                selectedTeam={marginTeam}
                                handleSelection={handleMarginSelection}
                                priorMarginPicks={userInfo.marginPicks}
                                priorPickGameCompleted={priorPickGameCompleted}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MarginPicks;