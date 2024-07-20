import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Import useAuth

const Header = () => {
    const { token, logout } = useAuth();

    return (
        <header className="bg-white p-4 text-blue-500">
            <nav className="flex justify-center space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                {token ? (
                    <>
                        <Link to="/hardware" className="hover:underline">Hardware</Link>
                        <button
                            onClick={logout}
                            className="hover:underline bg-transparent border-none cursor-pointer text-blue-500"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
