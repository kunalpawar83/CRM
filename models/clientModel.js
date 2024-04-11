const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const clientSc =  new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      companyName:{
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
        required:true,
      },
      currency:{
        type:Number,
        required:true
      },
      billing:{
        type:String,
        emun:['Fixed Price', 'Hourly User Rate' , ' Hourly Job Rate'],
        required:true
      }

});


const Client = mongoose.model('Client',clientSc);
module.exports = Client;