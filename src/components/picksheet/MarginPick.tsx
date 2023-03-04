import { useState } from 'react';
import { dummyData, ValidPicks } from '../../temp/dummyData';
import PickOneTeam from './PickOneTeam';

function MarginPicks() {
    const [selectedTeam, setSelectedTeam] = useState<ValidPicks | null>(null);

    const handleSelection = (team: ValidPicks) => {
        setSelectedTeam(team);
    };

    return (
        <div className='margin-picks'>
            {
                dummyData.map(({ homeTeam, awayTeam }, index) => (
                    <PickOneTeam
                        key={`card-${index}`}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        matchupNumber={index}
                        name={'margin-pick'}
                        selectedTeam={selectedTeam}
                        handleSelection={handleSelection}
                    />
                ))
            }
        </div>
    );
}

export default MarginPicks;