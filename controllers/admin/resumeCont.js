const Admin = require('../../models/admin/adminModel.js');
const Resume = require('../../models/admin/resumeModel.js');

function errorhandler(code, err, res){
    console.log(err),
    res.status(code).json({
        status:"fail",
        error:"internal server error"
    })
};

// create 
exports.createResume = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const resumeData =req.body;
        const newResume = Resume(resumeData);
        const response = await newResume.save();

        res.status(201).json({
            status:"success",
            response
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

//get all resume
exports.getAllResume = async(req,res)=>{
    const data= await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const  resumeData = await Resume.find();
        res.status(200).json({
            status:"success",
            result:resumeData.length,
            resumeData
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// get resume
exports.getResume = async(req,res)=>{
    const data =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation "
        })
    };
    try{
        const resumeData = await Resume.findById(req.params.id);
        if(!resumeData){
            return res.status(404).json({
                status:"fail",
                error:"resume not found !"
            })
        };

        res.status(200).json({
            status:"success",
            resumeData
        })

    }catch(err){
        errorhandler(500,err,res);
    }
};

// update resume
exports.updateResume = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const resumeId = req.params.id;
        const resumeData = req.body;
        const response = await Resume.findByIdAndUpdate(resumeId,resumeData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"resume not found"
            })
        }
        res.status(200).json({
            status:"success",
            response
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// delete resume 
exports.deleteResume = async(req,res)=>{
    const data =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"

        })
    };
    try{
        const resumeId = req.params.id;
        const response = await Resume.findByIdAndDelete(resumeId);
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"resume not found"
            })
        };
        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}