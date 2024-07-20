import React, { useEffect, useState } from 'react';
import HardwareForm from './HardwareForm';

const Hardware = () => {
    const [hardwareData, setHardwareData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasAccess, setHasAccess] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterProperty, setFilterProperty] = useState('title');
    const [editHardware, setEditHardware] = useState(null);
    const [creatingHardware, setCreatingHardware] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchHardwareData = async () => {
            try {
                const cachedData = sessionStorage.getItem('hardwareData');
                if (cachedData) {
                    const data = JSON.parse(cachedData);
                    setHardwareData(data);
                    setFilteredData(data);
                    setLoading(false);
                    return;
                }

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
                setFilteredData(data);
                setLoading(false);

                sessionStorage.setItem('hardwareData', JSON.stringify(data));
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchHardwareData();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = hardwareData.filter(hardware => {
                const value = hardware[filterProperty]?.toLowerCase() || '';
                return value.includes(searchQuery.toLowerCase());
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(hardwareData);
        }
    }, [searchQuery, filterProperty, hardwareData]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleEdit = (hardware) => {
        setEditHardware(hardware);
    };

    const handleSave = (updatedHardware) => {
        const updatedData = hardwareData.map(hardware =>
            hardware.id === updatedHardware.id ? updatedHardware : hardware
        );
        setHardwareData(updatedData);
        setFilteredData(updatedData);
        sessionStorage.setItem('hardwareData', JSON.stringify(updatedData));
    };

    const handleCloseEdit = () => {
        setEditHardware(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/hardware/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete hardware');
                }

                const updatedData = hardwareData.filter(hardware => hardware.id !== id);
                setHardwareData(updatedData);
                setFilteredData(updatedData);
                sessionStorage.setItem('hardwareData', JSON.stringify(updatedData));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const handleCreate = (newHardware) => {
        setHardwareData([...hardwareData, newHardware]);
        setFilteredData([...hardwareData, newHardware]);
        sessionStorage.setItem('hardwareData', JSON.stringify([...hardwareData, newHardware]));
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (!hasAccess) return (
        <div className="min-h-screen bg-gray-100 p-4 text-center">
            <h1 className="text-2xl font-semibold text-red-600">Access Denied</h1>
            <p className="mt-4 text-lg">You have no access to view/edit data. Please contact your administrator.</p>
        </div>
    );
    if (error) return <div className="p-4">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Hardware List</h1>
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md"
                />
                <button
                    onClick={() => setCreatingHardware(true)}
                    className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Add New Hardware
                </button>
            </div>
            <div className="mb-4 flex items-center">
                <label htmlFor="filter-property" className="mr-2 text-gray-700">Filter by:</label>
                <select
                    id="filter-property"
                    value={filterProperty}
                    onChange={(e) => setFilterProperty(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="title">Category</option>
                    <option value="brand">Brand</option>
                    <option value="model">Model</option>
                    <option value="status">Status</option>
                </select>
                <label htmlFor="items-per-page" className="ml-4 mr-2 text-gray-700">Items per page:</label>
                <select
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                <tr>
                    <th className="p-3 border-b text-left text-gray-600">Category</th>
                    <th className="p-3 border-b text-left text-gray-600">Brand</th>
                    <th className="p-3 border-b text-left text-gray-600">Model</th>
                    <th className="p-3 border-b text-left text-gray-600">Specifications</th>
                    <th className="p-3 border-b text-left text-gray-600">Order Date</th>
                    <th className="p-3 border-b text-left text-gray-600">Status</th>
                    <th className="p-3 border-b text-left text-gray-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.length > 0 ? (
                    currentItems.map(hardware => (
                        <tr key={hardware.id} className="hover:bg-gray-50">
                            <td className="p-3 border-b text-gray-800">{hardware.title}</td>
                            <td className="p-3 border-b text-gray-800">{hardware.brand}</td>
                            <td className="p-3 border-b text-gray-800">{hardware.model}</td>
                            <td className="p-3 border-b text-gray-800">{hardware.specifications}</td>
                            <td className="p-3 border-b text-gray-800">{new Date(hardware.orderDate).toLocaleDateString()}</td>
                            <td className="p-3 border-b text-gray-800">{hardware.status}</td>
                            <td className="p-3 border-b">
                                <button
                                    onClick={() => handleEdit(hardware)}
                                    className="bg-blue-600 text-white px-4 py-1 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(hardware.id)}
                                    className="bg-red-600 text-white px-4 py-1 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="p-4 text-center text-gray-500">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            {editHardware && (
                <HardwareForm
                    hardware={editHardware}
                    isEditing={true}
                    onClose={handleCloseEdit}
                    onSave={handleSave}
                />
            )}
            {creatingHardware && (
                <HardwareForm
                    isEditing={false}
                    onClose={() => setCreatingHardware(false)}
                    onSave={handleCreate}
                />
            )}
        </div>
    );
};

export default Hardware;
