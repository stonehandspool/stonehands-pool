import * as seasonStandings from '../../data/2023/players.json';
import SurvivorTable from '../components/standings/SurvivorTable';
import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';

function Survivor(){
    const { players } = seasonStandings;
    const numStarted = players.length;
    const numRemaining = players.filter(player => player.aliveInSurvivor).length;
    return(
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>Survivor results as of week {CURRENT_WEEK}</h2>
                {/* Keeping this table code here for now in case I end up wanting it */}
                {/* <table className='table is-bordered is-narrow mx-auto has-text-centered'>
                    <thead>
                        <tr>
                            <td>Pool Size</td>
                            <td>Survivors</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{numStarted}</td>
                            <td>{numRemaining}</td>
                        </tr>
                    </tbody>
                </table> */}
                <div className='columns'>
                    <div className='column is-half is-offset-one-quarter'>
                        <div className='columns'>
                            <div className='column has-text-centered'>
                                <div>
                                    <p className='heading'>Pool Size</p>
                                    <p className='title'>{numStarted}</p>
                                </div>
                            </div>
                            <div className='column has-text-centered'>
                                <div>
                                    <p className='heading'>Remaining</p>
                                    <p className='title'>{numRemaining}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SurvivorTable />
            </div>
        </section>
    );
}

export default Survivor;