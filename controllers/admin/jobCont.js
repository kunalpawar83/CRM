const Admin =  require('../../models/admin/adminModel.js');
const Job = require('../../models/admin/jobModel.js');

function errorhandler(code, err,res){
    console.log(err),
    res.status(code).json({
        status:"fail",
        error:"internal server error"
    })
};

//create  job
exports.createJob= async(req,res)=>{
    const data =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do  not  perform this operation"
        })
    };
    try{
        let jobData  =  req.body;
        const newJob = new Job(jobData);
        const response = await newJob.save(); 
        
        res.status(201).json({
            status:"success",
            response
        })

    }catch(err){
          errorhandler(500,err,res);
    }
};

// get all Job
exports.getAllJob= async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this  operation"
        })
    };
    try{
         const jobData= await Job.find();
         res.status(200).json({
            status:"success",
            result:jobData.length,
            jobData
         })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// get  job
exports.getJob= async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const jobData = await Job.findById(req.params.id);
        if(!jobData){
             return res.status(404).json({
                status:"fail",
                error:"job  not found"
             })
        };

        res.status(200).json({
            status:"success",
            jobData
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// update  job
exports.updateJob  = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const jobId= req.params.id;
        const jobData= req.body;
        const response = await Job.findByIdAndUpdate(jobId,jobData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"job not found"
            })
        };
        res.status(200).json({
            status:"success",
            response
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// delete job
exports.deleteJob = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this opeartion"
        })
    };
    try{
        const jobId= req.params.id;
        const response = await Job.findByIdAndDelete(jobId);
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:" job  not found"
            })
        };

        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}