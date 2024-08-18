const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
});

// User registration (Optional)
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    const newUser = new User({ username, password, role });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
});

module.exports = router;
