import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../constants';

function About() {
    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>The {CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>About, How to Play, and more!</h2>
                <h3 className='title is-3'>About</h3>
                <p className='mb-5'>
                    If you were wondering where the name for this pool came from, it's a combination of the two things that inspired it! The first
                    inspiration for the pool was the Stablehand Pool. This was a pool run by a friend of my grandpa, which I participated in for as
                    long as I can remember. I drew a lot of inspiration from this pool while creating Stonehands, for anyone familiar with the
                    Stablehand pool you'll be very familiar with the format. The second inspiration for this pool was Stonehill, the college I attended.
                    Almost all of the fantasy leagues I'm part of are primarily made up of my friends from Stonehill, and I've always wanted another
                    place for fantasy sports outside of our normal leagues. With that in mind, Stonehands comes from the combination of the Stablehand Pool and
                    Stonehill, Stablehand x Stonehill = Stonehands.
                </p>
                <p className='mb-5'>
                    This pool is intended to be played by any friends and family who are interested! You don't need to have gone to Stonehill or have played in the
                    Stablehand Pool in the past. Feel free to invite any of your friends or family to this pool as well, the more the merrier!
                </p>
                <h3 className='title is-3'>Referrals</h3>
                <p className='mb-5'>
                    You'll notice on our <Link to='/sign-up'>Sign Up</Link> page that it asks for a referral. You're more than welcome to put me (Ryan) if you'd like.
                    This is simply so that I can know who invited who as the pool hopefully grows larger and larger.
                </p>
                <h3 className='title is-3'>How to Play</h3>
                <div className='content'>
                    <p>
                        This pool currently contains 4 pools, if you have any ideas about more pool options feel free to reach out to Ryan with any suggestions. The current
                        pools you can find on this website are:
                    </p>
                    <ul>
                        <li>The Confidence Pool</li>
                        <li>The Survivor Pool</li>
                        <li>The Margin Pool</li>
                        <li>The High Five Pool</li>
                    </ul>
                </div>
                <p className='mb-5'>
                    You can read more about each pool below. The most important thing to know is that every pool is played straight up, we don't play the spread.
                </p>
                <h4 className='title is-4'>The Confidence Pool</h4>
                <div className='content'>
                    <p className='mb-5'>
                        Each week you will choose who you think will win in every game while assigning confidence points with 1 being the least confident and 16 being the most confident.
                        If you choose a team correctly you are awarded that many points. If a week has less than 16 games being played then the maximum confidence will be however many
                        games are played that week. The tiebreakers for this pool are as follows:
                    </p>
                    <ol>
                        <li>Total wins for the week (for weekly results) and total wins on the season (for season results)</li>
                        <li>The second tiebreaker, which is for the weekly standings is the total points in the Monday Night game (or last game of the week)</li>
                        <ol className='is-lower-alpha'>
                            <li>
                                This will factor in the closest to the total score, we're not doing price is right rules! Someone who guesses 1 point more than the total score will win the
                                tiebreaker over someone who guessed 2 points below the total score.
                            </li>
                        </ol>
                    </ol>
                </div>
                <h4 className='title is-4'>The Survivor Pool</h4>
                <p className='mb-5'>
                    This pool will run for as long as there are people still alive in it. Each week, everyone will pick one team that they think will win with <strong>no </strong>
                    repeats allowed. If you get a pick wrong, you will be eliminated from the pool until next season, so choose carefully! Once there is only one player remaining,
                    they will win the whole pot allocated for this pool. If there is more than one person left after week 18, the remaining players will split the pot. If it comes
                    down to two players remaining <strong>before </strong> week 18 and they would both like to split the pot, they can contact me and that can be arranged. If you forget
                    to submit a picksheet and you are still alive in the survivor pool, you will not be awarded a random choice and will be eliminated from this pool.
                </p>
                <h4 className='title is-4'>The Margin Pool</h4>
                <p className='mb-5'>
                    This pool will run for the duration of the season. Each week, you will pick who you think will win by the most but with the restriction of <strong>no </strong>
                    duplicates throughout the season. If the team you pick wins, you get their winning margin added to your score but if you lose, the amount they lost by will be
                    subtracted from your score. The player at the end of the season with the highest cumulative score will win the pot! If there happens to be a tie, the pot will be split.
                    If you forget to submit a picksheet you will be given the team that lost by the most even if it is a team you have chosen before.
                </p>
                <h4 className='title is-4'>The High Five Pool</h4>
                <div className='content'>
                    <p className='mb-5'>
                        This pool will also run for the duration of the season, so there is always a chance to come back! Each week, you will choose five teams that you think will win.
                        There are no restriction for who you can pick week-by-week, so feel free to pick the same five teams each week if you're feeling bold enough. The scoring will
                        work as follows:
                    </p>
                    <ul>
                        <li>One Win = 1 Point</li>
                        <li>Two Wins = 2 Points</li>
                        <li>Three Wins = 3 Points</li>
                        <li>Four Wins = 5 Points</li>
                        <li>Five Wins = 8 Points</li>
                    </ul>
                    <p>
                        Kudos to those of you who noticed that this uses the fibonacci sequence for scoring! The player with the most points at the end of the season will win with
                        any ties resulting in the pot being split. If you forget to submit a picksheet you will not receive any points in this pool for that week.
                    </p>
                </div>
                <h3 className='title is-3'>Picksheets</h3>
                <p className='mb-5'>
                    Picksheets are due prior to kickoff of the first game of the week, an email will be sent out the day of as a reminder. If there is a Thursday night game at
                    8:00pm EST then any picksheets submitted aferwards will not be allowed to choose that game. Partial picksheets are not allowed but you can update any prior
                    submission so feel free to make a submission on Thursday and then change your picks any time prior to Sunday kickoffs, the picksheet will repopulate with
                    any previous picks you made. Anyone who fails to submit a picksheet prior to the 1:00 EST kickoffs on Sunday will be unable to make a submission and they will
                    be given random picks for the confidence pool, no pick for the survivor and high five pools, and the worst pick for the margin pool. 
                </p>
                <h3 className='title is-3'>Payouts</h3>
                <div className='container mb-5'>
                    <p className='has-text-danger'>The pool will always pay out 100% of the collected buy ins. The site upkeep will be handled by Ryan.</p>
                    <p className='has-text-danger'>Tentative Pay Structure for the Pool, this is subject to changing prior to the season starting</p>
                    <br />
                    <h5 className='title is-5'><b>Cost for Season:</b> $100</h5>
                    <p><b>Payout Breakdown:</b></p>
                    <p>This is to show that for every person joining the pool, what amount of their money is going towards the pot in a specific pool</p>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Pool</th>
                                <th>Confidence</th>
                                <th>Survivor</th>
                                <th>Margin</th>
                                <th>High-Five</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>$ out of buy in</td>
                                <td>$60</td>
                                <td>$15</td>
                                <td>$15</td>
                                <td>$10</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><b>Payout Structure:</b></p>
                    <p>This is to show where the full pot is getting paid out to</p>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Pool</th>
                                <th>Confidence</th>
                                <th>Survivor</th>
                                <th>Margin</th>
                                <th>High-Five</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Overall Winner (%)</td>
                                <td>60%*</td>
                                <td>100%</td>
                                <td>100%</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>Weekly Winners</td>
                                <td>40%*</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>N/A</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>* The confidence pool will payout more than one person per week while the rest of the pools are winner take all</p>
                    <br />

                    <h5 className='title is-5'>Example Season Payout Structure</h5>
                    <p><b>Total Pool Members: </b> 100</p>
                    <p><b>Total Pot: </b> $10,000</p>
                    <p><b>Total Confidence Pot: </b> $6,000</p>
                    <p><b>Total Survivor Pot:</b> $1,500</p>
                    <p><b>Total Margin Pot: </b> $1,500</p>
                    <p><b>Total High-Five Pot: </b> $1,000</p>
                    <br />
                    <p><b>Confidence Pool Season Winners:</b></p>
                    <div className='columns'>
                        <div className='column is-narrow'>
                            <p><b>Season Total Pot: </b>$3,600</p>
                            <br />
                            <p><b>1<sup>st</sup>: </b>$720 (20%)</p>
                            <p><b>2<sup>nd</sup>: </b>$612 (17%)</p>
                            <p><b>3<sup>rd</sup>: </b>$504 (14%)</p>
                            <p><b>4<sup>th</sup>: </b>$432 (12%)</p>
                            <p><b>5<sup>th</sup>: </b>$360 (10%)</p>
                            <p><b>6<sup>th</sup>: </b>$288 (8%)</p>
                            <p><b>7<sup>th</sup>: </b>$198 (5.5%)</p>
                            <p><b>8<sup>th</sup>: </b>$180 (5%)</p>
                            <p><b>9<sup>th</sup>: </b>$162 (4.5%)</p>
                            <p><b>10<sup>th</sup>: </b>$144 (4%)</p>
                        </div>
                        <div className='column is-narrow'>
                            <p><b>Weekly Total Pot: </b>$2,400</p>
                            <p><b>Weekly Pot: </b>$133.33</p>
                            <p><b>1<sup>st</sup>: </b>$26.99 (20%)</p>
                            <p><b>2<sup>nd</sup>: </b>$22.61 (17%)</p>
                            <p><b>3<sup>rd</sup>: </b>$18.62 (14%)</p>
                            <p><b>4<sup>th</sup>: </b>$15.96 (12%)</p>
                            <p><b>5<sup>th</sup>: </b>$13.30 (10%)</p>
                            <p><b>6<sup>th</sup>: </b>$10.64 (8%)</p>
                            <p><b>7<sup>th</sup>: </b>$7.31 (5.5%)</p>
                            <p><b>8<sup>th</sup>: </b>$6.65 (5%)</p>
                            <p><b>9<sup>th</sup>: </b>$5.98 (4.5%)</p>
                            <p><b>10<sup>th</sup>: </b>$5.32 (4%)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;