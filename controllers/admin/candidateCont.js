const Admin  = require('../../models/admin/adminModel.js');
const Candidates = require('../../models/admin/candidatesModel.js');

function errorhandler(code,err,res){
    console.log(err),
    res.status(code).json({
        status:"fail",
        error:"internal server error"
    })
};

// create candidates
exports.createCandidate =  async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform these operation"
        })
    }
    try{
        const candidateData = req.body;
        const newCandidate = Candidates(candidateData);
        const response = await newCandidate.save();

        res.status(201).json({
            status:"success",
            response
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}

// get all candidates
exports.getAllCandidate = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation!"
        })
    };
    try{
        const candidateDate = await Candidates.find();

        res.status(200).json({
            status:"success",
            result:candidateDate.length,
            candidateDate
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// get candidate
exports.getCandidate = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const candidate = await Candidates.findById(req.params.id);
        if(!candidate){
            return res.status(404).json({
                status:"fail",
                error:"candidate not found"
            })
        };
        res.status(200).json({
            status:"success",
            candidate
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

exports.updateCandidate = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const candidateId = req.params.id;
        const candidateData = req.body;
        const response = await Candidates.findByIdAndUpdate(candidateId,candidateData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"candidate not found"
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

// delete candidate 
exports.deleteCandidate = async(req,res)=>{
    const data =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"

        })
    };
    try{
        const candidateId = req.params.id;
        const response = await Candidates.findByIdAndDelete(candidateId);
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