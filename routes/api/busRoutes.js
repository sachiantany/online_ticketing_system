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


// @route  POST api/busRoute
router.post('/insert',(req,res) => {
    const newBusRoute = new BusRoute({
        name:req.body.BRName,
        route_id:req.body.BRId

    });
    newBusRoute.save().then(busRoutes => res.json(busRoutes));
});

module.exports = router;
