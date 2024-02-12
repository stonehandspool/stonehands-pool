import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { MARCH_MADNESS_STATE, SIGN_UPS_DISABLED } from '../constants';

function NavBar() {
    const [burgerState, setBurgerState] = useState(false);
    // Using a key for the dropdowns in the navbar will make sure that they close every time you click a link in them
    // This will change the key prop for the div causing a re-render which will ensure the dropdowns always close when
    // you click a link in them
    const { key: location } = useLocation();

    const onBurgerClick = () => {
        setBurgerState(!burgerState);
    };

    return (
        <nav className='navbar is-primary is-fixed-top no-print' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand ml-6'>
                <a className='navbar-item' href='/'>
                    <h3 className='title is-4 has-text-white stonehands-hero'>STONEHANDS</h3>
                </a>
                <a
                    role='button'
                    className={`navbar-burger ${burgerState ? 'is-active' : ''}`}
                    aria-label='menu'
                    aria-expanded='false'
                    onClick={onBurgerClick}
                >
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </a>
            </div>
            <div className={`navbar-menu mr-6 ${burgerState ? 'is-active' : ''}`}>
                <div className='navbar-end'>
                    <Link className='navbar-item' to='/about' onClick={onBurgerClick}>About</Link>
                    <Link className='navbar-item' to='/picksheet' onClick={onBurgerClick}>Picksheet</Link>
                    <div className='navbar-item has-dropdown is-hoverable' key={`${location}-dd-1`}>
                        <a className='navbar-link'>Standings</a>
                        <div className='navbar-dropdown'>
                            <Link className='navbar-item' to='/season-standings' onClick={onBurgerClick}>Season</Link>
                            <Link className='navbar-item' to='/weekly-standings' onClick={onBurgerClick}>Weekly</Link>
                            <Link className='navbar-item' to='/survivor' onClick={onBurgerClick}>Survivor</Link>
                            <Link className='navbar-item' to='/margin' onClick={onBurgerClick}>Margin</Link>
                            <Link className='navbar-item' to='/high-five' onClick={onBurgerClick}>High Five</Link>
                        </div>
                    </div>
                    <div className='navbar-item has-dropdown is-hoverable' key={`${location}-dd-2`}>
                        <a className='navbar-link'>More</a>
                        <div className='navbar-dropdown is-right'>
                            <Link className='navbar-item' to='/weekly-picks' onClick={onBurgerClick}>Picks</Link>
                            <Link className='navbar-item' to='/weekly-picks-images' onClick={onBurgerClick}>Picks w/ Images</Link>
                            <Link className='navbar-item' to='/consensus' onClick={onBurgerClick}>Consensus</Link>
                            <Link className='navbar-item' to='/standings-by-week' onClick={onBurgerClick}>Standings By Week</Link>
                            <Link className='navbar-item' to='/yearly-awards' onClick={onBurgerClick}>Yearly Awards</Link>
                            <Link className='navbar-item' to='/payouts' onClick={onBurgerClick}>2023 Payouts</Link>
                        </div>
                    </div>
                    {MARCH_MADNESS_STATE !== 'INACTIVE' && (
                        <div className='navbar-item has-dropdown is-hoverable' key={`${location}-dd-3`}>
                            <a className='navbar-link'>March Madness</a>
                            <div className='navbar-dropdown'>
                                <Link className='navbar-item' to='/march-madness/about' onClick={onBurgerClick}>About</Link>
                                <Link className='navbar-item' to='/march-madness/picksheet' onClick={onBurgerClick}>Picksheet</Link>
                                <Link className='navbar-item' to='/march-madness/standings' onClick={onBurgerClick}>Standings</Link>
                            </div>
                        </div>
                    )}
                    {!SIGN_UPS_DISABLED && <Link className='navbar-item' to='/sign-up' onClick={onBurgerClick}>Sign Up</Link>}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;