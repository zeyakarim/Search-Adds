const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String
    },
    url: {
        type: String,
        required: true
    } 
},{
    timestamps: true
});

const Company = mongoose.model('Company',companySchema);

module.exports = Company;