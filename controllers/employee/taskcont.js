const Task = require('../../models/employee/taskModel');
const Employee = require('../../models/employee/employeeModel.js');

// function of error handling
function  errorhandle (code , err ,res ){
    console.log(err);
    res.status(code).json({
         status:"fail",
         error:"Intarnal server error"
    })
}
// create Task 
exports.createTask = async(req,res)=>{
    const datauser = await Employee.findById(req.user.id);
    if(!datauser){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
   try{
      let data = req.body;
      const newTask= new Task(data);
      const response = await newTask.save();
    
      //sendEmail(newAdmin.email,'Welcome to our website', 'Thank you for registering with us!');
        res.status(201).json({
          status:"success",
          response
        });
   }catch(err){errorhandle(500,err,res)}
  };

// get all task 
exports.getAllTask =async (req,res)=>{
    const data = await Employee.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    
    try{
       const taskData = await Task.find();
       
       res.status(200).json({
         status:"success",
         result:taskData.length,
         data:{
           taskData
         }
       })
    }catch(err){errorhandle(500,err,res)}
  };


// get single data of task
exports.getTask =async(req,res)=>{
    const data = await Employee.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    try{
       const taskData = await Task.findById(req.params.id);
       if(!taskData){
           return res.status(404).json({
             status:"fail",
             error:" task not found"
          })
       }
  
       res.status(200).json({
          status:"success",
          taskData
       })
    }catch(err){errorhandle(500,err,res)}   
  };

// task update route
exports.taskUpdate = async(req,res)=>{
    try{
       const taskId  = req.params.id;
       const taskData = req.body;
       
       const response = await Task.findByIdAndUpdate(taskId,taskData,{
         new:true,
         runValidators:true
       })
       if(!response){
        return res.status(404).json({
            status:"fail",
            error:"task not found"
        })
       }
  
       console.log('data updated');
       res.status(200).json({
        status:"success",
        data:response
    })
    }catch(err){errorhandle(500,err,res)}
  };

// delete task data 
exports.deleteTask =async(req,res)=>{
  const data = await Employee.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const taskId  = req.params.id;
     
     const response = await Task.findByIdAndDelete(taskId)
     if(!response){
      return res.status(404).json({
          status:"fail",
          error:"Admin not found"
      })
     }
     res.status(200).json({
      status:"success",
  })
  }catch(err){errorhandle(500,err,res) }
};
  
  