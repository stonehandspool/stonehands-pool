import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { CURRENT_WEEK_CUTOFF_TIME, MARCH_MADNESS_STATE, SIGN_UPS_DISABLED } from '../constants';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function NavBar() {
  const [burgerState, setBurgerState] = useState(false);
  const [standingsState, setStandingsState] = useState(false);
  const [moreState, setMoreState] = useState(false);
  const [mmState, setMMState] = useState(false);

  // This is a lazy implementation that will not look for resizing, just on initial load
  const [windowDimensions] = useState<{ width: number; height: number }>(getWindowDimensions());
  const isMobile = windowDimensions.width <= 768;

  const currentTime = new Date();

  // Using a key for the dropdowns in the navbar will make sure that they close every time you click a link in them
  // This will change the key prop for the div causing a re-render which will ensure the dropdowns always close when
  // you click a link in them
  const { key: location } = useLocation();

  const onLinkClick = (loc: string) => {
    onBurgerClick();
    if (loc === 'standings') {
      onStandingsClick();
    } else if (loc === 'more') {
      onMoreClick();
    } else if (loc === 'mm') {
      onMMClick();
    }
  };

  const onBurgerClick = () => {
    setBurgerState(!burgerState);
  };

  const onStandingsClick = () => {
    setStandingsState(!standingsState);
  };

  const onMoreClick = () => {
    setMoreState(!moreState);
  };

  const onMMClick = () => {
    setMMState(!mmState);
  };

  return (
    <nav className="navbar is-primary is-fixed-top no-print" role="navigation" aria-label="main navigation">
      <div className="navbar-brand ml-6">
        <a className="navbar-item" href="/">
          <h3 className="title is-4 has-text-white stonehands-hero">STONEHANDS</h3>
        </a>
        <a
          role="button"
          className={`navbar-burger ${burgerState ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={onBurgerClick}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu mr-6 ${burgerState ? 'is-active' : ''}`}>
        <div className="navbar-end">
          <Link className="navbar-item" to="/about" onClick={onBurgerClick}>
            About
          </Link>
          <Link className="navbar-item" to="/hall-of-fame" onClick={onBurgerClick}>
            Hall of Fame
          </Link>
          {currentTime < CURRENT_WEEK_CUTOFF_TIME && (
            <Link className="navbar-item" to="/picksheet" onClick={onBurgerClick}>
              Picksheet
            </Link>
          )}
          {currentTime >= CURRENT_WEEK_CUTOFF_TIME && (
            <Link className="navbar-item" to="/my-picks" onClick={onBurgerClick}>
              My Picks
            </Link>
          )}
          <div
            className={`navbar-item has-dropdown is-hoverable ${standingsState && isMobile ? 'is-active' : ''}`}
            key={`${location}-dd-1`}
            onClick={onStandingsClick}
          >
            <a className="navbar-link">Standings</a>
            <div className="navbar-dropdown">
              <Link
                className="navbar-item"
                to="/season-standings"
                onClick={() => {
                  onLinkClick('standings');
                }}
              >
                Season
              </Link>
              <Link
                className="navbar-item"
                to="/weekly-standings"
                onClick={() => {
                  onLinkClick('standings');
                }}
              >
                Weekly
              </Link>
              <Link
                className="navbar-item"
                to="/survivor"
                onClick={() => {
                  onLinkClick('standings');
                }}
              >
                Survivor
              </Link>
              <Link
                className="navbar-item"
                to="/margin"
                onClick={() => {
                  onLinkClick('standings');
                }}
              >
                Margin
              </Link>
              <Link
                className="navbar-item"
                to="/high-five"
                onClick={() => {
                  onLinkClick('standings');
                }}
              >
                High Five
              </Link>
            </div>
          </div>
          <div
            className={`navbar-item has-dropdown is-hoverable ${moreState && isMobile ? 'is-active' : ''}`}
            key={`${location}-dd-2`}
            onClick={onMoreClick}
          >
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown is-right">
              <Link
                className="navbar-item"
                to="/weekly-picks"
                onClick={() => {
                  onLinkClick('more');
                }}
              >
                Picks
              </Link>
              <Link
                className="navbar-item"
                to="/weekly-picks-images"
                onClick={() => {
                  onLinkClick('more');
                }}
              >
                Picks w/ Images
              </Link>
              <Link
                className="navbar-item"
                to="/consensus"
                onClick={() => {
                  onLinkClick('more');
                }}
              >
                Consensus
              </Link>
              <Link
                className="navbar-item"
                to="/standings-by-week"
                onClick={() => {
                  onLinkClick('more');
                }}
              >
                Standings By Week
              </Link>
              <Link
                className="navbar-item"
                to="/all-user-stats"
                onClick={() => {
                  onLinkClick('more');
                }}
              >
                User Stats
              </Link>
              <Link
                className="navbar-item"
                to="/yearly-awards"
                onClick={() => {
                  onLinkClick('more');
                }}
              >
                2024 Awards
              </Link>
              <Link
                className="navbar-item"
                to="/payouts"
                onClick={() => {
                  onLinkClick('more');
                }}
              >
                2024 Payouts
              </Link>
            </div>
          </div>
          {MARCH_MADNESS_STATE !== 'INACTIVE' && (
            <div
              className={`navbar-item has-dropdown is-hoverable ${mmState && isMobile ? 'is-active' : ''}`}
              key={`${location}-dd-3`}
              onClick={onMMClick}
            >
              <a className="navbar-link">March Madness</a>
              <div className="navbar-dropdown">
                <Link
                  className="navbar-item"
                  to="/march-madness/about"
                  onClick={() => {
                    onLinkClick('mm');
                  }}
                >
                  About
                </Link>
                <Link
                  className="navbar-item"
                  to="/march-madness/picksheet"
                  onClick={() => {
                    onLinkClick('mm');
                  }}
                >
                  Picksheet
                </Link>
                <Link
                  className="navbar-item"
                  to="/march-madness/standings"
                  onClick={() => {
                    onLinkClick('mm');
                  }}
                >
                  Standings
                </Link>
                {/* <Link
                  className="navbar-item"
                  to="/march-madness/pool-consensus"
                  onClick={() => {
                    onLinkClick('mm');
                  }}
                >
                  Pool Consensus
                </Link>
                <Link
                  className="navbar-item"
                  to="/march-madness/teams-remaining"
                  onClick={() => {
                    onLinkClick('mm');
                  }}
                >
                  Teams Remaining
                </Link>
                <Link
                  className="navbar-item"
                  to="/march-madness/awards"
                  onClick={() => {
                    onLinkClick('mm');
                  }}
                >
                  2024 Awards
                </Link>
                <Link
                  className="navbar-item"
                  to="/march-madness/payouts"
                  onClick={() => {
                    onLinkClick('mm');
                  }}
                >
                  2024 Payouts
                </Link> */}
              </div>
            </div>
          )}
          {!SIGN_UPS_DISABLED && (
            <Link className="navbar-item" to="/sign-up" onClick={onBurgerClick}>
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
