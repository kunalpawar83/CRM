const Admin  = require('../../models/admin/adminModel.js');
const Leave = require('../../models/employee/leavesModel.js');

function  errorhandler(code ,err, res){
     console.log(err),
     res.status(code).json({
        status:"fail",
        error:" internal server error "
     })
};

// get all leave
exports.getALlLeave = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const leaveData = await Leave.find();

        res.status(200).json({
            status:"success",
            result:leaveData.length,
            leaveData
        })
    }catch(err){
       errorhandler(500,err,res);
    }
};

// get leave
exports.getLeave = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"yo do not perform this operation"
        })
    };
    try{
        const leaveData = await Leave.findById(req.params.id);
        if(!leaveData){
            res.status(404).json({
                status:"fail",
                error:"leave not found"
            })
        };
        res.status(200).json({
            status:"success",
            leaveData
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// update leave
exports.updateLeave = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const leaveId = req.params.id;
        const  leaveData = req.body;
        const response = await Leave.findByIdAndUpdate(leaveId,leaveData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"leave not found"
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

//delete leave
exports.deleteLeave = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this opeartion"
        })
    };
    try{
        const leaveId = req.params.id;
        const response = await Leave.findByIdAndDelete(leaveId);
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"leave not found"
            })
        };

        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}