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
        type:Number
      },
      billing:{
        type:String,
        emun:['Fixed Price', 'Hourly User Rate' , ' Hourly Job Rate'],
        required:true
      },
      password:{
        type:String,
        required:true
      }

});

clientSc.pre('save', async function(next) {
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

clientSc.methods.comparePassword = async function(candidatePassword){
  try{
     const isMatch = await bcrypt.compare(candidatePassword,this.password);
     return isMatch;
  }catch(err){
     throw err;
  }
}




const Client = mongoose.model('Client',clientSc);
module.exports = Client;