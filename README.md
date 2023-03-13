For updating the season results, for now let's just use: http://www.alkemis.com/jsonEditor.htm

https://stackoverflow.com/questions/998832/gui-based-or-web-based-json-editor-that-works-like-property-explorer

For updating any styling with sass:
`sass --no-source-map src/sass/index.scss:src/index.css --load-path=node_modules`

TODO:
- Add referral to the sign up (DONE)
- Add Sass to the project to change color scheme a bit (DONE)
- Update the `processWeek` script to actually process the week
    - Do I just pull everything from the DB or download it manually and create a json file?
- Look into getting a personal stats page working
    - Would probably need to download/automate the picks so that they're in an accessible JSON file
    - Performance by team, average tiebreaker, etc.
- Actually get this online and double check make sure things work
- Do a dry run to make sure that the process works
- Get automated emails working
- Weekly score box (maybe?)
- Add a Hall of Fame
- Check the ability to do partial pick sheets and allow for submissions on Thurs and Fri