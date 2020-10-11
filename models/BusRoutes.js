const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const BusRouteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    route_id: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = BusRoutes = mongoose.model('bus_route', BusRouteSchema);