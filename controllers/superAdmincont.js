const SuperAd = require('../models/superAdmin.js');
const Admin = require('../models/admin/adminModel.js');
const {generateToken} = require('../utils/jwt.js');
//const { sendEmail }= require('../utils/email.js');
const sendEmail= require('../utils/nodemailer.js');

function  errorhandle (code , err ,res ){
    console.log(err);
    res.status(code).json({
         status:"fail",
         error:"Intarnal server error"
    })
}

//superAdmin signup
exports.superAdminsignup = async(req,res)=>{
    try{
     //const dataFile =  req.file.path;
     let data = req.body;
     //data.photo = dataFile;
    const newUser = new SuperAd(data);
    const response = await newUser.save();
    const payload = {
        id:response.id
     } 
     
    const token  = generateToken(payload);

    res.status(201).json({
    status:"success",
    token:token,
    response
        });
      
    }catch(err){errorhandle(500,err,res)};
};

// SUPERDMIN LOGIN ROUTE
exports.superAdminlogin =async(req,res)=>{
    try{
      const {email, password} = req.body;
      const user  = await SuperAd.findOne({email:email});

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
};

// CREATE ADMIN 
exports.createAdmin= async(req,res)=>{
    const data = await SuperAd.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
   try{
    //const dataFile =  req.file.path;
    //req.body.image = dataFile;
    let data = req.body;
   const newAdmin= new Admin(data);
   const response = await newAdmin.save();
   await sendEmail({
        email:data.email,
        subject:"wellcome to our website",
        message:"thank you  to join us for your success"

    })
   res.status(201).json({
   status:"success",
   response
       });
     
   }catch(err){errorhandle(500,err,res)}
};
// get all admin 
exports.getAllAdmin =async (req,res)=>{
    const data = await SuperAd.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    
    try{
       const adminData = await Admin.find();
       
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
exports.getAdmin =async(req,res)=>{
    const data = await SuperAd.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    try{
       const adminData = await Admin.findById(req.params.id);
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
 
// admin  update route
exports.adminUpdate = async(req,res)=>{
    try{
       const adminId  = req.params.id;
       const adminData = req.body;
       
       const response = await Admin.findByIdAndUpdate(adminId,adminData,{
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
 
 // delete admin data 
exports.deleteAdmin =async(req,res)=>{
    const data = await SuperAd.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    try{
       const adminId  = req.params.id;
       
       const response = await Admin.findByIdAndDelete(adminId)
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
 
 

