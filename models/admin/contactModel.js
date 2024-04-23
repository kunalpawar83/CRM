const mongoose  = require('mongoose');
const validator = require('validator');

const contactSc =  new mongoose.Schema({
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
    },
    birthdate:{
        type:Date,
        default:Date.now()
    },
    address:{
        type:String
    },
    note:{
        type:String
    }

});

const Contact = new mongoose.model('Contact',contactSc);
module.exports = Contact;