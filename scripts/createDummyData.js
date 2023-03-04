const fakeSubmissions = [];
const confidences = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
for (let i = 0; i < 100; i++) {
    const fakeSubmission = { id: `fake-user-${i}`, firstName: 'Random', lastName: `Name${i}`, highFivePicks: [] };
    // First pick all of the matchups randomly
    for (let i = 0; i < dummyData.length; i++) {
        const matchup = dummyData[i];
        const randomChoice = Math.random();
        fakeSubmission[`matchup-${i}`] = randomChoice < 0.5 ? matchup.homeTeam : matchup.awayTeam;
    }

    // Now set random confidences
    shuffle(confidences);
    for (let i = 0; i < dummyData.length; i++) {
        fakeSubmission[`matchup-${i}-confidence`] = confidences[i];
    }

    // Now pick a survivor pick
    const randomMatchup = dummyData[Math.floor(Math.random() * dummyData.length)];
    const randomChoice = Math.random();
    fakeSubmission['survivor-pick'] = randomChoice < 0.5 ? randomMatchup.homeTeam : randomMatchup.awayTeam;

    // Now pick a margin pick
    const randomM = dummyData[Math.floor(Math.random() * dummyData.length)];
    const rand = Math.random();
    fakeSubmission['margin-pick'] = rand < 0.5 ? randomM.homeTeam : randomM.awayTeam;

    // Now pick random high five picks
    for (let i = 0; i < 5; i++) {
        const num = parseInt(confidences[i], 10) - 1;
        const randMatchup = dummyData[num];
        const randC = Math.random();
        fakeSubmission.highFivePicks.push(randC < 0.5 ? randMatchup.homeTeam : randMatchup.awayTeam);
    }

    // Now pick a random tiebreaker
    fakeSubmission.tiebreaker = Math.floor(Math.random() * 45) + 5;

    fakeSubmissions.push(fakeSubmission);
}

console.log(fakeSubmissions);
const foo = [];
for (let i = 0; i < fakeSubmissions.length; i++) {
    foo.push({ id: `fake-submission-id-${i}`, week: 18, submission_data: fakeSubmissions[i] });
}