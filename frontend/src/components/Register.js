import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation to check if all fields are filled
        if (!fullName || !username || !password) {
            setError('All fields are required.');
            return;
        }

        // Clear error if validation passes
        setError('');

        // Add your registration logic here
        console.log('Full Name:', fullName);
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
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
                    <button type="submit" className="w-full py-2 bg-green-500 text-white rounded">Register</button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
