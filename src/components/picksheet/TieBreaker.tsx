type TieBreakerProps = {
    finalGame: string;
    priorTiebreaker: string | null;
    lastGameCompleted: boolean;
}

function TieBreaker(props: TieBreakerProps) {
    const { finalGame, priorTiebreaker, lastGameCompleted } = props;

    return (
        <div className='container pb-6'>
            <h3 className='title is-3'>Tiebreaker:</h3>
            <h4 className='subtitle'>Please enter what you think the combined score will be in the Monday night game ({finalGame})</h4>
            <div className='field columns'>
                <div className='control column is-1'>
                    <input
                        className='input'
                        type='text'
                        id='tiebreaker'
                        name='tiebreaker'
                        placeholder='0'
                        defaultValue={priorTiebreaker === null ? '' : priorTiebreaker}
                        disabled={lastGameCompleted}
                    />
                </div>
            </div>
        </div>
    );
}

export default TieBreaker;