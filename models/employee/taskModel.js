const mongoose  = require('mongoose');

const taskSc = new mongoose.Schema({
    taskNo:{
        type:String,
        required:true
    },
    project:{
        type:String,
        required:true
    },
    client:{
        type:String,
        required:true
    },
    status:{
        type:String,
        emun:['Open','Closed']
    },
    priority:{
        type:String,
        emun:['High','Medium','Low'],
        default:'Medium'
    },
    type:{
        type:String,
        emun:['Bug','Error','Development'],
        required:true
    },
    excutor:{
        type:String,
        required:true
    },
    dateof: {
        type: Date,
        default:Date.now()
      },
    details:String
});


const Task = mongoose.model('Task',taskSc);
module.exports = Task;