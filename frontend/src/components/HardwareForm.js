import React, { useState, useEffect } from 'react';

const HardwareForm = ({ hardware, isEditing, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [status, setStatus] = useState('IN_STORAGE');
    const [serialNumber, setSerialNumber] = useState('');

    useEffect(() => {
        if (isEditing && hardware) {
            setTitle(hardware.title);
            setBrand(hardware.brand);
            setModel(hardware.model);
            setSpecifications(hardware.specifications);
            setOrderDate(hardware.orderDate.split('T')[0]);
            setStatus(hardware.status);
            setSerialNumber(hardware.serialNumber || '');
        } else {
            setTitle('');
            setBrand('');
            setModel('');
            setSpecifications('');
            setOrderDate('');
            setStatus('IN_STORAGE');
            setSerialNumber('');
        }
    }, [isEditing, hardware]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing
                ? `http://localhost:8081/api/v1/hardware/${hardware.id}`
                : 'http://localhost:8081/api/v1/hardware';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    title,
                    brand,
                    model,
                    specifications,
                    orderDate,
                    status,
                    serialNumber
                })
            });

            if (!response.ok) {
                throw new Error(isEditing ? 'Failed to update hardware' : 'Failed to create hardware');
            }

            const result = await response.json();
            onSave(result);
            onClose();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Hardware' : 'Create New Hardware'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Brand</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Model</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Specifications</label>
                        <textarea
                            value={specifications}
                            onChange={(e) => setSpecifications(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Order Date</label>
                        <input
                            type="date"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="IN_STORAGE">In Storage</option>
                            <option value="IN_USAGE">In Usage</option>
                            <option value="ORDERED">Ordered</option>
                            <option value="DESTROYED">Destroyed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Serial Number</label>
                        <input
                            type="text"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {isEditing ? 'Save Changes' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HardwareForm;
