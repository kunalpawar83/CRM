const { json } = require('body-parser');
const Admin = require('../../models/admin/adminModel.js');
const Holiday = require('../../models/admin/holidayModel.js');

function errorhandler(code ,err,res){
    console.log(err);
    return res.status(400).json({
        status:"fail",
        error:"internal server error"
    })
};

// create holiday
exports.createHoliday = async(req,res)=>{
    const data =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do  not  perform this operation"
        })
    };
    try{
        let holidayData  =  req.body;
        const newHoliday = new Holiday(holidayData);
        const response = await newHoliday.save(); 
        
        res.status(201).json({
            status:"success",
            response
        })

    }catch(err){
          errorhandler(500,err,res);
    }
};

// get all holiday
exports.getAllHoliday= async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this  operation"
        })
    };
    try{
         const holidaydata = await Holiday.find();
         res.status(200).json({
            status:"success",
            result:holidaydata.length,
            holidaydata
         })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// get holiday
exports.getHoliday = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const holidayData = await Holiday.findById(req.params.id);
        if(!holidayData){
             return res.status(404).json({
                status:"fail",
                error:"holiday not found"
             })
        };

        res.status(200).json({
            status:"success",
            holidayData
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// update holiday
exports.updateHoliday = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const holidayId = req.params.id;
        const holidayData = req.body;
        const response = await Holiday.findByIdAndUpdate(holidayId,holidayData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"holiday not found"
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

// delete route 
exports.deleteHoliday = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this opeartion"
        })
    };
    try{
        const holidayId = req.params.id;
        const response = await Holiday.findByIdAndDelete(holidayId);
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"holiday not found"
            })
        };

        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}