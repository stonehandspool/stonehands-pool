import _ from 'lodash';
import { useEffect, useState } from 'react';
import { MarchMadnessMatchupInfo } from '../../constants';

type MatchupCardProps = {
    matchupInfo: MarchMadnessMatchupInfo;
    onClick: (matchupInfo: MarchMadnessMatchupInfo) => void;
}

function MatchupCard(props: MatchupCardProps) {
    const { matchupInfo, onClick } = props;
    const { topTeam, bottomTeam } = matchupInfo;
    const [selectedTeam, setSelectedTeam] = useState<'top' | 'bottom' | null>(null);
    const [currentMatchupInfo, setCurrentMatchupInfo] = useState<MarchMadnessMatchupInfo | null>(null);

    useEffect(() => {
        // If a user changes an earlier pick, we want to make sure that we de-select our current selection
        // If it has been cleared (so that TBD is no longer bolded)
        if (!_.isEqual(currentMatchupInfo, matchupInfo)) {
            // If the new matchup info is different then update our saved state of that and reset selection
            setCurrentMatchupInfo(matchupInfo);
            setSelectedTeam(null);
        }
    }, [matchupInfo]);

    const chooseTeam = (direction: 'top' | 'bottom') => {
        const matchupCopy = JSON.parse(JSON.stringify(matchupInfo));
        matchupCopy.winner = direction;
        setSelectedTeam(direction);
        onClick(matchupCopy);
    }

    return (
        <div className='box march-madness p-3 mb-3'>
            <div className='field is-clickable mb-0' onClick={() => chooseTeam('top')}>
                <div className='columns'>
                    <div className='column is-1'>
                        <span className='has-text-weight-bold is-size-7'>{topTeam.seed}</span>
                    </div>
                    <div className='column pl-2'>
                        <span
                            className={selectedTeam === 'top' ? 'has-text-weight-bold' : 'has-text-weight-normal'}
                        >
                            {topTeam.name !== null ? topTeam.name : 'TBD'} {topTeam.record !== null ? `(${topTeam.record})` : ''}
                        </span>
                    </div>
                </div>
            </div>
            <div className='field is-clickable mb-0' onClick={() => chooseTeam('bottom')}>
                <div className='columns'>
                    <div className='column is-1'>
                        <span className='has-text-weight-bold is-size-7'>{bottomTeam.seed}</span>
                    </div>
                    <div className='column pl-2'>
                        <span
                            className={selectedTeam === 'bottom' ? 'has-text-weight-bold' : 'has-text-weight-normal'}
                        >
                            {bottomTeam.name !== null ? bottomTeam.name : 'TBD'} {bottomTeam.record !== null ? `(${bottomTeam.record})`: ''}
                        </span>
                    </div>
                </div>
            </div>
            <div style={{
                content: '',
                position: 'absolute',
                borderColor: 'black',
                borderWidth: '2px',
                display: 'block',
                width: '0.75rem',
                height: '50%',
                borderRightStyle: 'solid',
                borderTopStyle: 'solid',
                top: '50%',
                right: '-10px',
                }} />
        </div>
    )
}

export default MatchupCard;