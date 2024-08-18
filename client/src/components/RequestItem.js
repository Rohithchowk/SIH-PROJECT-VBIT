import React from 'react';
import axios from 'axios';

const RequestItem = ({ request, fetchRequests }) => {
    const handleComplete = async () => {
        try {
            await axios.put(`https://sih-project-vbit.onrender.com/api/requests/${request._id}`, { status: 'Completed' });
            fetchRequests();
        } catch (error) {
            console.error('Error completing request:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://sih-project-vbit.onrender.com/api/requests/${request._id}`);
            fetchRequests();
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    return (
        <li>
            <span>{request.description} - {request.status}</span>
            <div>
                {request.status === 'Pending' && (
                    <button onClick={handleComplete}>Complete</button>
                )}
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    );
};

export default RequestItem;
