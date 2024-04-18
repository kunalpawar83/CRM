const mongoose = require('mongoose');

const paymentSc = new mongoose.Schema({

    billno:{
        type:String,
        required:true,
        unique:true
    },
    clientname:{
        type:String,
        required:true
    },
    employeename:{
        type:String,
        emun:['DR.John Deo','DR.Rajesh','DR.Kunal','DR.Sujal'],
        required:true,

    },
    paymentdate:{
        type:Date,
        default:Date.now()
    },
    discount:{
        type:String
    },
    totalammount:{
        type:String
    },
    paymentmethod:{
        type:String,
        emun:['Cash','Cheque','Credit Card','Debit Card','Net Banking','Insurence'],
        required:true
    },
    paymentstatus:{
        type:String,
        emun:['Complete','Pending','Partial'],
        required:true
    }

});

const  Payment = new mongoose.model('Payment',paymentSc);
module.exports = Payment;
