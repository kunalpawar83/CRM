const mongoose = require('mongoose');

const jobSc = new mongoose.Schema({
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
        emun:['Full Time','Part Time','Internship'],
        default:'Other'   
    },
    vacancies:{
        type:Number
    },
    status:{
        type:String,
        emun:['Open','Closed','Cancelled'],
        required:true
    },
    expiredate:{
        type:Date,
        default:Date.now()
    }
});

const Job = new mongoose.model('Job',jobSc);
module.exports = Job;