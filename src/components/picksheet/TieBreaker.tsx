function TieBreaker() {
    return (
        <div className='container pb-6'>
            <h3 className='title is-3'>Tiebreaker:</h3>
            <h4 className='subtitle'>Please enter what you think the combined score will be in the Monday night game</h4>
            <div className='field columns'>
                <div className='control column is-1'>
                    <input className='input' type='text' id='tiebreaker' placeholder='0' />
                </div>
            </div>
        </div>
    );
}

export default TieBreaker;