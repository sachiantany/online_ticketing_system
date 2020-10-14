

const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const config = require('config');

const jwt = require('jsonwebtoken');



//busRoute Model

const Payment = require('../../models/AddCash');
const User = require('../../models/User');



// @route  POST api/trip

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

/*router.get('/:id',  function(req, res){

    Payment.find({},function (err,docs) {
        if(err) res.json(err);
        else res.render('Index',{Payment:docs})
    });
       // .then(payment =>res.json(payment));
});*/

router.get('/:id', (req, res) =>{
    Payment.findById(req.params.id)
        .then(payment =>res.status(200).json({
            payment: payment
        }));
});

router.get('/', (req, res) =>{
    Payment.find()
        .then(payment =>res.status(200).json({
            payment: payment
        }));
});

/*router.get('/users', (req, res) =>{
    User.find()
        .then(user =>res.json(user));
});*/



module.exports = router;