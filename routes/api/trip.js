const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//busRoute Model
const Trip = require('../../models/Trip');
const Payment = require('../../models/AddCash')
const User = require('../../models/User')

// @route  POST api/trip
router.post('/insert',(req,res) => {
    const newTrip = new Trip({
        username:req.body.username,
        route_id:req.body.route_id,
        startLocation:req.body.startLocation,
        endLocation:0,
        fair:0,
        distance:0,
        isGuest: req.body.isGuest
    });
    newTrip.save().then(trip => res.json(trip));
});


router.get('/',(req,res) =>{
    Trip.find()
        .then(trip => res.json(trip))
});

// @route   GET
// @desc    Return whether the trip is to start or end
router.get('/status/:id',(req,res) =>{
    Trip.countDocuments({username : req.params.id,endLocation : 0})
        .then(trip => res.json(trip))
});

// @route   GET
// @desc    Return whether the trip is to start or end
router.get('/isGuest/:id',(req,res) =>{
    User.countDocuments({email : req.params.id})
        .then(trip => res.json(trip))
});

// @route   UPDATE
// @desc    End Trip
router.route('/endTrip/:id').post((req, res) =>{
    Trip.findOneAndUpdate({username:req.params.id},{endLocation: 0})
        .then(trip =>{
            trip.endLocation = req.body.endLocation;
            trip.distance = req.body.distance;
            trip.fair = req.body.fair;

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

router.get('/tripSum/:id',(req,res) =>{
    Trip.aggregate([
        { "$match": { "username": req.params.id } },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$fair"
                }
            }
        }
    ])
        .then(trip => res.json(trip))
});

router.get('/paymentSum/:id',(req,res) =>{
    Payment.aggregate([
        { "$match": { "email": req.params.id } },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }
    ])
        .then(trip => res.json(trip))
});

module.exports = router;