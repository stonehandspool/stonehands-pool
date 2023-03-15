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
                <h3 className='title is-3'>Sponsorships/Referrals</h3>
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
                    You can read more about each pool below. The most important thing to know is that every pool is played straight up, no spread is factored in.
                </p>
                <h4 className='title is-4'>The Confidence Pool</h4>
                <div className='content'>
                    <p className='mb-5'>
                        This pool works by you picking a winner for every game in a given week. You assign points based off of your confidence that a team will win with 16 being
                        the most confident and 1 being the least confident. If a week has less than 16 games being played then the maximum confidence will be however many games are
                        played that week. The tiebreakers for this pool are as follows:
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
                    down to two players remaining <strong>before </strong> week 18 and they would both like to split the pot, they can contact me and that can be arranged.
                </p>
                <h4 className='title is-4'>The Margin Pool</h4>
                <p className='mb-5'>
                    This pool will run for the duration of the season. It follows the same rule of the survivor pool though where you can only pick each team once, no duplicates!
                    The player at the end of the season with the highest cumulative score will win the pot! If there happens to be a tie, the pot will be split.
                </p>
                <h4 className='title is-4'>The High Five Pool</h4>
                <div className='content'>
                    <p className='mb-5'>
                        This pool will also run for the duration of the season, so there is always a chance to come back! Each week, you will choose five team that you think will win.
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
                        any ties resulting in the pot being split.
                    </p>
                </div>
                <h3 className='title is-3'>Picksheets</h3>
                <p className='mb-5'>
                    Picksheets are due before kickoff of the first game of the week, no exceptions. If there is a Thursday night game at 8:00 then any sheets submitted after
                    then will not be accepted. If I can figure out how to make it work, I will allow for partial picksheets for the Thursday night game with a second cutoff prior
                    to the Sunday games, but for now there will be a cutoff on Thursdays. Anyone who fails to submit on time will get randomly chosen picks for all pools.
                </p>
                <h3 className='title is-3'>Payouts</h3>
                <p className='mb-5'>
                    The cost of the pool is TBD, this part will be filled out once that is figured out.
                </p>
            </div>
        </section>
    );
}

export default About;