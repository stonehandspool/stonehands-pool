import { useState } from 'react';
import SeasonStandingsTable from '../components/standings/SeasonStandingsTable';

import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';

function SeasonStandings() {
    const [notificationVisible, setNotificationVisible] = useState(true);

    const removeNotification = () => {
        setNotificationVisible(false);
    };

    // TODO: remove the notification after week 2 or 3
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>Season standings as of week {CURRENT_WEEK}</h2>
                {
                    notificationVisible &&
                    <div className='columns is-centered'>
                        <div className='column is-half'>
                            <div className='notification is-info is-narrow'>
                                <button className='delete' onClick={removeNotification}></button>
                                If you'd like to see a players in-depth season stats you can click on their name!
                            </div>
                        </div>
                    </div>
                }
                <SeasonStandingsTable />
            </div>
        </section>
    );
}

export default SeasonStandings;