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

function MarchMadnessPayouts() {
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
        <h2 className="subtitle has-text-centered">
          March Madness Payouts for {CURRENT_YEAR}
        </h2>
        <br /> <br />
        <div className="columns">
          <div className="column">
            <h3 className="title is-3 has-text-centered">Top 15 Payouts</h3>
            <table className="table mx-auto">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td></td>
                  <th>{toMoney(totalFinal)}</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>
                    <b>
                      1<sup>st</sup>
                    </b>
                  </td>
                  <td>Alissa Onofrio</td>
                  <td>{toMoney(final1)} (25%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      2<sup>nd</sup>
                    </b>
                  </td>
                  <td>Bobby Crimmins</td>
                  <td>{toMoney(final2)} (18%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      3<sup>rd</sup>
                    </b>
                  </td>
                  <td>Cindy Dolan</td>
                  <td>{toMoney(final3)} (12%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      4<sup>th</sup>
                    </b>
                  </td>
                  <td>Jeff Fandl</td>
                  <td>{toMoney(final4)} (10%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      5<sup>th</sup>
                    </b>
                  </td>
                  <td>Kailey Fandl</td>
                  <td>{toMoney(final5)} (8%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      6<sup>th</sup>
                    </b>
                  </td>
                  <td>Nicole Tseng</td>
                  <td>{toMoney(final6)} (6%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      7<sup>th</sup>
                    </b>
                  </td>
                  <td>Rachel Templeton</td>
                  <td>{toMoney(final7)} (5%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      8<sup>th</sup>
                    </b>
                  </td>
                  <td>William Silva</td>
                  <td>{toMoney(final8)} (4%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      9<sup>th</sup>
                    </b>
                  </td>
                  <td>Peter Nargi</td>
                  <td>{toMoney(final9)} (3%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      10<sup>th</sup>
                    </b>
                  </td>
                  <td>Mark Maltz</td>
                  <td>{toMoney(final10)} (2%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      11<sup>th</sup>
                    </b>
                  </td>
                  <td>John Blake</td>
                  <td>{toMoney(final11)} (2%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      12<sup>th</sup>
                    </b>
                  </td>
                  <td>Arthur Kroner</td>
                  <td>{toMoney(final12)} (2%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      13<sup>th</sup>
                    </b>
                  </td>
                  <td>Alex Gugliada</td>
                  <td>{toMoney(final13)} (1%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      14<sup>th</sup>
                    </b>
                  </td>
                  <td>Tom Hellen</td>
                  <td>{toMoney(final14)} (1%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      15<sup>th</sup>
                    </b>
                  </td>
                  <td>Paige Seitz</td>
                  <td>{toMoney(final15)} (1%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="column">
            <h3 className="title is-3 has-text-centered">Per Round Payouts</h3>
            <table className="table mx-auto">
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Name</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td></td>
                  <th>{toMoney(totalRounds)}</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>
                    <b>
                      1<sup>st</sup>
                    </b>
                  </td>
                  <td>Paige Seitz</td>
                  <td>{toMoney(roundAmount)}</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      2<sup>nd</sup>
                    </b>
                  </td>
                  <td>Brian Meyer</td>
                  <td>{toMoney(roundAmount)}</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      3<sup>rd</sup>
                    </b>
                  </td>
                  <td>Jeff Fandl</td>
                  <td>
                    {toMoney(roundAmount)}
                    <sup>1</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      4<sup>th</sup>
                    </b>
                  </td>
                  <td>Alissa Onofrio</td>
                  <td>
                    {toMoney(roundAmount / 2)}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      4<sup>th</sup>
                    </b>
                  </td>
                  <td>Bobby Crimmins</td>
                  <td>
                    {toMoney(roundAmount / 2)}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      5<sup>th</sup>
                    </b>
                  </td>
                  <td>Mark Maltz</td>
                  <td>
                    {toMoney(roundAmount)}
                    <sup>3</sup>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              <b>
                <sup>1</sup>
              </b>
              I technically won this round but I'm awarding the payout to Jeff
              Fandl because I messed up the scoring and he was the original
              winner of this round
            </p>
            <p>
              <b>
                <sup>2</sup>
              </b>
              Alissa and Bobby ties this round so the pot was split
            </p>
            <p>
              <b>
                <sup>3</sup>
              </b>
              There was a 12-way tie for this round and so I picked a winner in
              the only logical way I could think, an online duck race. You can
              do your own races{" "}
              <a href="https://www.online-stopwatch.com/duck-race/">here</a>
            </p>
          </div>
          <div className="column">
            <h3 className="title is-3 has-text-centered">Total Payouts</h3>
            <table className="table mx-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>{toMoney(totalPool)}</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>Alissa Onofrio</td>
                  <td>{toMoney(412.5)}</td>
                </tr>
                <tr>
                  <td>Bobby Crimmins</td>
                  <td>{toMoney(304)}</td>
                </tr>
                <tr>
                  <td>Jeff Fandl</td>
                  <td>{toMoney(205)}</td>
                </tr>
                <tr>
                  <td>Cindy Dolan</td>
                  <td>{toMoney(186)}</td>
                </tr>
                <tr>
                  <td>Kailey Fandl</td>
                  <td>{toMoney(124)}</td>
                </tr>
                <tr>
                  <td>Nicole Tseng</td>
                  <td>{toMoney(93)}</td>
                </tr>
                <tr>
                  <td>Mark Maltz</td>
                  <td>{toMoney(81)}</td>
                </tr>
                <tr>
                  <td>Rachel Templeton</td>
                  <td>{toMoney(77.5)}</td>
                </tr>
                <tr>
                  <td>Paige Seitz</td>
                  <td>{toMoney(65.5)}</td>
                </tr>
                <tr>
                  <td>William Silva</td>
                  <td>{toMoney(62)}</td>
                </tr>
                <tr>
                  <td>Brian Meyer</td>
                  <td>{toMoney(50)}</td>
                </tr>
                <tr>
                  <td>Peter Nargi</td>
                  <td>{toMoney(46.5)}</td>
                </tr>
                <tr>
                  <td>John Blake</td>
                  <td>{toMoney(31)}</td>
                </tr>
                <tr>
                  <td>Arthur Kroner</td>
                  <td>{toMoney(31)}</td>
                </tr>
                <tr>
                  <td>Alex Gugliada</td>
                  <td>{toMoney(15.5)}</td>
                </tr>
                <tr>
                  <td>Tom Hellen</td>
                  <td>{toMoney(15.5)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarchMadnessPayouts;
