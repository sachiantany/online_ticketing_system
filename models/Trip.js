const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const TripSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    route_id: {
        type: String,
        required: true
    },
    startLocation: {
        type: Number,
        required: true
    },
    travelStartTime:{
        type: Date,
        default: Date.now()
    },
    endLocation: {
        type: Number
    },
    fair:{
        type:Number
    },
    distance:{
        type: Number
    },
})

module.exports = Trip = mongoose.model('trip', TripSchema);