import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddRequestForm from './components/AddRequestForm';
import RequestList from './components/RequestList';

const App = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        const response = await axios.get('https://sih-project-vbit.onrender.com/api/requests/');
        setRequests(response.data);
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="container">
            <header>
                <h1>Waste Management System</h1>
            </header>
            <AddRequestForm fetchRequests={fetchRequests} />
            <RequestList requests={requests} fetchRequests={fetchRequests} />
        </div>
    );
};

export default App;
