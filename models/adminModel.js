const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const adminSc =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide valid email']
     },
     role:{
        type:String,
        emun:['admin'],
        default:'admin'
     },
     password:{
        type:String,
        required:true,
     }
});

adminSc.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')){
      return next();
    }
    try{
      const salt  = await bcrypt.genSalt(9);
 
      const hashedPassword = await bcrypt.hash(user.password,salt);
 
      user.password = hashedPassword;
      next();
    }catch(err){
          return next(err)
    }
  
 });
 
 adminSc.methods.comparePassword = async function(candidatePassword){
    try{
       const isMatch = await bcrypt.compare(candidatePassword,this.password);
       return isMatch;
    }catch(err){
       throw err;
    }
 }
 


const Admin = mongoose.model('Admin',adminSc);
module.exports = Admin;