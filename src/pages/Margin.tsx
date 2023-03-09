import MarginTable from '../components/standings/MarginTable';
import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';

function Margin() {
    return(
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehand Pool</h1>
                <h2 className='subtitle has-text-centered'>Margin results as of week {CURRENT_WEEK}</h2>
                <MarginTable />
            </div>
        </section>
    );
}

export default Margin;