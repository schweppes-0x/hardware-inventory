import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Hardware from './components/Hardware';
import Header from './components/Header';  // Import the Header component

function App() {
    const navigate = useNavigate();  // Use navigate to redirect

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="App">
            <Header />  {/* Use the Header component here */}
            <main>
                <Routes>
                    <Route path="/" element={
                        <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center text-white">
                            <h1 className="text-4xl font-bold">Welcome to Hardware Inventory</h1>
                            <p className="mt-4 text-lg">Manage your company's hardware efficiently.</p>
                            <button
                                onClick={handleLoginRedirect}
                                className="mt-6 py-3 px-6 bg-yellow-500 text-gray-800 rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                            >
                                Login
                            </button>
                        </div>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/hardware" element={<Hardware />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
