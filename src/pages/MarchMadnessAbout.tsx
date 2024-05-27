import { CURRENT_YEAR } from "../constants";

const toMoney = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  });
};

function MarchMadnessAbout() {
  // Just dummy objects to allow the examples to somewhat work
  const numPlayers = 72;
  const buyIn = 25;
  const totalPool = numPlayers * buyIn;

  const roundAmount = 50;
  const totalRounds = 50 * 5;

  // Final Payouts
  const totalFinal = totalPool - totalRounds;
  const final1 = totalFinal * 0.25;
  const final2 = totalFinal * 0.18;
  const final3 = totalFinal * 0.12;
  const final4 = totalFinal * 0.1;
  const final5 = totalFinal * 0.08;
  const final6 = totalFinal * 0.06;
  const final7 = totalFinal * 0.05;
  const final8 = totalFinal * 0.04;
  const final9 = totalFinal * 0.03;
  const final10 = totalFinal * 0.02;
  const final11 = totalFinal * 0.02;
  const final12 = totalFinal * 0.02;
  const final13 = totalFinal * 0.01;
  const final14 = totalFinal * 0.01;
  const final15 = totalFinal * 0.01;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">
          The {CURRENT_YEAR} Stonehands Pool
        </h1>
        <h2 className="subtitle has-text-centered">March Madness Pool Info</h2>
        <br /> <br />
        <h3 className="title is-3 has-text-centered">Basics</h3>
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <p className="mb-2">
              Welcome, and thanks for thinking about the Stonehands March
              Madness Bracket Pool! If you participated in the 2023-2024 NFL
              Pools, then you will not need to sign up and are welcome to fill
              out a bracket. However, if you are new to the Stonehands Pool and
              you are considering joining, then please make sure you sign up for
              the site on the <a href="/sign-up">sign up page</a> (don't forget
              to confirm your email address after signing up!). Once you have
              signed up feel free to fill out a bracket!
            </p>
            <p className="mb-2">
              The buy-in for the March Madness Pool will be $25 with the top 15
              players winning (you can see the values further down). There will
              also be 6 extra payouts to the person who gains the most points
              each round. <b>All</b> money will be paid out at the end, I don't
              keep any of it.
            </p>
            <p className="mb-2">
              You are free to submit your picksheet any time prior to the start
              of the first game of the tournament but there is a hard cutoff at
              that time! No picksheets will be accepted after the start of the
              first game, no exceptions!{" "}
              <b>
                You will also be able to modify your picks leading up to the
                start of the tournament as many times as you'd like.
              </b>
            </p>
            <p className="mb-5">
              This Pool is intended to be played by any family and friends who
              are interested! Feel free to invite any and everyone to this Pool
              as well, the more the merrier!
            </p>
          </div>
        </div>
        <h3 className="title is-3 has-text-centered">Scoring</h3>
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <p className="mb-4">
              Scoring works as followed for the March Madness Pool:
            </p>
            <ul className="mt-2">
              <li>
                <b>Round of 64:</b> Team Seed * 1
              </li>
              <li>
                <b>Round of 32:</b> Team Seed * 2
              </li>
              <li>
                <b>Sweet 16:</b> Team Seed * 4
              </li>
              <li>
                <b>Elite 8:</b> Team Seed * 8
              </li>
              <li>
                <b>Final 4:</b> Team Seed * 16
              </li>
              <li>
                <b>Finals:</b> Team Seed * 32
              </li>
            </ul>
            <p>
              As an example if you pick a 14 seed to go to the Final 4 and they
              do you will be awarded 14 points for their win in the Round of 64,
              an additional 28 points for their win in the Round of 32, 56
              points for their win in the Sweet 16, and 112 points more for
              their win in the Elite 8. This is done to encourage more ambitious
              picks and to reward those who make those picks! The standings will
              be determined by whoever has the most cumulative points based off
              of the games they pick correctly.
            </p>
          </div>
        </div>
        <h3 className="title is-3 has-text-centered">Tiebreakers</h3>
        <div className="columns is-centered mb-5">
          <div className="column is-two-thirds">
            <div className="content">
              <p>
                Here are the following tiebreakers for the pool for if/when two
                players have the same number of points:
              </p>
              <ol>
                <li>
                  The first tiebreaker will be given to the player who guessed
                  the closest <b>total</b> score of the final game
                </li>
                <ul>
                  <li>
                    You <b>can</b> guess over the total, this is not Price Is
                    Right rules, someone 1 point above the total would win the
                    tiebreaker over someone who guessed 2 points under
                  </li>
                </ul>
                <li>
                  The second tiebreaker will be the number of games guessed
                  correctly
                </li>
                <li>
                  If somehow those two tiebreakers don't choose a winner, the
                  payout will be split evenly between the two players
                </li>
              </ol>
            </div>
          </div>
        </div>
        <h3 className="title is-3 has-text-centered">Picksheets</h3>
        <div className="columns is-centered mb-5">
          <div className="column is-two-thirds">
            <div className="content">
              <ul>
                <li>
                  Picksheets must be submitted prior to the start of the
                  tournament, <b>no exceptions</b>!
                </li>
                <li>
                  You may not submit a partial picksheet to come back to later,
                  you must fill it out completely
                </li>
                <li>
                  Picksheets may be updated as many times as you'd like up until
                  the start of the tournament
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h3 className="title is-3 has-text-centered">Payouts</h3>
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <p className="mb-5">
              <b>
                Same as the Football Pools, the March Madness Pool will always
                pay out 100% of the collected buy ins. The site upkeep will be
                handled by Ryan.
              </b>
            </p>
            <h5 className="title is-5">
              <b>Buy In: </b> ${buyIn}
            </h5>
            <h5 className="title is-5">
              <b>Payment Options</b>
            </h5>
            <p>
              <b>Venmo:</b> @Glen-Fandl | Last Four Digits (if needed): 7863
            </p>
            <p>
              <b>Zelle:</b> gmf2715@outlook.com
            </p>
            <p className="has-text-danger">
              In the payment description please use the format: 'March Madness
              Stonehands for: "name(s)"'{" "}
            </p>
            <br />
            <p>
              Below is the <b>tentative</b> pay structure for the Pool, it will
              be finalized once all submissions are received. This structure is
              designed to try and provide as many ways for players to win at
              least some money back so that there's always a motivation to keep
              playing. The "Per Round" payout will be given to whichever player
              gains the most points in that round. If there is a tie in that
              round then the money will be split between the winners.
              <b>All</b> payouts will be made at the end of the tournament.
            </p>
            <br />
            <h5 className="title is-5">
              Season Payout Structure w/ {numPlayers} members
            </h5>
            <p>
              <b>Total Pool Members: </b> {numPlayers}
            </p>
            <p>
              <b>Total Pot: </b> {toMoney(totalPool)}
            </p>
            <p>
              <b>Final Standings Pot: </b> {toMoney(totalFinal)}
            </p>
            <p>
              <b>Per Round Pot: </b> {toMoney(totalRounds)}
            </p>
            <br />

            <p>
              <b>Payout Amounts:</b>
            </p>
            <div className="columns">
              <div className="column is-narrow">
                <p>
                  <b>Final Standings Payouts:</b>
                </p>
                <br />
                <p>
                  <b>
                    1<sup>st</sup>:{" "}
                  </b>
                  {toMoney(final1)} (25%)
                </p>
                <p>
                  <b>
                    2<sup>nd</sup>:{" "}
                  </b>
                  {toMoney(final2)} (18%)
                </p>
                <p>
                  <b>
                    3<sup>rd</sup>:{" "}
                  </b>
                  {toMoney(final3)} (12%)
                </p>
                <p>
                  <b>
                    4<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final4)} (10%)
                </p>
                <p>
                  <b>
                    5<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final5)} (8%)
                </p>
                <p>
                  <b>
                    6<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final6)} (6%)
                </p>
                <p>
                  <b>
                    7<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final7)} (5%)
                </p>
                <p>
                  <b>
                    8<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final8)} (4%)
                </p>
                <p>
                  <b>
                    9<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final9)} (3%)
                </p>
                <p>
                  <b>
                    10<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final10)} (2%)
                </p>
                <p>
                  <b>
                    11<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final11)} (2%)
                </p>
                <p>
                  <b>
                    12<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final12)} (2%)
                </p>
                <p>
                  <b>
                    13<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final13)} (1%)
                </p>
                <p>
                  <b>
                    14<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final14)} (1%)
                </p>
                <p>
                  <b>
                    15<sup>th</sup>:{" "}
                  </b>
                  {toMoney(final15)} (1%)
                </p>
              </div>
              <div className="column is-narrow">
                <p>
                  <b>Per Round Payouts:</b>
                </p>
                <br />
                <p>
                  <b>
                    1<sup>st</sup> Round:{" "}
                  </b>
                  {toMoney(roundAmount)}
                </p>
                <p>
                  <b>
                    2<sup>nd</sup> Round:{" "}
                  </b>
                  {toMoney(roundAmount)}
                </p>
                <p>
                  <b>
                    3<sup>rd</sup> Round:{" "}
                  </b>
                  {toMoney(roundAmount)}
                </p>
                <p>
                  <b>
                    4<sup>th</sup> Round:{" "}
                  </b>
                  {toMoney(roundAmount)}
                </p>
                <p>
                  <b>
                    5<sup>th</sup> Round:{" "}
                  </b>
                  {toMoney(roundAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="title is-3 has-text-centered">FAQs</h3>
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <h5 className="title is-5">How do I sign in?</h5>
            <p className="mb-5">
              The website is intentionally designed so that you don't need to be
              signed in to view anything except for the picksheet. The website
              will *magically* remember who you are every time you visit
              assuming you are on the same device and browser. If you somehow
              get signed out or try to make your picks from a new device (i.e.
              not your usual phone or laptop), you will be asked to sign back in
              when you go to make your picks.
            </p>

            <h5 className="title is-5">How do I pay?</h5>
            <p className="mb-5">
              You can view the specific details in the above "Payouts" section,
              but we currently only accept payment via Venmo or Zelle.
            </p>
            <h5 className="title is-5">When should I pay by?</h5>
            <p className="mb-5">
              <b>
                I ask that everyone pays prior to the start of the tournament.
              </b>{" "}
              If payments aren't received by the start of the{" "}
              <b>round of 64 (1st round)</b> then I will reach out to you. If
              payment is not received by the start of the{" "}
              <b>round of 32 (2nd round)</b>, then you will be disqualified (and
              put on double secret probation) from the pool.
            </p>
            <h5 className="title is-5">When will I receive my winnings?</h5>
            <p className="mb-5">
              Winnings will be paid out at the end of the tournament, no
              exceptions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarchMadnessAbout;
