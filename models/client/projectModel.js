const mongoose = require('mongoose');

const projectClientSc =  new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    projectType:{
        type:String,
        required:true
    },
    openTask:{
        type:String,
        required:true
    },
    leadName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        emun:['New','Active','Hold','Closed']
    },
    lastModifyDate:{
        type:String,
        default:Date.now()
    },
    createDate:{
        type:Date,
        default:Date.now()
    }
});  

const ProjectClientSc = new mongoose.model('ProjectClientSc',projectClientSc);
module.exports = ProjectClientSc;