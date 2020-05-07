const mongoose = require('mongoose');

const deliverymanSchema = mongoose.Schema({
    eid : {type: String, required: true},
    ename: {type: String, required: true},
    eemail: {type: String, required: true},
    epass: {type: String, required: true},
    eaddress: {type: String, required: true},
    emob: {type: String, required: true},
    epost: {type: String, required: true},
    esalary: {type: String, required: true}
});

module.exports = mongoose.model('DeliverymanList', deliverymanSchema);