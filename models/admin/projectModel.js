const mongoose  = require('mongoose');
const { isLowercase } = require('validator');

const projectSc =  new mongoose.Schema({
   
      projectid:{
            type:String,
            required:true,
            unique:true
      },
      projecttitle:{
            type:String,
            required:true
      },
      department:{
            type:String,
            emun:['Designing','Development','Testing','Marketing','Account'],
            required:true
      },
      projectpriority:{
            type:String,
            emun:['Low','Medium','High']
      },
      client:{
            type:String,
            required:true
      },
      price:{
            type:Number,
            required:true
      },
      projectstartdate:{
            type:Date,
            default:Date.now()
      },
      projectenddate:{
            type:Date,
            default:Date.now()
      },
      team:{
            type:String,
            required:true,
            emun:['kunal', 'chetan','sujal','sawan']
      },
      workStatus:{
            type:String,
            emun:['Active','Completed','Running','Pending','Not Start','Cancled']
      },
      detail:{
            type:String
      },
      image:{
            type:String
      }
});

const Projectadmin = new mongoose.model('Projectadmin',projectSc);
module.exports = Projectadmin;