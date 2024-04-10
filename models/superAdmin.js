const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const superAdminSc = new mongoose.Schema({
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
     photo: String,
     password:{
        type:String,
        required:true
     },
     passwordConfirm: {
        type: String,
        required:true,
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
      },
});

superAdminSc.pre('save', async function(next) {
   const user = this;
   if(!user.isModified('password')){
     return next();
   }
   try{
     const salt  = await bcrypt.genSalt(9);

     const hashedPassword = await bcrypt.hash(user.password,salt);

     user.password = hashedPassword;

     this.passwordConfirm =undefined
     next();
   }catch(err){
         return next(err)
   }
 
});

superAdminSc.methods.comparePassword = async function(candidatePassword){
   try{
      console.log(candidatePassword);
      console.log(this.password);
      const isMatch = await bcrypt.compare(candidatePassword,this.password);
      return isMatch;
   }catch(err){
      throw err;
   }
}


const SuperAd = mongoose.model('SuperAd',superAdminSc);
module.exports = SuperAd;