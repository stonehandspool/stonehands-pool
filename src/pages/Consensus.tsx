import { useState } from 'react';
import ConfidenceReport from '../components/consensus/ConfidenceReport';
import HighFiveReport from '../components/consensus/HighFiveReport';
import MarginReport from '../components/consensus/MarginReport';
import SurvivorReport from '../components/consensus/SurvivorReport';
import { CURRENT_YEAR, CURRENT_WEEK } from '../constants';

enum Pools {
    Confidence,
    Survivor,
    Margin,
    HighFive,
};

function Consensus() {
    const [activeChoice, setActiveChoice] = useState(Pools.Confidence);
    
    const showChoice = (choice: Pools) => {
        setActiveChoice(choice);
    };

    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>{CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>Consensus Reports for the pool (Season and Week {CURRENT_WEEK})</h2>
                <div className='tabs is-centered is-boxed'>
                    <ul>
                        <li className={activeChoice === Pools.Confidence ? 'is-active' : ''}>
                            <a onClick={() => showChoice(Pools.Confidence)}>
                                <span>Confidence</span>
                            </a>
                        </li>
                        <li className={activeChoice === Pools.Survivor ? 'is-active' : ''}>
                            <a onClick={() => showChoice(Pools.Survivor)}>
                                <span>Survivor</span>
                            </a>
                        </li>
                        <li className={activeChoice === Pools.Margin ? 'is-active' : ''}>
                            <a onClick={() => showChoice(Pools.Margin)}>
                                <span>Margin</span>
                            </a>
                        </li>
                        <li className={activeChoice === Pools.HighFive ? 'is-active' : ''}>
                            <a onClick={() => showChoice(Pools.HighFive)}>
                                <span>High-Five</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='container'>
                    {activeChoice === Pools.Confidence && <ConfidenceReport />}
                    {activeChoice === Pools.Survivor && <SurvivorReport />}
                    {activeChoice === Pools.Margin && <MarginReport />}
                    {activeChoice === Pools.HighFive && <HighFiveReport />}
                </div>
            </div>
        </section>
    );
}

export default Consensus;