import MarchMadnessTeamsRemainingTable from '../components/marchmadness/TeamsRemaining';
import { CURRENT_YEAR } from '../constants';

function MarchMadnessTeamsRemaining() {
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>March Madness Standings</h2>
                <MarchMadnessTeamsRemainingTable />
            </div>
        </section>
    );
}

export default MarchMadnessTeamsRemaining;