import { MarchMadnessMatchupInfo } from '../../constants';

type DisplayCardProps = {
    matchupInfo: MarchMadnessMatchupInfo;
    customClass?: string;
    topTeamAlive: boolean;
    bottomTeamAlive: boolean;
    upToDateMatchupInfo: MarchMadnessMatchupInfo;
}

function DisplayCard(props: DisplayCardProps) {
    const { matchupInfo, customClass = '', topTeamAlive, bottomTeamAlive, upToDateMatchupInfo } = props;
    const { topTeam, bottomTeam, winner } = matchupInfo;
    const { winner: actualWinner, topScore, bottomScore } = upToDateMatchupInfo;

    let topTeamColor;
    let bottomTeamColor;
    if (actualWinner === null && topTeamAlive && bottomTeamAlive) {
        // If the match hasn't happened yet and both teams are still alive
        topTeamColor = 'has-text-black';
        bottomTeamColor = 'has-text-black';
    } else if (actualWinner === null) {
        // If the match hasn't happened yet but one (or more) of the teams have been eliminated
        topTeamColor = topTeamAlive ? 'has-text-black' : 'has-text-danger';
        bottomTeamColor = bottomTeamAlive ? 'has-text-black' : 'has-text-danger';
    } else if (actualWinner !== null) {
        // If the match has been completed, mark your choice as either red/green and other team stays black
        if (winner === 'top') {
            topTeamColor = actualWinner === 'top' ? 'has-text-success' : 'has-text-danger';
            bottomTeamColor = 'has-text-black';
        } else {
            topTeamColor = 'has-text-black';
            bottomTeamColor = actualWinner === 'bottom' ? 'has-text-success' : 'has-text-danger';
        }
    }

    const topTeamWeight = winner === 'top' ? 'has-text-weight-bold' : 'has-text-weight-normal';
    const bottomTeamWeight = winner === 'bottom' ? 'has-text-weight-bold' : 'has-text-weight-normal';

    return (
        <div className={`box march-madness ${customClass} p-3 mb-3`}>
            <div className='field mb-0'>
                <div className='columns'>
                    <div className='column is-1'>
                        <span className='has-text-weight-bold is-size-7'>{topTeam.seed}</span>
                    </div>
                    <div className='column pl-2'>
                        <span className={`${topTeamWeight} ${topTeamColor}`}>
                            {topTeamAlive && <>{topTeam.name} {`(${topTeam.record})`}</>}
                            {(!topTeamAlive && topTeamColor === 'has-text-danger') && <s>{topTeam.name} {`(${topTeam.record})`}</s>}
                            {(!topTeamAlive && topTeamColor === 'has-text-black') && <>{topTeam.name} {`(${topTeam.record})`}</>}
                        </span>
                    </div>
                    {
                        actualWinner !== null && (
                            <div className='column is-narrow is-align-self-flex-end'>
                                {actualWinner === 'top' && <span><b>{topScore}</b></span>}
                                {actualWinner === 'bottom' && <span>{topScore}</span>}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='field mb-0'>
                <div className='columns'>
                    <div className='column is-1'>
                        <span className='has-text-weight-bold is-size-7'>{bottomTeam.seed}</span>
                    </div>
                    <div className='column pl-2'>
                        <span className={`${bottomTeamWeight} ${bottomTeamColor}`}>
                            {bottomTeamAlive && <>{bottomTeam.name} {`(${bottomTeam.record})`}</>}
                            {(!bottomTeamAlive && bottomTeamColor === 'has-text-danger') && <s>{bottomTeam.name} {`(${bottomTeam.record})`}</s>}
                            {(!bottomTeamAlive && bottomTeamColor === 'has-text-black') && <>{bottomTeam.name} {`(${bottomTeam.record})`}</>}
                        </span>
                    </div>
                    {
                        actualWinner !== null && (
                            <div className='column is-narrow is-align-self-flex-end'>
                                {actualWinner === 'bottom' && <span><b>{bottomScore}</b></span>}
                                {actualWinner === 'top' && <span>{bottomScore}</span>}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default DisplayCard;