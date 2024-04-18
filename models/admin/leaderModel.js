const mongoose = require('mongoose');
const validator = require('validator');


const leaderSc =  new mongoose.Schema({
    name:{
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
    project:{
        type:String,
        required:true
    },
    mobile:{
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

});

const Leader = new mongoose.model('Leader',leaderSc);
module.exports = Leader;