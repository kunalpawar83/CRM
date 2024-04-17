const e = require('express');
const  mongoose  = require('mongoose');


const estimateSc = new mongoose.Schema({
    clientname:{
        type:String,
        reuired:true
    },
    estimatedate:{
        type:String,
    },
    expireddate:{
        type:String
    },
    country:{
        type:String
    },
    amount:{
        type:Number
    },
    status:{
        type:String,
        emun:['Accepted','Declined','Sent','Expired'],
        required:true
    },
    details:{
        type:String
    }
});

const Estimate = new mongoose.model('Estimate',estimateSc);
module.exports = Estimate;