import { Link, useNavigate } from 'react-router-dom';
import supabaseClient from '../config/supabaseClient';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/password-reset');
      }
    });
  }, []);

  return (
    <section className="hero has-background-white is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title">Welcome to the</p>
          <h1 className="title is-1 stonehands-hero">Stonehands Pool</h1>
          <p className="subtitle">Est. 2023</p>
          <button className="button is-rounded is-primary">
            <Link className="has-text-white" to="/about">
              Learn More
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
