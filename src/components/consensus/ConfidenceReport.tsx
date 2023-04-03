import { CURRENT_WEEK } from '../../constants';
import ConfidenceWeeklyConsensusTable from './tables/ConfidenceWeeklyConsensusTable';
import ConfidenceYearlyConsensusTable from './tables/ConfidenceYearlyConsensusTable';

function ConfidenceReport() {

    return (
        <div className='section'>
            <div className='container pb-6'>
                <h1 className='title'>Week {CURRENT_WEEK} Consensus Report</h1>
                <ConfidenceWeeklyConsensusTable />                
            </div>
            <div className='container'>
                <h1 className='title'>Yearly Consensus Report</h1>
                <ConfidenceYearlyConsensusTable />
            </div>
        </div>
    );
}

export default ConfidenceReport;