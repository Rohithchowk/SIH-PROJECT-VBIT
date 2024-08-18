const express = require('express');
const router = express.Router();
const WasteManagement = require('../models/wastemanagement');

// Get all requests
router.get('/requests', async (req, res) => {
    try {
        const requests = await WasteManagement.find();
        res.json(requests);
    } catch (err) {
        console.error("Error retrieving requests: ", err);
        res.status(500).json({ message: "Server Error: Unable to retrieve data", error: err.message });
    }
});

// Post a new request
router.post('/requests', async (req, res) => {
    const { description } = req.body;
    try {
        const newRequest = new WasteManagement({ description, status: 'Pending' });
        const savedRequest = await newRequest.save();
        res.json(savedRequest);
    } catch (err) {
        console.error("Error inserting data: ", err);
        res.status(500).json({ message: "Server Error: Unable to insert data", error: err.message });
    }
});

// Update a request
router.put('/requests/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedRequest = await WasteManagement.findByIdAndUpdate(
            id, 
            { status },
            { new: true } // Return the updated document
        );

        if (updatedRequest) {
            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: "Request not found" });
        }
    } catch (err) {
        console.error("Error updating request: ", err);
        res.status(500).json({ message: "Server Error: Unable to update data", error: err.message });
    }
});

// Delete a request
router.delete('/requests/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRequest = await WasteManagement.findByIdAndDelete(id);

        if (deletedRequest) {
            res.json({ message: "Request deleted successfully", id });
        } else {
            res.status(404).json({ message: "Request not found" });
        }
    } catch (err) {
        console.error("Error deleting request: ", err);
        res.status(500).json({ message: "Server Error: Unable to delete data", error: err.message });
    }
});

module.exports = router;
