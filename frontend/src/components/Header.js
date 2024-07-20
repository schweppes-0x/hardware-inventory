import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('accessToken');

    return (
        <header className="bg-white p-4 text-blue-500">
            <nav className="flex justify-center space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/hardware" className="hover:underline">Hardware</Link>
                        <button
                            onClick={handleLogout}
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
