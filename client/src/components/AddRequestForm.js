import React, { useState } from 'react';
import axios from 'axios';

const AddRequestForm = ({ fetchRequests }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description) return;
        try {
            await axios.post('https://sih-project-vbit.onrender.com/api/requests', { description });
            setDescription('');
            fetchRequests();
        } catch (error) {
            console.error('Error adding request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter waste description"
            />
            <button type="submit">Add Request</button>
        </form>
    );
};

export default AddRequestForm;
