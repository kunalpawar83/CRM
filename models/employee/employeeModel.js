const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const employeeSc =  new mongoose.Schema({
   firstName:{
      type:String,
      required:true
   },
   lastName:{
      type:String,
   },
   gender:{
      type:String,
      required:true,
      emun:['Male','Female']
   },
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
    designation:{
      type:String,
    },
    selectDepartment:{
      type:String,
      emun:['Development', 'Designing','Testing','HR']
    },
    address:{
      type:String,
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      validate:[validator.isEmail,'Please provide valid email']
   },
    dateOfBirth:{
      type:String,
      required:true
    },
    education:{
      type:String
    },
    image:{
      type:String,
      required:true
    }

});

employeeSc.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')){
      return next();
    }
    try{
      const salt  = await bcrypt.genSalt(9);
 
      const hashedPassword = await bcrypt.hash(user.password,salt);
 
      user.password = hashedPassword;
      this.passwordConfirm =undefined;
      next();
    }catch(err){
          return next(err)
    }
  
 });
 
 employeeSc.methods.comparePassword = async function(candidatePassword){
    try{
       const isMatch = await bcrypt.compare(candidatePassword,this.password);
       return isMatch;
    }catch(err){
       throw err;
    }
 }
 


const Employee = mongoose.model('Employee',employeeSc);
module.exports = Employee;