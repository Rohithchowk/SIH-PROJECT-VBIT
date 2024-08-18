import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestList from './RequestList';

const UserPage = () => {
    const [requests, setRequests] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            <RequestList requests={requests} fetchRequests={fetchRequests} />
        </div>
    );
};

export default UserPage;
