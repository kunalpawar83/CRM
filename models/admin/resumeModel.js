const mongoose = require('mongoose');

const resumeSc = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    jobtitle:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        emun:['Full Time','Part Time','Internship','Other'],
        required:true
    },
    status:{
        type:String,
        emun:['Open','Closed','Cancelled'],
        required:true
    }

});

const Resume = new mongoose.model('Resume',resumeSc);
module.exports = Resume;
