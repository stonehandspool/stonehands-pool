import { useLocation } from "react-router-dom";

function MarchMadnessPicksheetSuccess() {
    // Get the users picks via the navigate hook
    const { state: userPicks } = useLocation();
    const finalMatchup = userPicks[userPicks.length - 1];
    const winner = finalMatchup.winner === 'top' ? finalMatchup.topTeam.name : finalMatchup.bottomTeam.name;

    return (
        <section className='section'>
            <div className='columns is-centered'>
                <div className='column is-three-quarters'>
                    <h1 className='title has-text-centered no-print'>Success!</h1>
                    <p className='has-text-centered no-print'>
                        Thank you for your submission, it has been sent the database for safe keeping!
                    </p>
                    <p className='has-text-centered no-print'>
                        You picked <b>{winner}</b> to win the tournament! Good luck and thank you for playing!
                    </p>
                </div>
            </div>
        </section>
    );
}

export default MarchMadnessPicksheetSuccess;