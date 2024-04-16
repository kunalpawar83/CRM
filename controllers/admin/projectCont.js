const AdminProject = require('../../models/admin/projectModel.js');
const Admin = require('../../models/admin/adminModel.js');

 function errorhandle(code ,err, res){
     console.log(err);
     res.status(code).json({
        status:"fail",
        error:'Internal server error'
     })
 }

// create project
exports.createProject = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:" you do not perform this operation"
        })
    };
    try{
        //const dataFile =  req.file.path;
        //req.body.image = dataFile;
        let data  = req.body;
        const newProject = new AdminProject(data);
        const response = await newProject.save();

        res.status(201).json({
            status:"success",
            response
        })

    }catch(err){errorhandle(500,err,res)};
};

// get all project 
exports.getAllProject = async(req,res)=>{
    const data  =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:" you do not perform this operation"
        })
    };
    try{
       const projectData = await AdminProject.find();

       res.status(200).json({
           status:"success",
           result:projectData.length,
           projectData
       })
     
    }catch(err){errorhandle(500,err,res)}
};

// get project
exports.getProject = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const projectId = await AdminProject.findById(req.params.id);
        if(!projectId){
            return res.status(404).json({
                status:"fail",
                error:"project not found"
            })
        };
        res.status(200).json({
            status:"success",
            projectId
        })
    }catch(err){ errorhandle(500,err,res)}
}

// update project
exports.updateProject = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const projectId =  req.params.id;
        const projectData = req.body;

        const response = await AdminProject.findByIdAndUpdate(projectId,projectData,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"project not found"
            })
        };

        res.status(200).json({
            status:"success",
            response
        })

    }catch(err){errorhandle(500,err,res)}
}

// delete project
exports.deleteProject = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not  perform this operation"
        })
    }
    try{
        const projectId = req.params.id;

        const response = await AdminProject.findByIdAndDelete(projectId);
        if(!response){
            res.status(404).json({
                status:"fail",
                error:"project not found"
            })
        };
        res.status(200).json({
            status:"success"
        })

    }catch(err){errorhandle(500,err,res)}
}