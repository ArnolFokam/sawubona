import React, { useState } from 'react';

interface UserLogin {
    email: string;
    password: string;

}

async function register(credentials: UserLogin) {
    return fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        const response = await register({
            email,
            password
        });
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Email</p>
                <input type="text" onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            <a href="/">Already has an account?</a>
        </form>
    )
}
