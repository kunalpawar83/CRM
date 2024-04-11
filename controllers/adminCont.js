const Admin = require('../models/adminModel.js');
const { generateToken } = require('../utils/jwt.js');
const Emp = require('../models/employeeModel.js');
const Client = require('../models/clientModel.js');

function  errorhandle (code , err ,res ){
    console.log(err);
    res.status(code).json({
         status:"fail",
         error:"Intarnal server error"
    })
}

// admin login
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

// CREATE employee
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
    const newEmployee= new Emp(data);
    const response = await newEmployee.save();
  
    //sendEmail(newAdmin.email,'Welcome to our website', 'Thank you for registering with us!');
      res.status(201).json({
        status:"success",
        response
      });
   
 }catch(err){errorhandle(500,err,res)}
};

// get all employee
exports.getAllEMP =async (req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  
  try{
     const employeeData= await Emp.find();
     
     res.status(200).json({
       status:"success",
       result:employeeData.length,
       data:{
         employeeData
       }
     })
  }catch(err){errorhandle(500,err,res)}
};

// get single data of employee
exports.getEMP =async(req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const employeeData = await Emp.findById(req.params.id);
     if(!adminData){
         return res.status(404).json({
           status:"fail",
           error:"employee not found"
        })
     }

     res.status(200).json({
        status:"success",
        employeeData
     })
  }catch(err){errorhandle(500,err,res)}   
};

// employee  update route
exports.empUpdate = async(req,res)=>{
  try{
     const employeeId  = req.params.id;
     const employeeData = req.body;
     
     const response = await Emp.findByIdAndUpdate(employeeId,employeeData,{
       new:true,
       runValidators:true
     })
     if(!response){
      return res.status(404).json({
          status:"fail",
          error:"employee not found"
      })
     }

     console.log('data updated');
     res.status(200).json({
      status:"success",
      data:response
  })
  }catch(err){errorhandle(500,err,res)}
};

// delete employee data 
exports.deleteEmp =async(req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const employeeId  = req.params.id;
     
     const response = await Emp.findByIdAndDelete(employeeId)
     if(!response){
      return res.status(404).json({
          status:"fail",
          error:"employee not found"
      })
     }

     console.log('data updated');
     res.status(200).json({
      status:"success",
  })
  }catch(err){errorhandle(500,err,res) }
};


// create client
exports.createClient= async(req,res)=>{
  const data = await Admin.findById(req.user.id);
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
    const newClient= new Client(data);
    const response = await newClient.save();
  
    //sendEmail(newAdmin.email,'Welcome to our website', 'Thank you for registering with us!');
      res.status(201).json({
        status:"success",
        response
      });
   
 }catch(err){errorhandle(500,err,res)}
};

// get all client
exports.getAllClient =async (req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  
  try{
     const clientData= await Client.find();
     
     res.status(200).json({
       status:"success",
       result:clientData.length,
       data:{
         clientData
       }
     })
  }catch(err){errorhandle(500,err,res)}
};

// get single data of client
exports.getClient =async(req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const clientData = await Emp.findById(req.params.id);
     if(!adminData){
         return res.status(404).json({
           status:"fail",
           error:"client not found"
        })
     }

     res.status(200).json({
        status:"success",
        clientData
     })
  }catch(err){errorhandle(500,err,res)}   
};

// client  update route
exports.clientUpdate = async(req,res)=>{
  try{
     const clientId = req.params.id;
     const clientData = req.body;
     
     const response = await Emp.findByIdAndUpdate(clientId,clientData,{
       new:true,
       runValidators:true
     })
     if(!response){
      return res.status(404).json({
          status:"fail",
          error:"client not found"
      })
     }

     console.log('data updated');
     res.status(200).json({
      status:"success",
      data:response
  })
  }catch(err){errorhandle(500,err,res)}
};

// client data data 
exports.deleteCLient =async(req,res)=>{
  const data = await Admin.findById(req.user.id);
  if(!data){
      return res.status(400).json({
         status:"fail",
         error:"you do not perform this operation"
      })
  }
  try{
     const clientId  = req.params.id;
     
     const response = await Emp.findByIdAndDelete(clientId)
     if(!response){
      return res.status(404).json({
          status:"fail",
          error:"client not found"
      })
     }

     res.status(200).json({
      status:"success",
  })
  }catch(err){errorhandle(500,err,res) }
};
