import { useState } from "react";
import { CURRENT_YEAR, CURRENT_WEEK } from "../constants";
import MarchMadnessConsensusReport from "../components/marchmadness/Consensus";

function MarchMadnessConsensus() {
  const [activeChoice, setActiveChoice] = useState<number>(1);

  const showChoice = (choice: number) => {
    setActiveChoice(choice);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">
          {CURRENT_YEAR} Stonehands Pool
        </h1>
        <h2 className="subtitle has-text-centered">
          Consensus Reports for the pool by round
        </h2>
        <div className="tabs is-centered is-boxed">
          <ul>
            <li className={activeChoice === 1 ? "is-active" : ""}>
              <a onClick={() => { showChoice(1); }}>
                <span>Round of 64</span>
              </a>
            </li>
            <li className={activeChoice === 2 ? "is-active" : ""}>
              <a onClick={() => { showChoice(2); }}>
                <span>Round of 32</span>
              </a>
            </li>
            <li className={activeChoice === 3 ? "is-active" : ""}>
              <a onClick={() => { showChoice(3); }}>
                <span>Sweet 16</span>
              </a>
            </li>
            <li className={activeChoice === 4 ? "is-active" : ""}>
              <a onClick={() => { showChoice(4); }}>
                <span>Elite 8</span>
              </a>
            </li>
            <li className={activeChoice === 5 ? "is-active" : ""}>
              <a onClick={() => { showChoice(5); }}>
                <span>Final 4</span>
              </a>
            </li>
            <li className={activeChoice === 6 ? "is-active" : ""}>
              <a onClick={() => { showChoice(6); }}>
                <span>Final Match</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="container">
          <MarchMadnessConsensusReport round={activeChoice} />
        </div>
      </div>
    </section>
  );
}

export default MarchMadnessConsensus;
