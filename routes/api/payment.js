

const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const config = require('config');

const jwt = require('jsonwebtoken');



//busRoute Model

const Payment = require('../../models/AddCash');
const Trip = require('../../models/Trip');
//const User = require('../../models/User');



// @route  POST api/payment

router.post('/insert',(req,res) => {

    const newPayment = new Payment({

        name:req.body.name,

        email: req.body.email,

        cardNo:req.body.cardNo,

        expDate:req.body.expDate,

        CCV:req.body.CCV,

        amount:req.body.amount

    });

    console.log(newPayment);

    newPayment.save().then(payment => res.json(payment));

});

//get all payment details
router.get('/', (req, res) =>{
    Payment.find()
        .then(payment =>res.status(200).json(payment))
        .catch(err => {
            console.log(err)
        })
});


//get payment details by id
router.get('/:id', (req, res) =>{
    Payment.findById(req.params.id)
        .then(payment =>res.status(200).json(payment))
        .catch(err => {
            console.log(err)
        })
});


//get payment details by email
router.get('/email/:id', (req, res) =>{
    Payment.find({email:req.params.id})
        .then(payment =>res.status(200).json(payment))
        .catch(err => {
            console.log(err)
        })
});







module.exports = router;