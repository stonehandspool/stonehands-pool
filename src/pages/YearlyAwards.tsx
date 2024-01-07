import { CURRENT_YEAR } from '../constants';
import accolades from '../../data/2023/accolades.json';

type AccoladeInfo = {
    id: string;
    title: string;
    description: string;
    data: any[];
}

function getEnding(place: number) {
    const lastDigit = +place.toString().slice(-1);
    if (lastDigit === 1 && place != 11) {
        return 'st';
    } else if (lastDigit === 2 && place != 12) {
        return 'nd';
    } else if (lastDigit === 3 && place != 13) {
        return 'rd';
    } else {
        return 'th';
    }
}

// TODO: Add in the secret mango award!!

function YearlyAwards() {
    const mostPoints = accolades.find(accolade => accolade.id === 'mostPoints') as AccoladeInfo;
    const mostWins = accolades.find(accolade => accolade.id === 'mostWins') as AccoladeInfo;
    const thursdayPoints = accolades.find(accolade => accolade.id === 'thursdayPoints') as AccoladeInfo;
    const thursdayWins = accolades.find(accolade => accolade.id === 'thursdayWins') as AccoladeInfo;
    const thursdayPointsRisked = accolades.find(accolade => accolade.id === 'thursdayPointsRisked') as AccoladeInfo;
    const thursdayEfficiency = accolades.find(accolade => accolade.id === 'thursdayEfficiency') as AccoladeInfo;
    const mondayPoints = accolades.find(accolade => accolade.id === 'mondayPoints') as AccoladeInfo;
    const mondayWins = accolades.find(accolade => accolade.id === 'mondayWins') as AccoladeInfo;
    const mondayPointsRisked = accolades.find(accolade => accolade.id === 'mondayPointsRisked') as AccoladeInfo;
    const mondayEfficiency = accolades.find(accolade => accolade.id === 'mondayEfficiency') as AccoladeInfo;
    const eagerPeople = accolades.find(accolade => accolade.id === 'eagerPeople') as AccoladeInfo;
    const loneWolf = accolades.find(accolade => accolade.id === 'loneWolf') as AccoladeInfo;
    const teamsAlwaysPicked = accolades.find(accolade => accolade.id === 'teamsAlwaysPicked') as AccoladeInfo;
    const teamsNeverPicked = accolades.find(accolade => accolade.id === 'teamsNeverPicked') as AccoladeInfo;
    const forgetfulPeople = accolades.find(accolade => accolade.id === 'forgetfulPeople') as AccoladeInfo;
    const leastEagerPeople = accolades.find(accolade => accolade.id === 'leastEagerPeople') as AccoladeInfo;
    const leastPointsInWeek = accolades.find(accolade => accolade.id === 'leastPointsInWeek') as AccoladeInfo;
    const loneLoser = accolades.find(accolade => accolade.id === 'loneLoser') as AccoladeInfo;
    console.log(accolades);
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>A collection of awards, highlights, and lowlights from the 2023 season</h2>
                <br /><br />
                <h3 className='title is-1 has-text-centered'>Confidence Awards</h3>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{mostPoints.title}</h2>
                        <h3 className='subtitle has-text-centered'>{mostPoints.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Points</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mostPoints.data.map((info, index) => {
                                        return <tr key={`${info.username}-mostWins`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.points}</b></td>
                                            <td>{info.wins}</td>
                                            <td>{info.losses}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{mostWins.title}</h2>
                        <h3 className='subtitle has-text-centered'>{mostWins.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mostWins.data.map((info, index) => {
                                        return <tr key={`${info.username}-mostWins`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.wins}</b></td>
                                            <td>{info.losses}</td>
                                            <td>{info.points}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <h3 className='title is-2 has-text-centered'>Thursday Performance</h3>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{thursdayPoints.title}</h2>
                        <h3 className='subtitle has-text-centered'>{thursdayPoints.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Points</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    thursdayPoints.data.map((info, index) => {
                                        return <tr key={`${info.userId}-thursdayPoints`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.totalPoints}</b></td>
                                            <td>{info.timesCorrect}</td>
                                            <td>{info.timesIncorrect}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{thursdayWins.title}</h2>
                        <h3 className='subtitle has-text-centered'>{thursdayWins.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    thursdayWins.data.map((info, index) => {
                                        return <tr key={`${info.userId}-thursdayWins`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.timesCorrect}</b></td>
                                            <td>{info.timesIncorrect}</td>
                                            <td>{info.totalPoints}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{thursdayPointsRisked.title}</h2>
                        <h3 className='subtitle has-text-centered'>{thursdayPointsRisked.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Points<br /> Risked</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    thursdayPointsRisked.data.map((info, index) => {
                                        return <tr key={`${info.userId}-thursdayPointsRisked`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.pointsRisked}</b></td>
                                            <td>{info.timesCorrect}</td>
                                            <td>{info.timesIncorrect}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{thursdayEfficiency.title}</h2>
                        <h3 className='subtitle has-text-centered'>{thursdayEfficiency.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Efficiency</th>
                                    <th>Points</th>
                                    <th>Points <br /> Risked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    thursdayEfficiency.data.map((info, index) => {
                                        return <tr key={`${info.userId}-thursdayEfficiency`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.efficiency}%</b></td>
                                            <td>{info.totalPoints}</td>
                                            <td>{info.pointsRisked}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <h3 className='title is-2 has-text-centered'>Monday Performance</h3>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{mondayPoints.title}</h2>
                        <h3 className='subtitle has-text-centered'>{mondayPoints.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Points</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mondayPoints.data.map((info, index) => {
                                        return <tr key={`${info.userId}-mondayPoints`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.totalPoints}</b></td>
                                            <td>{info.timesCorrect}</td>
                                            <td>{info.timesIncorrect}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{mondayWins.title}</h2>
                        <h3 className='subtitle has-text-centered'>{mondayWins.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mondayWins.data.map((info, index) => {
                                        return <tr key={`${info.userId}-mondayWins`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.timesCorrect}</b></td>
                                            <td>{info.timesIncorrect}</td>
                                            <td>{info.totalPoints}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{mondayPointsRisked.title}</h2>
                        <h3 className='subtitle has-text-centered'>{mondayPointsRisked.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Points<br /> Risked</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mondayPointsRisked.data.map((info, index) => {
                                        return <tr key={`${info.userId}-mondayPointsRisked`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.pointsRisked}</b></td>
                                            <td>{info.timesCorrect}</td>
                                            <td>{info.timesIncorrect}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{mondayEfficiency.title}</h2>
                        <h3 className='subtitle has-text-centered'>{mondayEfficiency.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Efficiency</th>
                                    <th>Points</th>
                                    <th>Points <br /> Risked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mondayEfficiency.data.map((info, index) => {
                                        return <tr key={`${info.userId}-mondayEfficiency`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.efficiency}%</b></td>
                                            <td>{info.totalPoints}</td>
                                            <td>{info.pointsRisked}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <h3 className='title is-1 has-text-centered'>Random Awards</h3>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{eagerPeople.title}</h2>
                        <h3 className='subtitle has-text-centered'>{eagerPeople.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Average Place</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eagerPeople.data.map((info, index) => {
                                        return <tr key={`${info.userId}-eagerPeople`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{Math.round(info.average)}<sup>{getEnding(Math.round(info.average))}</sup></b></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{loneWolf.title}</h2>
                        <h3 className='subtitle has-text-centered'>{loneWolf.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loneWolf.data.map((info, index) => {
                                        return <tr key={`${info.userId}-loneWolf`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.description}</b></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{teamsAlwaysPicked.title}</h2>
                        <h3 className='subtitle has-text-centered'>{teamsAlwaysPicked.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Team</th>
                                    <th>Times Picked</th>
                                    <th>Picked By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teamsAlwaysPicked.data.map((info, index) => {
                                        return <tr key={`${info.name}-teamsAlwaysPicked`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.name}`}</td>
                                            <td><b>{info.count}</b></td>
                                            <td>{info.pickedBy.join(', ')}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{teamsNeverPicked.title}</h2>
                        <h3 className='subtitle has-text-centered'>{teamsNeverPicked.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Team</th>
                                    <th>Times Picked</th>
                                    <th>Picked By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teamsNeverPicked.data.map((info, index) => {
                                        return <tr key={`${info.name}-teamsNeverPicked`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.name}`}</td>
                                            <td><b>{info.count}</b></td>
                                            <td>{info.pickedBy.join(', ')}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <h3 className='title is-1 has-text-centered'>Lowlights from 2023</h3>
                {/* const forgetfulPeople = accolades.find(accolade => accolade.id === 'forgetfulPeople') as AccoladeInfo;
    const leastEagerPeople = accolades.find(accolade => accolade.id === 'leastEagerPeople') as AccoladeInfo;
    const leastPointsInWeek = accolades.find(accolade => accolade.id === 'leastPointsInWeek') as AccoladeInfo;
    const loneLoser = accolades.find(accolade => accolade.id === 'loneLoser') as AccoladeInfo; */}
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{forgetfulPeople.title}</h2>
                        <h3 className='subtitle has-text-centered'>{forgetfulPeople.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Times Forgotten</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    forgetfulPeople.data.map((info, index) => {
                                        return <tr key={`${info.name}-forgetfulPeople`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.timesForgotten}</b></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{leastEagerPeople.title}</h2>
                        <h3 className='subtitle has-text-centered'>{leastEagerPeople.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Average Place</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leastEagerPeople.data.map((info, index) => {
                                        return <tr key={`${info.userId}-leastEagerPeople`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{Math.round(info.average)}<sup>{getEnding(Math.round(info.average))}</sup></b></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{loneLoser.title}</h2>
                        <h3 className='subtitle has-text-centered'>{loneLoser.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loneLoser.data.map((info, index) => {
                                        return <tr key={`${info.userId}-loneLoser`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.description}</b></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='column'>
                        <h2 className='title has-text-centered'>{leastPointsInWeek.title}</h2>
                        <h3 className='subtitle has-text-centered'>{leastPointsInWeek.description}</h3>
                        <table className='table is-striped is-hoverable mx-auto'>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Points</th>
                                    <th>Week</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leastPointsInWeek.data.map((info, index) => {
                                        return <tr key={`${info.userId}-leastPointsInWeek`}>
                                            <td>{index + 1}</td>
                                            <td>{`${info.firstName} ${info.lastName}`}</td>
                                            <td><b>{info.points}</b></td>
                                            <td>{info.week}</td>
                                            <td>{info.year}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default YearlyAwards;