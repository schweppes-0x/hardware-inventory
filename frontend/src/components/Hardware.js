import React, { useEffect, useState } from 'react';

const Hardware = () => {
    const [hardwareData, setHardwareData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasAccess, setHasAccess] = useState(true); // New state for access control

    useEffect(() => {
        const fetchHardwareData = async () => {
            try {
                // Check if data is cached
                const cachedData = localStorage.getItem('hardwareData');
                if (cachedData) {
                    setHardwareData(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }

                // Fetch data from the API if not cached
                const response = await fetch('http://localhost:8081/api/v1/hardware', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if (response.status === 403) {
                    setHasAccess(false);
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch hardware data');
                }

                const data = await response.json();
                setHardwareData(data);
                setLoading(false);

                // Cache the data
                localStorage.setItem('hardwareData', JSON.stringify(data));
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        // Fetch data on component mount
        fetchHardwareData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!hasAccess) return (
        <div className="min-h-screen bg-gray-100 p-4 text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="mt-4">You have no access to view/edit data. Please contact your administrator.</p>
        </div>
    );
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Hardware List</h1>
            <div className="grid grid-cols-1 gap-4">
                {hardwareData.map(hardware => (
                    <div key={hardware.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{hardware.title}</h2>
                        <p><strong>Brand:</strong> {hardware.brand}</p>
                        <p><strong>Model:</strong> {hardware.model}</p>
                        <p><strong>Specifications:</strong> {hardware.specifications}</p>
                        <p><strong>Order Date:</strong> {new Date(hardware.orderDate).toLocaleDateString()}</p>
                        <p><strong>Serial Number:</strong> {hardware.serialNumber}</p>
                        <p><strong>Status:</strong> {hardware.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hardware;
