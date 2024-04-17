const Estimate = require('../../models/admin/estimateModel.js');
const Admin = require('../../models/admin/adminModel.js');
const e = require('express');

function errohandler(code , err, res){
     console.log(err.message);
     res.status(code).json({
        status:"fail",
        error:"internal server error "
     })
};

// create estimate
exports.createEstimate = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        let estimateData  =  req.body;
        const newEstimate = new Estimate(estimateData);
        const response = await newEstimate.save(); 

        res.status(201).json({
            status:"success",
            response
        })
    }catch(err){
        errohandler(500,err,res);
    }
};

// get all estimate
exports.getAllEstimate = async(req,res)=>{
     const data  =  await Admin.findById(req.user.id);
     if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not performn this operation"
        })
     };
     try{
        
        const estimateData = await Estimate.find();

        res.status(200).json({
            status:"success",
            result:estimateData.length,
            estimateData
        })
     }catch(err){
        errohandler(500,err,res);
     }
};

// get estimate 
exports.getEstimate = async(req,res)=>{
     const data = await Admin.findById(req.user.id);
     if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you  do not perform this operation"
        })
     };
     try{
        const estimateData = await Estimate.findById(req.params.id);
        if(!estimateData){
            return res.status(404).json({
                status:"fail",
                error:"Estimate not found"
            })
        }
        res.status(200).json({
            status:"success",
            estimateData
        })
     }catch(err){
        errohandler(500,err,res);
     }
};

// update estimate
exports.estimateUpdate = async(req,res)=>{
    const data   =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const estimateId = req.params.id;
        const  estimateData = req.body;
        const response = await Estimate.findByIdAndUpdate(estimateId,estimateData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"estimate not found"
            }); 
        };
        res.status(200).json({
            status:"success",
            response
        })
    }catch(err){
        errohandler(500,err,res);
    }
};

// delete  estimate
exports.deleteEStimate = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const estimateId = req.params.id;
        const response = await Estimate.findByIdAndDelete(estimateId);
        if(!response){
            res.status(404).json({
                status:"fail",
                error:"estimate  not found"
            })
        };
        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errohandler(500,err,res);
    }
}