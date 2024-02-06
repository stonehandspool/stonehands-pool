import { useParams } from "react-router-dom";
import DisplayCard from '../components/marchmadness/DisplayCard';
import { CURRENT_YEAR, MarchMadnessPlayerInfo } from '../constants';
import playerPicks from '../../data/2024/marchmadness/playerPicks.json';

function UserBracket() {
    const { username } = useParams();

    const playerInfo = playerPicks.find((pickInfo) => pickInfo.username === username) as unknown as MarchMadnessPlayerInfo;
    console.log('hi', playerInfo);

    if (!playerInfo) {
        return (
            <h1>Something went wrong!</h1>
        )
    }

    const { userPicks } = playerInfo;

    return (
        <section className='section px-0'>
            <section className='section px-0'>
                <div className='container'>
                    <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                    <h2 className='subtitle has-text-centered'>March Madness Bracket for <b>{playerInfo?.firstName} {playerInfo?.lastName}</b></h2>
                </div>
            </section>
            <section className='section px-0 pt-0'>
                <div className='columns px-6'>
                    <div className='column is-narrow is-flex is-flex-direction-column is-justify-content-space-around'>
                        <p style={{ visibility: 'hidden', writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>A</b></p>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Round of 64</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Round of 32</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Sweet Sixteen</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Elite Eight</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Final Four</h4>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>Finals</h4>
                    </div>
                </div>
                <div className='columns px-6'>
                    <div className='column is-narrow is-flex is-flex-direction-column is-justify-content-space-around'>
                        <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>WEST</b></p>
                        <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>EAST</b></p>
                        <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>SOUTH</b></p>
                        <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}><b>MIDWEST</b></p>
                    </div>
                    <div className='column'>
                        {
                            Array.from(Array(32).keys()).map((index) => {
                                return (
                                    <DisplayCard key={`round-of-64-${index}`} customClass='first-col' matchupInfo={userPicks[index]} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        {
                            Array.from(Array(16).keys()).map((index) => {
                                return (
                                    <DisplayCard key={`round-of-64-${index}`} customClass='col-2' matchupInfo={userPicks[32 + index]} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        {
                            Array.from(Array(8).keys()).map((index) => {
                                return (
                                    <DisplayCard key={`round-of-64-${index}`} customClass='col-3' matchupInfo={userPicks[48 + index]} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        {
                            Array.from(Array(4).keys()).map((index) => {
                                return (
                                    <DisplayCard key={`round-of-64-${index}`} customClass='col-4' matchupInfo={userPicks[56 + index]} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        {
                            Array.from(Array(2).keys()).map((index) => {
                                return (
                                    <DisplayCard key={`round-of-64-${index}`} customClass='col-5' matchupInfo={userPicks[60 + index]} />
                                )
                            })
                        }
                    </div>
                    <div className='column is-flex is-flex-direction-column is-justify-content-space-around'>
                        <DisplayCard customClass='last-col' matchupInfo={userPicks[userPicks.length - 1]} />
                    </div>
                </div>
            </section>
        </section>
    );
}

export default UserBracket;