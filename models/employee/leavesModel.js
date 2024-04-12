const mongoose = require('mongoose');

const empLeaveSc = new mongoose.Schema({
      applyDate:{
        type:String,
        required:true
      },
      formDate:{
        type:String,
        required:true
      },
      toDate:{
        type:String,
        required:true
      },
      halfDay:{
        type:String,
        emun:['Yes','No'],
        required:true
      },
      type:{
         type:String,
         emun:['Casual Leave','Sick Leave','Privilage Leave', 'Marriage Leave','Maternity Leave'],
         default:'Casual Leave'
      },
      status:{
        type:String,
        emun:['Approved','Rejected','Pending'],
        default:'Pending'
      },
      reason:{
        type:String,
        required:true
      },
      employeeName:String,
      employeeId:String
});
 
const Empleaves = mongoose.model('Empleaves',empLeaveSc);
module.exports = Empleaves;