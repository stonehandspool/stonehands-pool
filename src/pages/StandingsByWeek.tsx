import { useState } from 'react';
import { CURRENT_WEEK, CURRENT_YEAR, MatchupInfo } from '../constants';
import ConfidenceByWeekTable from '../components/standings/ConfidenceByWeekTable';
import seasonData from '../../data/2025/football/season.json';

const incorrectMessages = [
  "Sorry, that week hasn't happened yet!",
  "Sorry, that week hasn't happened yet!",
  "Sorry, that week hasn't happened yet!",
  "Sorry, that week hasn't happened yet!",
  "Sorry, that week hasn't happened yet!",
  'Ok wise guy, what did you think would happen?',
  'Ok, I get it. You can stop now.',
  'Ok, but like seriously though.',
  "Ooh, maybe in this week you'll actually do well",
  "But this week you'll probably do terrible",
  "You're persistent, aren't you?",
  "Someone's feeling lucky...",
  "Ok, you've made your point.",
  "Ok, I'm running out of snarky comments...",
  'Or am I?',
  'Yeah, I think I am.',
  'I think you should stop.',
  'This is just embarassing for you now',
  'Really though.',
  'Magic mirror on the wall, who is the silliest of them all...',
  'If you go any further you might break the website!!',
  "Not actually though, I'd have to be a pretty bad developer to let that happen.",
  "It would be kinda funny though if it did, wouldn't it?",
  'It would not! How dare you think that?!',
  'Ok, you win. I give up.',
  'If you email Ryan the secret passphrase: "Mango: Massive Angry Nocturnal Green-eyed Orange" you will be awarded the "Secret Mango Award" which will be announced in the next update email he sends! Don\'t tell anybody else though! This is a secret between us!',
];

function StandingsByWeek() {
  const [activeChoice, setActiveChoice] = useState<number>(1);
  const [incorrectWeekClicks, setIncorrectWeekClicks] = useState<number>(-1);

  const weekGames: MatchupInfo[] = seasonData.find(weekInfo => weekInfo.weekId === `week_${activeChoice}`)!.matchups;
  const numGames = weekGames.length;
  const lastMatchup = weekGames.find(game => game.matchupId === `matchup_${numGames}`)!;
  const mondayTotal = lastMatchup.awayScore + lastMatchup.homeScore;

  const showChoice = (week: number) => {
    if (week > CURRENT_WEEK) {
      setIncorrectWeekClicks(incorrectWeekClicks + 1);
    }
    setActiveChoice(week);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">Weekly standings for week {activeChoice}</h2>
        <div className="tabs is-centered is-boxed">
          <ul>
            {Array.from({ length: 18 }, (_, i) => i + 1).map(week => {
              return (
                <li className={activeChoice === week ? 'is-active' : ''} key={`option-${week}`}>
                  <a
                    onClick={() => {
                      showChoice(week);
                    }}
                  >
                    <span>{week}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="container">
          {activeChoice <= CURRENT_WEEK && (
            <h5 className="subtitle is-5 has-text-centered">The tiebreaker this week was {mondayTotal}</h5>
          )}
          {activeChoice <= CURRENT_WEEK && <ConfidenceByWeekTable week={activeChoice} />}
          {activeChoice > CURRENT_WEEK && (
            <h5 className="subtitle is-5 has-text-centered">
              {incorrectWeekClicks < incorrectMessages.length
                ? incorrectMessages[incorrectWeekClicks]
                : incorrectMessages[incorrectMessages.length - 1]}
            </h5>
          )}
        </div>
      </div>
    </section>
  );
}

export default StandingsByWeek;
