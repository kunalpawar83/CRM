const Admin = require('../../models/admin/adminModel.js');
const Payment = require('../../models/admin/paymentModel.js');

function  errorhandler(code ,err,res){
    console.log(err);
    res.status(code).json({
        status:"fail",
        error:"internal server error"
    })
};

//create payment
exports.createPayment = async(req,res)=>{
    const data =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do  not  perform this operation"
        })
    };
    try{
        let paymentData  =  req.body;
        const newPayment = new Payment(paymentData);
        const response = await newPayment.save(); 
        
        res.status(201).json({
            status:"success",
            response
        })

    }catch(err){
          errorhandler(500,err,res);
    }
};

// get all payment
exports.getAllPaument= async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this  operation"
        })
    };
    try{
         const paymentData= await Payment.find();
         res.status(200).json({
            status:"success",
            result:paymentData.length,
            paymentData
         })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// get payment
exports.getPayment = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const paymentData = await Payment.findById(req.params.id);
        if(!paymentData){
             return res.status(404).json({
                status:"fail",
                error:"holiday not found"
             })
        };

        res.status(200).json({
            status:"success",
            paymentData
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// update Payment
exports.updatePayment = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const paymentId= req.params.id;
        const paymentData = req.body;
        const response = await Payment.findByIdAndUpdate(paymentId,paymentData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"payment not found"
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

// delete payment 
exports.deletePayment = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this opeartion"
        })
    };
    try{
        const paymentId= req.params.id;
        const response = await Payment.findByIdAndDelete(paymentId);
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"Payment not found"
            })
        };

        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}
