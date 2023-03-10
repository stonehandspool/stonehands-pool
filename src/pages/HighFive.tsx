import HighFiveTable from '../components/standings/HighFiveTable';
import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';

function HighFive() {
    return(
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>High Five results as of week {CURRENT_WEEK}</h2>
                <HighFiveTable />
            </div>
        </section>
    );
}

export default HighFive;