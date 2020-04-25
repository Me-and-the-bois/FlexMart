const mongoose = require('mongoose');

const DeliverySchema = mongoose.Schema({
    delivered: {type: String, required: true},
    deliveryman: {type: String, required: true},
    list: [{
            ptype: {type: String, required: true},
            pid: {type: String, required: true},
            pname: {type: String, required: true},
            pimg: {type: String, required: true},
            pno: {type: String, required: true},
            pprice: {type: String, required: true},
            tprice: {type: String, required: true},

    }]
});

module.exports = mongoose.model('DeliveryList', DeliverySchema);