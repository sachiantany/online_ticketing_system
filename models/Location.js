const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    route_id: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
})

module.exports = Location = mongoose.model('location', LocationSchema);