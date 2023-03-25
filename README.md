For updating the season results, for now let's just use: http://www.alkemis.com/jsonEditor.htm

https://stackoverflow.com/questions/998832/gui-based-or-web-based-json-editor-that-works-like-property-explorer

For updating any styling with sass:
`sass --no-source-map src/sass/index.scss:src/index.css --load-path=node_modules`

For processing a week
`node scripts/processWeek.js --year {year} --week {week} --firstRun true`
^^^ Only run this script if this is for partial results prior to the Monday night games
*Between these runs, go into the season.json file and update the "evaluated" property to true for whatever has been evaluated
`node scripts/processWeek.js --year {year} --week {week} --firstRun false`
^^^ Run this after the Monday night game to get the final week results




TODO:
- Add referral to the sign up (DONE)
- Add Sass to the project to change color scheme a bit (DONE)
- Update the `processWeek` script to actually process the week (DONE)
    - Do I just pull everything from the DB or download it manually and create a json file?
        - Decided to pull it all on the first run and then reference the json file after
- Look into getting a personal stats page working (DONE-ish for now, might want to revisit this)
    - Would probably need to download/automate the picks so that they're in an accessible JSON file
    - Performance by team, average tiebreaker, etc.
- Get the picksheet to factor in if a user has submitted picks already or if they're still in the survivor pool (DONE -not going to do resubmissions for now)
    - Also update to disable any picks for the margin pool/survivor pool (DONE)
- Check the ability to do partial pick sheets and allow for submissions on Thurs and Fri
    - For now I might just allow you to submit it twice and I can manually handle combining the two
- Update the processWeek script to handle a player who didn't submit (DONE)
- Update picksheet to handle the thursday night game(s) having already been played
- Write instructions for what to do to make it all work (e.g. what to do on Monday morning, Tuesday morning, etc.)
- Actually get this online and double check make sure things work
- Do a dry run to make sure that the process works
- Get automated emails working

TODOs for year 2:
- Add a Hall of Fame

Maybe TODOs:
- Add in the ability to sign in and sign out (maybe)
- Weekly score box (maybe?)
    - Not gonna do this unless people want it
- Check to see how implementing a "game not finished" yet cell would look for the survivor table
