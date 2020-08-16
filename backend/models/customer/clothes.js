const mongoose = require('mongoose');

const clothesSchema = mongoose.Schema({
    ptype: {type: String, required: true},
    pcategory: {type: String, required: true},
    pname: {type: String, required: true},
    pimg: {type: String, required: true},
    pno: {type: String, required: true},
    pprice: {type: String, required: true},
    pdiscount: {type: String, required: false},
    pdesc: {type: String, required: true},
    preview: [{
        pratings: {type: String, required: false},
        pcomments: {type: String, required: false}
    }]
});

module.exports = mongoose.model('ClothesList', clothesSchema);