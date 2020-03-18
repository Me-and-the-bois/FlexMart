const mongoose = require('mongoose');

const furnitureSchema = mongoose.Schema({
    ptype: {type: String, required: true},
    pid: {type: String, required: true},
    pname: {type: String, required: true},
    pimg: {type: String, required: true},
    pno: {type: String, required: true},
    pprice: {type: String, required: true}
});

module.exports = mongoose.model('FurnitureList', furnitureSchema);