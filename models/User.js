const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);