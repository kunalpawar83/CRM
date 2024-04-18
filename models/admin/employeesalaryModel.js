const mongoose  = require('mongoose');
const validator = require('validator');

const salarySc =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    employeeid:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide valid email']
     },
     department:{
        type:String,
        emun:['Designing','Marketing','Accounting','Develoing','Testing'],
        default:"Other"
    },
    role:{
        type:String,
        emun:['Developer','Leader','Manager','Designer','Tester'],
        default:'Other'
    },
    salary:{
        type:Number,
        required:true
    }

});
const Salary = new mongoose.model('Salary',salarySc);
module.exports = Salary;