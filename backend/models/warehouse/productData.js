const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    ptype: {type: String, required: true},
    pcategory: {type: String, required: true},
    pname: {type: String, required: true},
    pimg: {type: String, required: true},
    pno: {type: String, required: true},
    pprice: {type: String, required: true},
    pdiscount: {type: String, required: false},
    pdesc: {type: String, required: true}
});

module.exports = mongoose.model('ProductList', prodSchema);