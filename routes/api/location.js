const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//busRoute Model
const Location = require('../../models/Location');

// @ROUTER  GET api/location
router.get('/',(req,res) =>{
    Location.find()
        .then(location => res.json(location))
});

module.exports = router;