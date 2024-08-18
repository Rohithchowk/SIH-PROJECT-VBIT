const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const wastemnapi = require('./apis/api');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('./models/user'); 
const FormDataModel=require('./models/FormData')

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res)=>{
    

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/api/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})


app.use('/api',  wastemnapi); 

mongoose.connect('mongodb+srv://miniproject1729:miniproject1729@cluster0.ylskpxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
