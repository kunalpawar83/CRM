const mongoose  = require('mongoose')

const holidaySc =  new mongoose.Schema({
    holidayno:{
        type:String,
        required:true
    },
    holidayname:{
        type:String,
        required:true
    },
    holidaydate:{
        type:Date,
        default:Date.now()
    },
    location:{
        type:String,
        default:"All Location"
    },
    shift:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    }
});

const Holiday =  new mongoose.model('Holiday',holidaySc);
module.exports = Holiday;
