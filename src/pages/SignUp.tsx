import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { TABLE_NAMES } from '../config/supabaseConfig';
import supabaseClient from '../config/supabaseClient';

function capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function SignUp() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
            setFormError('Please fill in all of the fields');
            return;
        }

        if (password !== confirmPassword) {
            setFormError('Please confirm both password fields match');
            return;
        }

        if (password.length < 6) {
            setFormError('Please user a password that is at least 6 character long');
            return;
        }

        if (!EmailValidator.validate(email)) {
            setFormError('Please make sure you submitted a valid email address');
            return;
        }

        // Check to make sure the username hasn't been used before
        const { data: usernameCheckData, error: usernameCheckError } = await supabaseClient
            .from(TABLE_NAMES.USER_INFO)
            .select('username')
            .eq('username', username);
    
        if (usernameCheckData?.length !== 0) {
            setFormError('Sorry, that username is taken, please try a different one');
            return;
        }

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });

        if (error) {
            setFormError('An error occurred when signing you up, please reach out to Ryan');
            return;
        }

        const { id } = data.user as User;
        const capitalizedFirstName = capitalize(firstName);
        const capitalizedLastName = capitalize(lastName);

        const { data: userInfoData, error: userInfoError } = await supabaseClient
            .from(TABLE_NAMES.USER_INFO)
            .insert({ id, username, first_name: capitalizedFirstName, last_name: capitalizedLastName })
            .select();

        if (userInfoData) {
            setFormError(null);
            navigate('/sign-up-success');
        }
    };

    return(
        <div className='page sign-up'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <label htmlFor='first-name'>First Name:</label>
                <input 
                    type='text'
                    id='first-name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor='last-name'>Last Name:</label>
                <input 
                    type='text'
                    id='last-name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor='email'>Email:</label>
                <input 
                    type='text'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor='username'>Username:</label>
                <input 
                    type='text'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor='password'>Password:</label>
                <input 
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor='confirm-password'>Confirm Password:</label>
                <input 
                    type='password'
                    id='confirm-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className='sign-up'>Sign Up</button>

                {formError && formError.length > 0 && <p className='form-error'>{formError}</p>}
            </form>
        </div>
    );
}

export default SignUp;