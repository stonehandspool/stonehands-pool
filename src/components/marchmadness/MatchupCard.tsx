import { useEffect, useState } from 'react';
import { MarchMadnessMatchupInfo } from '../../constants';

type MatchupCardProps = {
    matchupInfo: MarchMadnessMatchupInfo;
    onClick: (matchupInfo: MarchMadnessMatchupInfo) => void;
}

function MatchupCard(props: MatchupCardProps) {
    const { matchupInfo, onClick } = props;
    const { topTeam, bottomTeam } = matchupInfo;
    const [selectedTeam, setSelectedTeam] = useState<MarchMadnessMatchupInfo>(matchupInfo);

    // This is so that when the picksheets state is updated the child gets those changes so prior picks can be passed through
    useEffect(() => {
        setSelectedTeam(matchupInfo);
    }, [matchupInfo]);

    const chooseTeam = (direction: 'top' | 'bottom') => {
        const matchupCopy = JSON.parse(JSON.stringify(selectedTeam));
        matchupCopy.winner = direction;
        setSelectedTeam(matchupCopy);
        onClick(matchupCopy);
    }

    return (
        <div className='box march-madness'>
            <div className='field is-clickable' onClick={() => chooseTeam('top')}>
                <div className='columns'>
                    <div className='column is-1'>
                        <span className='has-text-weight-bold is-size-7'>{topTeam.seed}</span>
                    </div>
                    <div className='column pl-2'>
                        <span
                            className={selectedTeam.winner === 'top' ? 'has-text-weight-bold' : 'has-text-weight-normal'}
                        >
                            {topTeam.name !== null ? topTeam.name : 'TBD'} {topTeam.record !== null ? `(${topTeam.record})` : ''}
                        </span>
                    </div>
                </div>
            </div>
            <div className='field is-clickable' onClick={() => chooseTeam('bottom')}>
                <div className='columns'>
                    <div className='column is-1'>
                        <span className='has-text-weight-bold is-size-7'>{bottomTeam.seed}</span>
                    </div>
                    <div className='column pl-2'>
                        <span
                            className={selectedTeam.winner === 'bottom' ? 'has-text-weight-bold' : 'has-text-weight-normal'}
                        >
                            {bottomTeam.name !== null ? bottomTeam.name : 'TBD'} {bottomTeam.record !== null ? `(${bottomTeam.record})`: ''}
                        </span>
                    </div>
                </div>
            </div>
            {/* <div style={{
                position: 'relative',
                borderColor: 'black',
                borderWidth: '2px',
                display: 'block',
                width: '10px',
                right: '-11px',
                borderRightStyle: 'solid',
                borderTopStyle: 'solid',
                height: '100%',
                top: '50%',
                }} /> */}
        </div>
    )
}

export default MatchupCard;