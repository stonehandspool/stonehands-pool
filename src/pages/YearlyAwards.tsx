import { CURRENT_YEAR } from '../constants';
import accolades from '../../data/2023/accolades.json';

type AccoladeInfo = {
    id: string;
    title: string;
    description: string;
    data: any[];
}

function YearlyAwards() {
    console.log(accolades);
    const mostWins = accolades.find(accolade => accolade.id === 'mostWins') as AccoladeInfo;
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>A collection of awards, highlights, and lowlights from the 2023 season</h2>
                <h2 className='title has-text-centered'>Confidence Awards</h2>
            </div>
        </section>
    );
}

export default YearlyAwards;