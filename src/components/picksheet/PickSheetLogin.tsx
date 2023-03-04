import { useState } from 'react';
import supabaseClient from '../../config/supabaseClient';

function PickSheetLogin() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formError, setFormError] = useState<string | null>(null);
    
    const onHandleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email || !password) {
            setFormError('Please fill in both of the fields');
            return;
        }

        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

        if (error) {
            setFormError('Something went wrong signing you in, please double check your email and password');
            return;
        }
    };

    return(
        <div className='picksheet-login'>
            <h1>Sign In</h1>
            <form className='picksheet-login-form' onSubmit={onHandleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input 
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='password'>Password:</label>
            <input 
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className='sign-up'>Sign In</button>

            {formError && formError.length > 0 && <p className='form-error'>{formError}</p>}
        </form>
        </div>
    );
}

export default PickSheetLogin;