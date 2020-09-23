const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(bodyParser.json());

//database config
const db = require('./config/keys').mongoURL;

//connect to mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server Started on port ${port}`));
