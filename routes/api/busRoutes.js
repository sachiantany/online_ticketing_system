const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//busRoute Model
const BusRoute = require('../../models/BusRoutes');

// @ROUTER  GET api/busRoutes
router.get('/',(req,res) =>{
    BusRoute.find()
        .then(bus_route => res.json(bus_route))
});

module.exports = router;
