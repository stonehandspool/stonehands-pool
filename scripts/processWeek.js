import * as fs from 'node:fs';
import * as path from 'path';

const args = process.argv;
const year = args[args.length - 2];
const week = args[args.length - 1];

// First make sure we received a valid year and week
if (isNaN(week) || (parseInt(week, 10) < 1 && parseInt(week, 10) > 18)) {
    console.log(`Please make sure that a valid week between 1 and 18 was passed in, got: ${week}`);
    process.exit();
}

if (isNaN(year)) {
    console.log('Please submit a valid year');
    process.exit();
}

// Now get the data from the season results json file
const weekData = {};
fs.readFile(path.resolve(`data/${year}/season.json`), (err, data) => {
    if (err) {
        console.log('Error reading the season.json, double check to make sure the file exists');
        process.exit();
    }

    const seasonData = JSON.parse(data);
    weekData = seasonData[`week_${week}`];
});

// Now get the data frin

console.log(weekData);
