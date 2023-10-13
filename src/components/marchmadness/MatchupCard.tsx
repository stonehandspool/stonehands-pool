import { forwardRef, useState } from 'react';

type TeamInfo = {
    seed: number | null;
    name: string | null;
    record: string | null;
}

export type MatchupCardProps = {
    id: string;
    topTeam: TeamInfo;
    bottomTeam: TeamInfo;
    topScore: number | null;
    bottomScore: number | null;
    winner: 'top' | 'bottom' | null;
    nextMatchup: string;
};

const MatchupCard = forwardRef<HTMLDivElement, MatchupCardProps>((props: MatchupCardProps, ref) => {
    const { topTeam, bottomTeam } = props;
    const [selectedTeam, setSelectedTeam] = useState<TeamInfo | null>(null);

    const onClick = (direction: 'top' | 'bottom') => {
        console.log('hey', direction);
        if (direction === 'bottom') {
            setSelectedTeam(bottomTeam);
        } else {
            setSelectedTeam(topTeam);
        }
    }

    return (
        <div className='box' ref={ref}>
            <div className='field is-clickable' onClick={() => onClick('top')}>
                <div className='columns'>
                    <div className='column is-1'>
                        <span className='has-text-weight-bold is-size-7'>{topTeam.seed}</span>
                    </div>
                    <div className='column pl-2'>
                        <span
                            className={selectedTeam?.name === topTeam.name ? 'has-text-weight-bold' : 'has-text-weight-normal'}
                        >
                            {topTeam.name} ({topTeam.record})
                        </span>
                    </div>
                </div>
            </div>
            <div className='field is-clickable' onClick={() => onClick('bottom')}>
                <div className='columns'>
                    <div className='column is-1'>
                        <span className='has-text-weight-bold is-size-7'>{bottomTeam.seed}</span>
                    </div>
                    <div className='column pl-2'>
                        <span
                            className={selectedTeam?.name === bottomTeam.name ? 'has-text-weight-bold' : 'has-text-weight-normal'}
                        >
                            {bottomTeam.name} ({bottomTeam.record})
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default MatchupCard;