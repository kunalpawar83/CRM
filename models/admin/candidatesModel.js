const mongoose  = require('mongoose');
const validator = require('validator');

const candidateSc = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide valid email']
    },
    mobile:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    jobtitle:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        emun:['Full Time','Part Time','Internship','other'],
        required:true
    }

});

const Candidates = new mongoose.model('Candidates',candidateSc);
module.exports = Candidates;

