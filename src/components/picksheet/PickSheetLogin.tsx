import { useState } from 'react';
import supabaseClient from '../../config/supabaseClient';

function PickSheetLogin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordFieldType, setPasswordFieldType] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | null>(null);

  const onHandleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError('Please fill in both of the fields');
      return;
    }

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setFormError('Something went wrong signing you in, please double check your email and password');
      return;
    }
  };

  const onTogglePasswordField = () => {
    setPasswordFieldType(!passwordFieldType);
  };

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-one-third">
          <div className="container">
            <form className="box" onSubmit={onHandleSubmit}>
              <h1 className="title has-text-centered">Sign In</h1>
              <div className="field">
                <label className="label" htmlFor="email">
                  Email:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="password">
                  Password:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={passwordFieldType ? 'password' : 'text'}
                    id="password"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <label className="checkbox">
                  <input type="checkbox" onChange={onTogglePasswordField} />
                  {passwordFieldType ? ' Show' : ' Hide'} password
                </label>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-primary">Sign In</button>
                </div>
              </div>
              <a href="/password-reset-request">Forgot Password</a>
              {formError && formError.length > 0 && <p className="form-error">{formError}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PickSheetLogin;
