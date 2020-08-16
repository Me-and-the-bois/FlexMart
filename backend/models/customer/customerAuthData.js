const mongoose = require('mongoose');

const customerAuthSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    phone: {type: String, required: true},
    type: {type: String, required: true}
});

module.exports = mongoose.model('CustomerAuthList', customerAuthSchema);