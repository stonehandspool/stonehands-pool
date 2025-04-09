import { CURRENT_YEAR } from '../constants';

const toMoney = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  });
};

function MarchMadnessPayouts() {
  // Just dummy objects to allow the examples to somewhat work
  const numPlayers = 101;
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
        <h1 className="title has-text-centered">The {CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">March Madness Payouts for {CURRENT_YEAR}</h2>
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
                  <td>Rob Obernesser</td>
                  <td>{toMoney(final1)} (25%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      2<sup>nd</sup>
                    </b>
                  </td>
                  <td>Tom Hellen</td>
                  <td>{toMoney(final2)} (18%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      3<sup>rd</sup>
                    </b>
                  </td>
                  <td>Ian Dick</td>
                  <td>{toMoney(final3)} (12%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      4<sup>th</sup>
                    </b>
                  </td>
                  <td>Nancy Fandl</td>
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
                  <td>Melissa Templeton</td>
                  <td>{toMoney(final6)} (6%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      7<sup>th</sup>
                    </b>
                  </td>
                  <td>Mark Boyajian</td>
                  <td>{toMoney(final7)} (5%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      8<sup>th</sup>
                    </b>
                  </td>
                  <td>Chris Rosario</td>
                  <td>{toMoney(final8)} (4%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      9<sup>th</sup>
                    </b>
                  </td>
                  <td>Alex Gugliada</td>
                  <td>{toMoney(final9)} (3%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      10<sup>th</sup>
                    </b>
                  </td>
                  <td>Pat McGinn</td>
                  <td>{toMoney(final10)} (2%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      11<sup>th</sup>
                    </b>
                  </td>
                  <td>Gary Fandl</td>
                  <td>{toMoney(final11)} (2%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      12<sup>th</sup>
                    </b>
                  </td>
                  <td>Eric Rossi</td>
                  <td>{toMoney(final12)} (2%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      13<sup>th</sup>
                    </b>
                  </td>
                  <td>Matthew Arsenault</td>
                  <td>{toMoney(final13)} (1%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      14<sup>th</sup>
                    </b>
                  </td>
                  <td>Joe Rodriguez</td>
                  <td>{toMoney(final14)} (1%)</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      15<sup>th</sup>
                    </b>
                  </td>
                  <td>Miguel Linares</td>
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
                  <td>Rob Obernesser</td>
                  <td>{toMoney(roundAmount)}</td>
                </tr>
                <tr>
                  <td>
                    <b>
                      2<sup>nd</sup>
                    </b>
                  </td>
                  <td>Nancy Fandl</td>
                  <td>
                    {toMoney(roundAmount / 2)}
                    <sup>1</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      2<sup>nd</sup>
                    </b>
                  </td>
                  <td>Paige Seitz</td>
                  <td>
                    {toMoney(roundAmount / 2)}
                    <sup>1</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      3<sup>rd</sup>
                    </b>
                  </td>
                  <td>Richard Grenier</td>
                  <td>
                    {toMoney(roundAmount / 4)}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      3<sup>rd</sup>
                    </b>
                  </td>
                  <td>Miguel Linares</td>
                  <td>
                    {toMoney(roundAmount / 4)}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      3<sup>rd</sup>
                    </b>
                  </td>
                  <td>Ryan Paulik</td>
                  <td>
                    {toMoney(roundAmount / 4)}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      3<sup>rd</sup>
                    </b>
                  </td>
                  <td>Melissa Templeton</td>
                  <td>
                    {toMoney(roundAmount / 4)}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      4<sup>th</sup>
                    </b>
                  </td>
                  <td>Kelsey Linares</td>
                  <td>
                    {toMoney(roundAmount)}
                    <sup>3</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      5<sup>th</sup>
                    </b>
                  </td>
                  <td>Mark Boyajian</td>
                  <td>
                    {toMoney(roundAmount / 4)}
                    <sup>4</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      5<sup>th</sup>
                    </b>
                  </td>
                  <td>Matthew Arsenault</td>
                  <td>
                    {toMoney(roundAmount / 4)}
                    <sup>4</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      5<sup>th</sup>
                    </b>
                  </td>
                  <td>Dan Backhaus</td>
                  <td>
                    {toMoney(roundAmount / 4)}
                    <sup>4</sup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      5<sup>th</sup>
                    </b>
                  </td>
                  <td>Andrew Suh</td>
                  <td>
                    {toMoney(roundAmount / 4)}
                    <sup>4</sup>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              <b>
                <sup>1</sup>
              </b>
              Nancy and Paige ties this round so the pot was split
            </p>
            <p>
              <b>
                <sup>2</sup>
              </b>
              Richard, Miguel, Ryan, and Melissa tied this round so the pot was split
            </p>
            <p>
              <b>
                <sup>3</sup>
              </b>
              There was a 10-way tie for this round and so I picked a winner in the only logical way I could think, an
              online duck race. You can do your own races <a href="https://www.online-stopwatch.com/duck-race/">here</a>
            </p>
            <p>
              <b>
                <sup>4</sup>
              </b>
              Mark, Matt, Dan, and Andrew tied this round so the pot was split
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
                  <td>Rob Obernesser</td>
                  <td>{toMoney(618.75)}</td>
                </tr>
                <tr>
                  <td>Tom Hellen</td>
                  <td>{toMoney(409.5)}</td>
                </tr>
                <tr>
                  <td>Ian Dick</td>
                  <td>{toMoney(273)}</td>
                </tr>
                <tr>
                  <td>Nancy Fandl</td>
                  <td>{toMoney(252.5)}</td>
                </tr>
                <tr>
                  <td>Kailey Fandl</td>
                  <td>{toMoney(182)}</td>
                </tr>
                <tr>
                  <td>Melissa Templeton</td>
                  <td>{toMoney(149)}</td>
                </tr>
                <tr>
                  <td>Mark Boyajian</td>
                  <td>{toMoney(126.25)}</td>
                </tr>
                <tr>
                  <td>Chris Rosario</td>
                  <td>{toMoney(91)}</td>
                </tr>
                <tr>
                  <td>Alex Gugliada</td>
                  <td>{toMoney(68.25)}</td>
                </tr>
                <tr>
                  <td>Kelsey Linares</td>
                  <td>{toMoney(50)}</td>
                </tr>
                <tr>
                  <td>Pat McGinn</td>
                  <td>{toMoney(45.5)}</td>
                </tr>
                <tr>
                  <td>Gary Fandl</td>
                  <td>{toMoney(45.5)}</td>
                </tr>
                <tr>
                  <td>Eric Rossi</td>
                  <td>{toMoney(45.5)}</td>
                </tr>
                <tr>
                  <td>Miguel Linares</td>
                  <td>{toMoney(35.25)}</td>
                </tr>
                <tr>
                  <td>Matthew Arsenault</td>
                  <td>{toMoney(35.25)}</td>
                </tr>
                <tr>
                  <td>Paige Seitz</td>
                  <td>{toMoney(25)}</td>
                </tr>
                <tr>
                  <td>Joe Rodriguez</td>
                  <td>{toMoney(22.75)}</td>
                </tr>
                <tr>
                  <td>Richard Grenier</td>
                  <td>{toMoney(12.5)}</td>
                </tr>
                <tr>
                  <td>Ryan Paulik</td>
                  <td>{toMoney(12.5)}</td>
                </tr>
                <tr>
                  <td>Dan Backhaus</td>
                  <td>{toMoney(12.5)}</td>
                </tr>
                <tr>
                  <td>Andrew Suh</td>
                  <td>{toMoney(12.5)}</td>
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
