# Stonehands Pool
A webapp made by Ryan Fandl to allow for a season-long NFL pool. The front end is made with React while the backend is handled by Supabase.

## Instructions

### Steps for setting up site for new season
- Run the `createNewSeason` script
- Add in as many matchups into the `data/{year}/season.json` file as desired
- Update the `CURRENT_YEAR` and `CURRENT_WEEK` values in `src/constants.ts`

### Daily Steps for Pool

#### Tuesday (Last Day of Previous Week/First of New Week)
- Run the process week script (firstRun = false) to get the results from Monday night
- Update the website with the results
- Send out end of week email announcing the winners and pool updates
- Update the `CURRENT_WEEK` (increment by 1), `CURRENT_WEEK_CUTOFF_TIME` (new Sunday date/time), `CURRENT_WEEK_FINAL_GAME` (Mon night game matchup), `MONDAY_NIGHT_TOTAL` (total of night befores game), and `PRIOR_WEEK_COMPLETE` (turn to true) values in the `constants.ts` file

#### Thursday
- Make sure automated reminder email is sent out
- Don't forget to make your own picks!

#### Friday
- Update the Thursday night results in the `data/{year}/season.json` file with scores
-- This will ensure that anyone updating their picksheets can't update any completed games

#### Saturday
- If games were played on Saturday, update the `data/{year}/season.json` file with scores

#### Sunday
- Make sure automated reminder email is sent out

#### Monday
- Update the `data/{year}/season.json` file with all of the scores from Sunday
- Run the `processWeek` script for the first time
- Update the `data/{year}/season.json` file to mark all completed games as evaluated
- Send out an update email with potential winners


### Processing a week
Run this script on Monday morning (after all Sunday games have been completed)
```sh
node scripts/processWeek.js --year {year} --week {week} --firstRun true
```
Run this script after the Monday night game(s) to complete the week
```sh
node scripts/processWeek.js --year {year} --week {week} --firstRun false
```
### Updating the Sass/CSS
```sh
sass --no-source-map src/sass/index.scss:src/index.css --load-path=node_modules
```

## Remaining Todo Items
- Write instructions for what to do to make this all work (e.g. what to do Monday morning, etc.)
- Get the website online
- Do a dry run
- Get automated emails working
- (Year 2) Add a Hall of Fame
- (Maybe) Add in the ability to sign in/out
- (Maybe) Get a modal for team/matchup info on the picksheet
- (Maybe) Add in a random stats page
-- Best + Worst, Thurs. Night Record, Monday Night Record, Pool Performance by Week (w/ Averages)

## Scrapped Ideas
- Weekly Score Box
-- Not going to do this unless previous Stablehand pool members want it back