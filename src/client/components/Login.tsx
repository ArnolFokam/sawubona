import React, { useEffect, useState } from 'react';

interface UserLogin {
    email: string;
    password: string;
}

async function login(credentials: UserLogin) {
    try {
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error(`Login failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error; // Re-throw for handling in component
    }
}

export default function Login({ setToken }: { setToken: (userToken: { token: string }) => void }) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailValError, setEmailValError] = useState<string | null>(null);
    const [passwordValError, setPasswordValError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password: string) => {
        // Adjust minimum password length and complexity requirements as needed
        return password.length >= 8;
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        // Basic validation with clear error messages
        let isValid = true;
        setError(null); // Clear previous errors
        setEmailValError(null); // Clear previous errors
        setPasswordValError(null); // Clear previous errors

        if (!validateEmail(email)) {
            setEmailValError('Invalid email format. Please enter a valid email address.');
            isValid = false;
        } else if (email.length === 0) {
            setEmailValError('Please enter your email address.');
            isValid = false;
        }

        if (!validatePassword(password)) {
            setPasswordValError('Password must be at least 8 characters long.');
            isValid = false;
        }

        if (isValid) {
            setIsLoading(true);
            try {
                const token = await login({ email, password });
                setToken(token); // Handle successful login (redirect, success message)
                window.location.replace('/dashboard'); // Example redirect
            } catch (error: any) {
                console.log(error, error.response);
                if (error.response && error.response.data) {
                    setError(error.response.data.message || 'An unknown error occurred'); // Use specific error messages
                } else {
                    setError(error.message || 'An unknown error occurred'); // Fallback error
                }
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label className="text-gray-700 font-medium block mb-2">
                    <p>Email</p>
                    <input
                        type="text"
                        className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }${emailValError && (email.length === 0 || !validateEmail(email)) ? ' border-red-500' : ''}`}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    {emailValError && (email.length === 0 || !validateEmail(email)) && (
                        <div className="text-red-500 text-xs">{emailValError}</div>
                    )}
                </label>
                <label className="text-gray-700 font-medium block mb-2">
                    <p>Password</p>
                    <input
                        type="password"
                        className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }${passwordValError && !validatePassword(password) ? ' border-red-500' : ''}`} // Add error class for password
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    {passwordValError && !validatePassword(password) && (
                        <div className="text-red-500 text-xs">{passwordValError}</div>
                    )}
                </label>
                <div className="flex items-center justify-between">
                    {isLoading ? (
                        <button
                            type="button" // Change to button type for visual feedback
                            className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 cursor-not-allowed"
                            disabled
                        >
                            Loading...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    )}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Don't have an account?
                    </a>
                </div>
                {error && ( // Only show error if email is valid
                    <div className="bg-red-500 text-white text-sm rounded-md px-4 py-2">{error}</div>
                )}
            </form>
        </div>
    );
}