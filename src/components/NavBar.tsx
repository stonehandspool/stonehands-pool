import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className='nav'>
            <h1>Stonehand Pool</h1>
            <Link to='/'>Home</Link>
            <Link to='/picksheet'>Picksheet</Link>
            <div className='nav-drop-down'>
                <button className='nav-drop-down-button'>
                    Standings <i className='fa fa-caret-down'></i>
                </button>
                <div className='nav-drop-down-content'>
                    <Link to='/season-standings'>Season</Link>
                    <Link to='/weekly-standings'>Weekly</Link>
                </div>
            </div>
            <div className='nav-drop-down'>
                <button className='nav-drop-down-button'>
                    Picks <i className='fa fa-caret-down'></i>
                </button>
                <div className='nav-drop-down-content'>
                    <Link to='/weekly-picks'>Picks</Link>
                    <Link to='/weekly-picks-images'>Picks w/ Images</Link>
                </div>
            </div>
            <Link to='sign-up'>Sign Up</Link>
        </nav>
    )
}

export default NavBar;