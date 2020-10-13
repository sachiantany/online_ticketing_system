const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
 const cors = require('cors');

const app = express();

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
app.use('/api/payment',require('./routes/api/payment'));


const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server Started on port ${port}`));
