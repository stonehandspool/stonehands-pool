import { CURRENT_WEEK } from '../../constants';
import SurvivorConsensusTable from './tables/SurvivorConsensusTable';

function SurvivorReport() {
    return (
        <div className='section'>
            <div className='container pb-6'>
                <h1 className='title'>Week {CURRENT_WEEK} Consensus Report</h1>
                <SurvivorConsensusTable />              
            </div>
        </div>
    );
}

export default SurvivorReport;