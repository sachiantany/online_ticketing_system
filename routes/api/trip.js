const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//busRoute Model
const Trip = require('../../models/Trip');

// @route  POST api/trip
router.post('/insert',(req,res) => {
    const newTrip = new Trip({
        username:req.body.username,
        route_id:req.body.route_id,
        startLocation:req.body.startLocation,
        endLocation:0,
        fair:0,
        distance:0
    });
    newTrip.save().then(trip => res.json(trip));
});

// @route   GET
// @desc    Return whether the trip is to start or end
router.get('/status/:id',(req,res) =>{
    Trip.countDocuments({username : req.params.id,endLocation : 0})
        .then(trip => res.json(trip))
});

// @route   UPDATE
// @desc    End Trip
router.route('/endTrip/:id').post((req, res) =>{
    Trip.findOneAndUpdate({username:req.params.id},{endLocation: 0})
        .then(trip =>{
            trip.endLocation = req.body.endLocation;
            trip.distance = req.body.distance;
            trip.fair = req.body.distance;

            trip.save()
                .then(() => res.json('Category Updated!'))
                .catch(err => res.status(400).json('Error is: ' + err));
        })
        .catch(err => res.status(400).json('Error is:' + err));
});

//@roter GET
// desc get trip info of a user
router.get('/:id',(req,res) =>{
    Trip.find({username : req.params.id,endLocation : 0})
        .then(trip => res.json(trip))
});

module.exports = router;