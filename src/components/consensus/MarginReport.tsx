import { CURRENT_WEEK } from '../../constants';
import MarginConsensusTable from './tables/MarginConsensusTable';

function MarginReport() {
    return (
        <div className='section'>
            <div className='container'>
                <h1 className='title'>Week {CURRENT_WEEK} Consensus Report</h1>
                <MarginConsensusTable />
            </div>
        </div>
    );
}

export default MarginReport;