import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className='navbar is-primary' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <a className='navbar-item' href='/'>
                    <h3 className='title is-3 has-text-weight-bold has-text-white'>Stonehands Pool</h3>
                </a>
            </div>
            <div className='navbar-menu'>
                <div className='navbar-start'>
                    <Link className='navbar-item' to='/'>Home</Link>
                    <Link className='navbar-item' to='/about'>About</Link>
                    <Link className='navbar-item' to='/picksheet'>Picksheet</Link>
                    <div className='navbar-item has-dropdown is-hoverable'>
                        <a className='navbar-link'>Standings</a>
                        <div className='navbar-dropdown'>
                            <Link className='navbar-item' to='/season-standings'>Season</Link>
                            <Link className='navbar-item' to='/weekly-standings'>Weekly</Link>
                            <Link className='navbar-item' to='/survivor'>Survivor</Link>
                            <Link className='navbar-item' to='/margin'>Margin</Link>
                            <Link className='navbar-item' to='/high-five'>High Five</Link>
                        </div>
                    </div>
                    <div className='navbar-item has-dropdown is-hoverable'>
                        <a className='navbar-link'>Picks</a>
                        <div className='navbar-dropdown'>
                            <Link className='navbar-item' to='/weekly-picks'>Picks</Link>
                            <Link className='navbar-item' to='/weekly-picks-images'>Picks w/ Images</Link>
                        </div>
                    </div>
                    <Link className='navbar-item' to='/sign-up'>Sign Up</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;