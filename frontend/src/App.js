import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Hardware from './components/Hardware';
import Header from './components/Header';  // Import the Header component

function App() {
    return (
        <Router>
            <div className="App">
                <Header />  {/* Use the Header component here */}
                <main>
                    <Routes>
                        <Route path="/" element={
                            <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center text-white">
                                <h1 className="text-4xl font-bold">Welcome to Hardware Inventory</h1>
                                <p className="mt-4 text-lg">Manage your company's hardware efficiently.</p>
                            </div>
                        } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/hardware" element={<Hardware />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
