import { CURRENT_WEEK } from '../../constants';
import HighFiveConsensusTable from './tables/HighFiveConsensusTable';

function HighFiveReport() {
    return (
        <div className='section'>
            <div className='container'>
                <h1 className='title'>Week {CURRENT_WEEK} Consensus Report</h1>
                <HighFiveConsensusTable />
            </div>
        </div>
    );
}

export default HighFiveReport;