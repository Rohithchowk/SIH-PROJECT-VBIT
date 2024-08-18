const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const wastemnapi = require('./apis/api');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', wastemnapi); // Prefix API routes for clarity

mongoose.connect('mongodb+srv://miniproject1729:miniproject1729@cluster0.ylskpxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
