import { Link } from 'react-router-dom';
import { CURRENT_WEEK } from '../constants';

function NavBar() {
    return (
        <nav className='navbar is-primary' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand ml-6'>
                <a className='navbar-item' href='/'>
                    <h3 className='title is-4 has-text-white stonehands-hero'>STONEHANDS</h3>
                </a>
            </div>
            <div className='navbar-menu mr-6'>
                <div className='navbar-end'>
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
                            <Link className='navbar-item' to='/consensus'>Consensus</Link>
                        </div>
                    </div>
                    {CURRENT_WEEK <= 1 && <Link className='navbar-item' to='/sign-up'>Sign Up</Link>}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;