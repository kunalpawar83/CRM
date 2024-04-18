const Admin = require('../../models/admin/adminModel.js');
const Leader = require('../../models/admin/leaderModel.js');

function errorhandler(code, err,res){
    console.log(err),
    res.status(code).json({
        status:"fail",
        error:"internal server error"
    })
};

//create  leader
exports.createLearder= async(req,res)=>{
    const data =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do  not  perform this operation"
        })
    };
    try{
        let leaderData  =  req.body;
        const newLeader = new Leader(leaderData);
        const response = await newLeader.save(); 
        
        res.status(201).json({
            status:"success",
            response
        })

    }catch(err){
          errorhandler(500,err,res);
    }
};

// get all leader
exports.getAllLeader= async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this  operation"
        })
    };
    try{
         const leaderData= await Leader.find();
         res.status(200).json({
            status:"success",
            result:leaderData.length,
            leaderData
         })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// get leader
exports.getLeader = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const leaderData = await Leader.findById(req.params.id);
        if(!leaderData){
             return res.status(404).json({
                status:"fail",
                error:"salary not found"
             })
        };

        res.status(200).json({
            status:"success",
            leaderData
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// update leader
exports.updateLeader  = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const leaderId= req.params.id;
        const leaderData = req.body;
        const response = await Leader.findByIdAndUpdate(leaderId,leaderData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"leader not found"
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

// delete leader
exports.deleteLeader = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this opeartion"
        })
    };
    try{
        const leaderId= req.params.id;
        const response = await Leader.findByIdAndDelete(leaderId);
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:" leader not found"
            })
        };

        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}