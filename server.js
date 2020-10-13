const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const cors = require('cors');

app.use(cors());

//Middleware
app.use(express.json());

//database config
const db = config.get('mongoURI');

//connect to mongo
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

//User routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/busRoute',require('./routes/api/busRoutes'));
app.use('/api/location',require('./routes/api/location'));
app.use('/api/trip',require('./routes/api/trip'));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server Started on port ${port}`));
