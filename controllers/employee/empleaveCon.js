const Empleave =  require('../../models/employee/leavesModel.js');
const Employee = require('../../models/employee/employeeModel.js');
const { generateToken } = require('../../utils/jwt.js');

function  errorhandle (code , err ,res ){
    console.log(err);
    res.status(code).json({
         status:"fail",
         error:"Intarnal server error"
    })
}

// admin login
exports.emplogin = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user  = await Employee.findOne({email:email});
  
        // if email does not exist or pasword does not match , return error 
        if(!user || !(await user.comparePassword(password))){
          return res.status(400).json({
             status:"fail",
             error:"Invalid  email or password"
          })
        }
        
        const payload = {
          id:user.id
       } 
       
       const token  = generateToken(payload);
        res.status(201).json({
             status:"success",
             token:token
        })
  
      }catch(err){errorhandle(500,err,res)}     
}

//create leave 
exports.createLeave= async(req,res)=>{
  const datauser = await Employee.findById(req.user.id);
  if(!datauser){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
 try{
    let data = req.body;
    data.employeeName = datauser.firstName;
    data.employeeId = req.user.id;
    const newEmployee= new Empleave(data);
    const response = await newEmployee.save();
  
    //sendEmail(newAdmin.email,'Welcome to our website', 'Thank you for registering with us!');
      res.status(201).json({
        status:"success",
        response
      });
   
 }catch(err){errorhandle(500,err,res)}
};

// get all leave 
exports.getAllLeave =async (req,res)=>{
  const data = await Employee.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  
  try{
     const leaveData = await Empleave.find();
     
     res.status(200).json({
       status:"success",
       result:leaveData.length,
       data:{
         leaveData
       }
     })
  }catch(err){errorhandle(500,err,res)}
};

// get single data of leave
exports.getLeave =async(req,res)=>{
  const data = await Employee.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const leaveData = await Empleave.findById(req.params.id);
     if(!leaveData){
         return res.status(404).json({
           status:"fail",
           error:" with this id leave of employee not found"
        })
     }

     res.status(200).json({
        status:"success",
        leaveData
     })
  }catch(err){errorhandle(500,err,res)}   
};

// leave update route
exports.leaveUpdate = async(req,res)=>{
  try{
     const leaveId  = req.params.id;
     const leaveData = req.body;
     
     const response = await Empleave.findByIdAndUpdate(leaveId,leaveData,{
       new:true,
       runValidators:true
     })
     if(!response){
      return res.status(404).json({
          status:"fail",
          error:"User not found"
      })
     }

     console.log('data updated');
     res.status(200).json({
      status:"success",
      data:response
  })
  }catch(err){errorhandle(500,err,res)}
};

 // delete leave data 
 exports.deleteleave =async(req,res)=>{
  const data = await SuperAd.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const adminId  = req.params.id;
     
     const response = await Empleave.findByIdAndDelete(adminId)
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