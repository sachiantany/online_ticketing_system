const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const PaymentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cardNo: {
        type: Number,
        required: true,
        unique: true
    },
    expDate: {
        type: Date,
        required: true,
    },
    CCV: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = Payment = mongoose.model('payment', PaymentSchema);