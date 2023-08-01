import { useState } from 'react';
import * as EmailValidator from 'email-validator';
import supabaseClient from '../config/supabaseClient';

function PasswordReset() {
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (password !== password2) {
            setFormError('Sorry, those passwords do not match');
            return;
        }

        const { data, error } = await supabaseClient
            .auth
            .updateUser({ password });

        if (data) {
            setFormSuccess('Success! Please save your new password!');
            setFormError(null);
            return;
        }
        
        if (error) {
            setFormError('An error occurred when signing you up, please reach out to Ryan');
            return;
        }
    };

    return (
        <section className='section'>
            <div className='columns is-centered'>
                <div className='column is-one-third'>
                    <div className='container'>
                        <form className='box' onSubmit={handleSubmit}>
                            <h1 className='title has-text-centered'>Password Reset</h1>
                            <h2 className='subtitle has-text-centered'>Please enter the new password you would like to use</h2>

                            <div className='field'>
                                <label className='label' htmlFor='password'>Password:</label>
                                <div className='control'>
                                    <input
                                        className='input' 
                                        type='text'
                                        id='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='field'>
                                <label className='label' htmlFor='password2'>Re-enter Password:</label>
                                <div className='control'>
                                    <input
                                        className='input' 
                                        type='text'
                                        id='password2'
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='control'>
                                <button className='button is-primary'>Reset Password</button>
                            </div>

                            {formSuccess && formSuccess.length > 0 && <p className='help is-success'>{formSuccess}</p>}
                            {formError && formError.length > 0 && <p className='help is-danger'>{formError}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PasswordReset;