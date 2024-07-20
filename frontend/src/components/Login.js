import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if (!username || !password) {
            setError('Both fields are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/v1/auth/signin', {
                username,
                password
            });

            localStorage.setItem('accessToken', response.data.accessToken);

            navigate('/hardware');

        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'An error occurred.');
            } else {
                setError('Wrong credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <label className="block mb-2 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className={`w-full py-2 ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Not registered yet? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
