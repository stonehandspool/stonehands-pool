import { useState } from 'react';
import * as EmailValidator from 'email-validator';
import supabaseClient from '../config/supabaseClient';

function PasswordResetRequest() {
    const [email, setEmail] = useState<string>('');
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!EmailValidator.validate(email)) {
            setFormError('Please make sure you submitted a valid email address');
            return;
        }

        const { data, error } = await supabaseClient
            .auth
            .resetPasswordForEmail(email, { redirectTo: 'https://stonehands.org/password-reset' })

        if (data) {
            console.log(data);
            setFormSuccess('Success! Please check your email for a password reset link.');
            setFormError(null);
            return;
        }

        if (error) {
            console.log(error);
            setFormError('Sorry, an error occurred when trying to reset your password, please reach out to Ryan.');
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
                            <h2 className='subtitle has-text-centered'>If you forgot your email, please email Ryan at <a href='mailto:ryan@stonehands.org'>ryan@stonehands.org</a></h2>

                            <div className='field'>
                                <label className='label' htmlFor='email'>Email:</label>
                                <div className='control'>
                                    <input
                                        className='input' 
                                        type='text'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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

export default PasswordResetRequest;