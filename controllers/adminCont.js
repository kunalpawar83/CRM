const Admin = require('../models/adminModel.js');
const { generateToken } = require('../utils/jwt.js');
const Emp = require('../models/adminModel.js');

function  errorhandle (code , err ,res ){
    console.log(err);
    res.status(code).json({
         status:"fail",
         error:"Intarnal server error"
    })
}


exports.adminLogin = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user  = await Admin.findOne({email:email});
  
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

// CREATE ADMIN 
exports.createEMP= async(req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
 try{
            const dataFile =  req.file.path;
            req.body.image = dataFile;
            let data = req.body;
            const newAdmin= new Emp(data);
          const response = await newAdmin.save();
  
        sendEmail(newAdmin.email,'Welcome to our website', 'Thank you for registering with us!');
          res.status(201).json({
        status:"success",
        response
          });
   
 }catch(err){errorhandle(500,err,res)}
};

// get all admin 
exports.getAllEMP =async (req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  
  try{
     const adminData = await Emp.find();
     
     res.status(200).json({
       status:"success",
       result:adminData.length,
       data:{
         adminData
       }
     })
  }catch(err){errorhandle(500,err,res)}
};

// get single data of admin
exports.getEMP =async(req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const adminData = await Emp.findById(req.params.id);
     if(!adminData){
         return res.status(404).json({
           status:"fail",
           error:"please provide valid  ID !"
        })
     }

     res.status(200).json({
        status:"success",
        adminData
     })
  }catch(err){errorhandle(500,err,res)}   
};

// EMP  update route
exports.adminUpdate = async(req,res)=>{
  try{
     const adminId  = req.params.id;
     const adminData = req.body;
     
     const response = await Emp.findByIdAndUpdate(adminId,adminData,{
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

// delete EMP data 
exports.deleteAdmin =async(req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const adminId  = req.params.id;
     
     const response = await Emp.findByIdAndDelete(adminId)
     if(!response){
      return res.status(404).json({
          status:"fail",
          error:"Admin not found"
      })
     }

     console.log('data updated');
     res.status(200).json({
      status:"success",
  })
  }catch(err){errorhandle(500,err,res) }
};

