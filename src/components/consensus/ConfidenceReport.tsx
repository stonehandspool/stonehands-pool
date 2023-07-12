import { CURRENT_WEEK, CURRENT_WEEK_CUTOFF_TIME, CURRENT_WEEK_STATUS } from '../../constants';
import ConfidenceWeeklyConsensusTable from './tables/ConfidenceWeeklyConsensusTable';
import ConfidenceYearlyConsensusTable from './tables/ConfidenceYearlyConsensusTable';

function ConfidenceReport() {
    // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
    // can't see what people have chosen prior to the cutoff happening
    const currentTime = new Date();
    const showCurrentWeek = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;
    const weekToShow = CURRENT_WEEK === 1 ? CURRENT_WEEK : showCurrentWeek ? CURRENT_WEEK : CURRENT_WEEK - 1;

    return (
        <div className='section'>
            <div className='container pb-6'>
                <h1 className='title'>Week {weekToShow} Consensus Report</h1>
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