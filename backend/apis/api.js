const express = require('express');
const mongoose = require('mongoose');
const WasteManagement = require('../models/wastemanagement');
const router = express.Router();

router.get('/requests', async (req, res) => {
    try {
        const requests = await WasteManagement.find();
        res.json(requests);
    } catch (err) {
        console.error("Error retrieving requests: ", err);
        res.status(500).json({ message: "Server Error: Unable to retrieve data", error: err.message });
    }
});

router.post('/requests', async (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ message: "Description is required" });
    }
    try {
        const newRequest = new WasteManagement({ description, status: 'Pending' });
        const savedRequest = await newRequest.save();
        res.json(savedRequest);
    } catch (err) {
        console.error("Error inserting data: ", err);
        res.status(500).json({ message: "Server Error: Unable to insert data", error: err.message });
    }
});

router.put('/requests/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedRequest = await WasteManagement.findByIdAndUpdate(
            id, 
            { status },
            { new: true, runValidators: true } // Return the updated document and validate
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
