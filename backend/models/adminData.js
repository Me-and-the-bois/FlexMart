const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    ename: {type: String, required: true},
    email: {type: String, required: true},
    epwd: {type: String, required: true},
    esal: {type: String, required: true},
    eimg: {type: String, required: true},
    etype: {type: String, required: true}
});

module.exports = mongoose.model('AdminList', adminSchema);