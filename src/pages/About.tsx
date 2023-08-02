import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../constants';
import MatchupCard from '../components/picksheet/MatchupCard';
import ConfidenceDropDown from '../components/picksheet/ConfidenceDropDown';
import PickOneTeam from '../components/picksheet/PickOneTeam';
import HighFiveCheckboxes from '../components/picksheet/HighFiveCheckBoxes';

const toMoney = (value: number) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' })
}

function About() {
    // Just dummy objects to allow the examples to somewhat work
    const [selectedPick, setSelectedPick] = useState<string>('');
    const [marginTeam, setMarginTeam] = useState<string>('');
    const onUpdatePick = () => {};
    const onUpdateConfidence = () => {};
    const handleMarginSelection = (team: string) => {
        setMarginTeam(team);
    };
    const handleHighFiveSelection = () => {};

    const numPlayers = 50; // TOOD: Update this once everything is locked in
    const buyIn = 120;
    const totalPool = numPlayers * buyIn;
    // Confidence
    const totalConf = totalPool * .7;
    // Confidence EOY
    const finalConf = totalConf * .3;
    const final1 = finalConf * .2;
    const final2 = finalConf * .17;
    const final3 = finalConf * .14;
    const final4 = finalConf * .12;
    const final5 = finalConf * .1;
    const final6 = finalConf * .08;
    const final7 = finalConf * .055;
    const final8 = finalConf * .05;
    const final9 = finalConf * .045;
    const final10 = finalConf * .04;
    // Confidence Weekly
    const weeklyConf = totalConf * .7;
    const weeklyPot = weeklyConf / 18;
    const weekly1 = weeklyPot * .2;
    const weekly2 = weeklyPot * .17;
    const weekly3 = weeklyPot * .14;
    const weekly4 = weeklyPot * .12;
    const weekly5 = weeklyPot * .1;
    const weekly6 = weeklyPot * .08;
    const weekly7 = weeklyPot * .055;
    const weekly8 = weeklyPot * .05;
    const weekly9 = weeklyPot * .045;
    const weekly10 = weeklyPot * .04;

    // Others
    const totalSurv = totalPool * .1;
    const totalMarg = totalPool * .1;
    const totalHF = totalPool * .1;
    const other1 = totalMarg * .38;
    const other2 = totalMarg * .25;
    const other3 = totalMarg * .15;
    const other4 = totalMarg * .12;
    const other5 = totalMarg * .1;

    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title has-text-centered'>The {CURRENT_YEAR} Stonehands Pool</h1>
                <h2 className='subtitle has-text-centered'>About, How to Play, and more!</h2>
                <br /> <br />
                <h3 className='title is-3 has-text-centered'>About</h3>
                <div className='columns is-centered'>
                    <div className='column is-two-thirds'>
                        <p className='mb-2'>
                            If you were wondering where the name for this pool came from, it's a combination of the two things that inspired it! The first
                            inspiration for the pool was the Stablehand Pool while the other inspiration was Stonehill College.  
                        </p>
                        <p className='mb-2'>
                            The Stablehand pool was a pool run by a friend of my grandpa, which I participated in for as
                            long as I can remember. I drew a lot of inspiration from this pool while creating Stonehands. For anyone who previously participated
                            in the Stablehand pool you'll find a lot of similarities here in the Stonehands pool.
                            The second inspiration for this pool, Stonehill College, was the college I attended.
                            Almost all of the fantasy leagues I'm part of are primarily made up of my friends from Stonehill, and I've always wanted another
                            place for fantasy sports outside of our normal leagues. 
                        </p>
                        <p className='mb-2'>
                            With that in mind, Stonehands comes from the combination of the Stablehand Pool and
                            Stonehill, Stablehand x Stonehill = Stonehands!
                        </p>
                        <p className='mb-5'>
                            This pool is intended to be played by any friends and family who are interested! You don't need to have gone to Stonehill or have played in the
                            Stablehand Pool in the past. Feel free to invite any of your friends or family to this pool as well, the more the merrier!
                        </p>
                    </div>
                </div>
                <h3 className='title is-3 has-text-centered'>Referrals</h3>
                <div className='columns is-centered'>
                    <div className='column is-two-thirds'>
                        <p className='mb-5'>
                            You'll notice on our <Link to='/sign-up'>Sign Up</Link> page that it asks for a referral. You're more than welcome to put me (Ryan) if you'd like.
                            However, if someone else invited you this pool I ask that you put their name in this field. This is simply so that I can know who invited who
                            as the pool hopefully grows larger and larger.
                        </p>
                    </div>
                </div>

                <h3 className='title is-3 has-text-centered'>How to Play</h3>
                <div className='columns is-centered'>
                    <div className='column is-two-thirds'>
                        <p>
                            This site currently contains 4 pools, if you have any ideas about more pool options feel free to reach out to Ryan with any suggestions. Here
                            are the basic instructions for each pool:
                        </p>
                    </div>
                </div>
                <div className='columns mb-5'>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>The Confidence Pool</h4>
                        <div className='content'>
                            <ul>
                                <li>Each week you pick a winner for every game</li>
                                <li>You assign points based off of how confident you are</li>
                                <li>16 points if for most confident, 1 point is for least confident</li>
                                <li>You may only use each confidence point once per week</li>
                                <li>If you get a game right, you are awarded that many points</li>
                                <li>There are no restrictions on which teams you can pick</li>
                                <li>The person with the highest confidence total at the end of the season wins!</li>
                                <li><b>If you forget to submit a picksheet, you will be assigned a random winner and confidence point value for every matchup</b></li>
                            </ul>
                        </div>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>The Survivor Pool</h4>
                        <div className='content'>
                            <ul>
                                <li>Each week you pick <b>one</b> team you think will win</li>
                                <li>If you pick correctly you survive</li>
                                <li>If you pick wrong you are eliminated from the survivor pool</li>
                                <li>You <b>cannot</b> use a team multiple times, each team may only be used once!</li>
                                <li>The last player alive wins!</li>
                                <li><b>If you forget to submit a picksheet, you will be eliminated from the survivor pool</b></li>
                            </ul>
                        </div>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>The Margin Pool</h4>
                        <div className='content'>
                            <ul>
                                <li>Each week you pick <b>one</b> team you think will win by the most</li>
                                <li>If you pick correctly you are awarded their margin of victory to your margin total</li>
                                <li>If you pick wrong you lose their margin of defeat from your margin total</li>
                                <li>You <b>cannot</b> use a team multiple times, each team may only be used once!</li>
                                <li>The top 5 players at the end of the season will win!</li>
                                <li><b>If you forget to submit a picksheet, you will have the largest margin of defeat taken from your margin total</b></li>
                            </ul>
                        </div>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>The High Five Pool</h4>
                        <div className='content'>
                            <ul>
                                <li>Each week you will pick <b>5</b> teams to win</li>
                                <li>You are awarded points based off of how many games you pick correctly:
                                    <ul>
                                        <li>One Win = 1 Point</li>
                                        <li>Two Wins = 2 Points</li>
                                        <li>Three Wins = 3 Points</li>
                                        <li>Four Wins = 5 Points</li>
                                        <li>Five Wins = 8 Points</li>
                                    </ul>
                                </li>
                                <li>There are no restrictions on which teams you can pick</li>
                                <li>The top 5 players at the end of the season will win!</li>
                                <li><b>If you forget to submit a picksheet, you will be awarded 0 points in the high five pool for that week</b></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h3 className='title is-3 has-text-centered'>Examples</h3>
                <div className='columns is-centered'>
                    <div className='column is-two-thirds'>
                        <p className='has-text-centered mb-5'>
                            You'll have to wait until you are signed up and the pool is ready for submissions in order to see the full picksheet, but
                            here are some examples so you have an idea of what to expect for each pool
                        </p>
                        <h4 className='title is-4 has-text-centered'>The Confidence Pool</h4>
                        <p className='has-text-centered mb-5'>Below is an example of what making a pick for the Confidence Pool will look like</p>
                        <div className='columns is-centered'>
                            <div className='column is-two-fifths'>
                                <div className='box'>
                                    <div className='columns is-centered is-multiline'>
                                        <div className='column is-full py-0 pl-3'>
                                            <p className='is-size-7 has-text-grey-light'>THU, SEP 7th - 8:20 PM ET - Kansas City, MO</p>
                                        </div>
                                        <div className='column'>
                                            <MatchupCard
                                                key={`card-0`}
                                                homeTeam='KC'
                                                awayTeam='DET'
                                                matchupNumber={0}
                                                gameCompleted={false}
                                                priorChoice={null}
                                                onUpdatePick={onUpdatePick}
                                            />
                                        </div>
                                        <div className='column is-narrow is-vertical-center'>
                                            <ConfidenceDropDown
                                                key={`dd-0`}
                                                numOptions={16}
                                                gameCompleted={false}
                                                priorConfidence=''
                                                matchupChoice={selectedPick}
                                                matchupNumber={0}
                                                selectedNumbers={[]}
                                                onUpdateConfidence={onUpdateConfidence}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content'>
                            <p>
                                <b>*This is not a fully functional tile*</b> You will see a tile for each matchup in a given week, so if there are 14 games for a week
                                you will need to fill out 14 tiles for the confidence pool. You will be required to choose a winner <b>and</b> a confidence value for
                                each tile in the picksheet.
                            </p>
                        </div>
                        <h4 className='title is-4 has-text-centered'>The Survivor and Margin Pools</h4>
                        <p className='has-text-centered mb-5'>The survivor and margin pools will look identical on the picksheet, below is an example of what you can expect</p>
                        <div className='columns is-centered'>
                            <div className='column is-two-fifths'>
                                <PickOneTeam
                                    key='margin-survivor-example'
                                    homeTeam='KC'
                                    awayTeam='DET'
                                    gameInfo='THU, SEP 7th - 8:20 PM ET - Kansas City, MO'
                                    matchupNumber={0}
                                    name={'margin-pick'}
                                    selectedTeam={marginTeam}
                                    handleSelection={handleMarginSelection}
                                    priorMarginPicks={undefined}
                                    gameCompleted={false}
                                    priorPickGameCompleted={false}
                                />
                            </div>
                        </div>
                        <div className='content'>
                            <p>
                                The survivor and margin tiles are essentially the same as the confidence pool tiles, however, they're just missing the confidence drop down.
                                There will still be a tile for each matchup in a given week, but you'll only be able to choose one team per week. The two pools are independent
                                of each other so you will have to make a survivor <b>and</b> margin pick each week as long as you are still alive in the survivor pool.
                            </p>
                        </div>
                        <h4 className='title is-4 has-text-centered'>The High Five Pool</h4>
                        <p className='has-text-centered mb-5'>The high five pool will look very similar to the survivor and margin pools, below is an example of what you can expect</p>
                        <div className='columns is-centered'>
                            <div className='column is-two-fifths'>
                                <HighFiveCheckboxes
                                    key='high-five-0'
                                    homeTeam='KC'
                                    awayTeam='DET'
                                    gameInfo='THU, SEP 7th - 8:20 PM ET - Kansas City, MO'
                                    gameCompleted={false}
                                    matchupNumber={0}
                                    name={'high-five-picks'}
                                    handleSelection={handleHighFiveSelection}
                                    maxPicks={5}
                                    picksArray={[]}
                                />
                            </div>
                        </div>
                        <div className='content'>
                            <p>
                                The high five tiles are essentially the same as the rest of the tiles with the only difference being that you'll have to choose only <b>5</b> winners
                                in this pool each week. Once you have chosen 5, you will need to deselect an option in order to choose a different winner. The pool will not allow you
                                to choose and less or more than 5 winners.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className='title is-3 has-text-centered'>Tiebreakers</h3>
                <div className='columns is-centered'>
                    <div className='column is-two-thirds'>
                        <p className='has-text-centered'>
                            Here are the specific tiebreaker rules for each pool
                        </p>
                    </div>
                </div>
                <div className='columns mb-5'>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>The Confidence Pool</h4>
                        <div className='content'>
                            <h6 className='title is-6'>Weekly</h6>
                            <ul>
                                <li>Each week you will submit a tiebreaker value</li>
                                <li>You will need to guess the total score of the final game of the week</li>
                                <li>If you tie someone in confidence points but guess a closer total score you will get ranked above them</li>
                                <li>The second tiebreaker is the number of games guessed correctly (if two players have the same score and tiebreaker guess)</li>
                            </ul>
                            <h6 className='title is-6'>Season</h6>
                            <ul>
                                <li>At the end of the season, the person with the highest total confidence points wins</li>
                                <li>If there is a tie, the only tiebreaker will be whoever has the most games guessed correctly</li>
                                <li>If at the end there are two players with the same score and number of games guessed correctly, they will split the pot</li>
                            </ul>
                        </div>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>The Survivor Pool</h4>
                        <div className='content'>
                            <ul>
                                <li>The only way for there to be in a tie in this pool is if there are only two players left going into a week and they <b>both</b> agree to split the pool</li>
                                <li>If all remaining players get eliminated in a given week with no winner, all of those remaining players will continue on another week</li>
                                <li>If multiple people make it through week 18, all remaining players will split the pot</li>
                            </ul>
                        </div>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>The Margin Pool</h4>
                        <div className='content'>
                            <ul>
                                <li>If there is a tie at the end of the season the only tiebreaker is number of games chosen correctly</li>
                                <li>If multiple people end up with the same margin total and same number of game chosen correctly, they will split the pot</li>
                            </ul>
                        </div>
                    </div>
                    <div className='column'>
                        <h4 className='title is-4 has-text-centered'>The High Five Pool</h4>
                        <div className='content'>
                            <ul>
                                <li>If there is a tie at the end of the season the only tiebreaker is number of games chosen correctly</li>
                                <li>If multiple people end up with the same high five total and same number of game chosen correctly, they will split the pot</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <h3 className='title is-3 has-text-centered'>Picksheets</h3>
                <div className='columns is-centered mb-5'>
                    <div className='column is-two-thirds'>
                        <div className='content'>
                            <ul>
                                <li>Picksheets are due prior to kickoff of the first game of the week, an email will be sent out every Thursday as a reminder</li>
                                <li>You may not submit a partial picksheet, you must make a selection for every pool</li>
                                <li>Picksheets may be updated up until 1 P.M. EST every Sunday unless otherwise notified
                                    <ul>
                                        <li>For example, you can submit a picksheet on Thursday and then make a change on Friday to all games except for the Thursday games</li>
                                    </ul>
                                </li>
                                <li>You will not be able to select a winner for any matchup that has begun or has completed</li>
                                <li>If anyone fails to submit a picksheet prior to the 1 P.M. EST cutoff, they will be given the penalties listed above, please remember to make your picks!</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
    {/*
    const numPlayers = 50; // TOOD: Update this once everything is locked in
    const buyIn = 120;
    const totalPool = numPlayers * buyIn;
    const totalConf = totalPool * .75;
    const finalConf = totalConf * .3;
    const weeklyConf = totalConf * .7;
    const totalSurv = totalPool * .1;
    const totalMarg = totalPool * .1;
    const totalHF = totalConf * .05;*/}

                <h3 className='title is-3 has-text-centered'>Payouts</h3>
                <div className='columns is-centered'>
                    <div className='column is-two-thirds'>
                        <p><b>The pool will always pay out 100% of the collected buy ins. The site upkeep will be handled by Ryan.</b></p>
                        <h5 className='title is-5'><b>Expected Buy In: </b> ${buyIn}</h5>
                        <p className='has-text-danger'>
                            Below is a tentative pay structure for the pool, this is subject to change but will be finalized before the season starts.
                            This structure is designed to try and provide as many ways for players to win at least some money back so that there's always
                            a motivation to keep playing.
                        </p>
                        <br />
                        <h5 className='title is-5'>Example Season Payout Structure w/ {numPlayers} members</h5>
                        <p><b>Total Pool Members: </b> {numPlayers}</p>
                        <p><b>Total Pot: </b> {toMoney(totalPool)}</p>
                        <p><b>Total Confidence Pot: </b> {toMoney(totalConf)}</p>
                        <p className='ml-5'><b>Total Confidence Pot (Weekly): </b>{toMoney(finalConf)}</p>
                        <p className='ml-5'><b>Total Confidence Pot (End of Year): </b>{toMoney(weeklyConf)}</p>
                        <p><b>Total Survivor Pot:</b> {toMoney(totalSurv)}</p>
                        <p><b>Total Margin Pot: </b> {toMoney(totalMarg)}</p>
                        <p><b>Total High-Five Pot: </b> {toMoney(totalHF)}</p>
                        <br />
                        <p><b>Note: </b> The top 10 in the confidence pool each week earn money as well as the top 10 at the end of the year.
                            The margin and high five pools pay out the top 5 for both pools while the survivor pool is winner takes all.</p>
                        <br />
                        <p><b>Confidence Pool Season Winners:</b></p>
                        <div className='columns'>
                            <div className='column is-narrow'>
                                <p><b>End of Season Payouts:</b></p>
                                <p><b>Season Total Pot: </b>{toMoney(finalConf)}</p>
                                <br />
                                <p><b>1<sup>st</sup>: </b>{toMoney(final1)} (20%)</p>
                                <p><b>2<sup>nd</sup>: </b>{toMoney(final2)} (17%)</p>
                                <p><b>3<sup>rd</sup>: </b>{toMoney(final3)} (14%)</p>
                                <p><b>4<sup>th</sup>: </b>{toMoney(final4)} (12%)</p>
                                <p><b>5<sup>th</sup>: </b>{toMoney(final5)} (10%)</p>
                                <p><b>6<sup>th</sup>: </b>{toMoney(final6)} (8%)</p>
                                <p><b>7<sup>th</sup>: </b>{toMoney(final7)} (5.5%)</p>
                                <p><b>8<sup>th</sup>: </b>{toMoney(final8)} (5%)</p>
                                <p><b>9<sup>th</sup>: </b>{toMoney(final9)} (4.5%)</p>
                                <p><b>10<sup>th</sup>: </b>{toMoney(final10)} (4%)</p>
                            </div>
                            <div className='column is-narrow'>
                                <p><b>Weekly Payouts:</b></p>
                                <p><b>Weekly Total Pot: </b>{toMoney(weeklyConf)}</p>
                                <p><b>Weekly Pot: </b>{toMoney(weeklyPot)}</p>
                                <p><b>1<sup>st</sup>: </b>{toMoney(weekly1)} (20%)</p>
                                <p><b>2<sup>nd</sup>: </b>{toMoney(weekly2)} (17%)</p>
                                <p><b>3<sup>rd</sup>: </b>{toMoney(weekly3)} (14%)</p>
                                <p><b>4<sup>th</sup>: </b>{toMoney(weekly4)} (12%)</p>
                                <p><b>5<sup>th</sup>: </b>{toMoney(weekly5)} (10%)</p>
                                <p><b>6<sup>th</sup>: </b>{toMoney(weekly6)} (8%)</p>
                                <p><b>7<sup>th</sup>: </b>{toMoney(weekly7)} (5.5%)</p>
                                <p><b>8<sup>th</sup>: </b>{toMoney(weekly8)} (5%)</p>
                                <p><b>9<sup>th</sup>: </b>{toMoney(weekly9)} (4.5%)</p>
                                <p><b>10<sup>th</sup>: </b>{toMoney(weekly10)} (4%)</p>
                            </div>
                            <div className='column is-narrow'>
                                <p><b>Margin and High Five Payouts:</b></p>
                                <p><b>Season Pots: </b>{toMoney(totalMarg)} (Each)</p>
                                <br />
                                <p><b>1<sup>st</sup>: </b>{toMoney(other1)} (38%)</p>
                                <p><b>2<sup>nd</sup>: </b>{toMoney(other2)} (25%)</p>
                                <p><b>3<sup>rd</sup>: </b>{toMoney(other3)} (15%)</p>
                                <p><b>4<sup>th</sup>: </b>{toMoney(other4)} (12%)</p>
                                <p><b>5<sup>th</sup>: </b>{toMoney(other5)} (10%)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;