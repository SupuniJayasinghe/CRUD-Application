const app = require('./App');
const port = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const express = require('express');
const cors  = require('cors');
const router = require('./router'); 

app.use(cors());
app.use(express.json());


const uri = 'mongodb+srv://supuni:123@psr.f9kxqbm.mongodb.net/?retryWrites=true&w=majority&appName=PSR';

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database',error);
    }
}

connect();

const server = app.listen(port, host, () => {
    console.log(`Server is listening to ${server.address().port}`);    
});

app.use('/api', router);


