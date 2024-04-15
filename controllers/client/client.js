const Client = require('../../models/client/clientModel.js');
const clientproject = require('../../models/client/projectModel.js');
const { generateToken } = require('../../utils/jwt.js');

function errorhandle( code , err , res){
     console.log(err),
     res.status(code).json({
        status:"fail",
        error:'Internal server error'
     })
};

// client login 
exports.clientlogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const client=  await Client.findOne({email:email});

        // if  email does not exist or password does not match,
        if(!client ||!(await client.comparePassword(password))){
            return res.status(400).json({
                status:"fail",
                error:"Invalid email or password"
            })
        };
        const payload ={
            id:client.id
        }
        const token = generateToken(payload);
        res.status(201).json({
            status:'success',
            token:token
        })

    }catch(err){errorhandle(500,err,res)}
}

// create client project 
exports.createProject= async(req,res)=>{
    const data = await Client.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
   try{
      let data = req.body;
      const newProject= new clientproject(data);
      const response = await newProject.save();
    
      //sendEmail(newAdmin.email,'Welcome to our website', 'Thank you for registering with us!');
        res.status(201).json({
          status:"success",
          response
        });
     
   }catch(err){errorhandle(500,err,res)}
  };
  

// get all project 
exports.getAllProject =async (req,res)=>{
    const data = await Client.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    
    try{
       const projectData = await clientproject.find();
       
       res.status(200).json({
         status:"success",
         result:projectData.length,
         data:{
           projectData
         }
       })
    }catch(err){errorhandle(500,err,res)}
  };

// get single data of project
exports.getProject=async(req,res)=>{
    const data = await Client.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    try{
       const projectData = await clientproject.findById(req.params.id);
       if(!projectData){
           return res.status(404).json({
             status:"fail",
             error:" project not found"
          })
       }
  
       res.status(200).json({
          status:"success",
          projectData
       })
    }catch(err){errorhandle(500,err,res)}   
  };

// project update route
exports.projectUpdate = async(req,res)=>{
    try{
       const projectId = req.params.id;
       const projectData = req.body;
       
       const response = await clientproject.findByIdAndUpdate(projectId,projectData,{
         new:true,
         runValidators:true
       })
       if(!response){
        return res.status(404).json({
            status:"fail",
            error:"project not found"
        })
       }
  
       console.log('data updated');
       res.status(200).json({
        status:"success",
        data:response
    })
    }catch(err){errorhandle(500,err,res)}
  };

// delete project data 
exports.deleteProject =async(req,res)=>{
    const data = await Client.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    try{
       const projectId  = req.params.id;
       
       const response = await clientproject.findByIdAndDelete(projectId)
       if(!response){
        return res.status(404).json({
            status:"fail",
            error:" project not found"
        })
       }
       res.status(200).json({
        status:"success",
    })
    }catch(err){errorhandle(500,err,res) }
  };
    
    


