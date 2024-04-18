const Admin = require('../../models/admin/adminModel.js');
const Employeesalary = require('../../models/admin/employeesalaryModel.js');

function  errorhandler(code ,err,res){
    console.log(err);
    res.status(code).json({
        status:"fail",
        error:"internal server error"
    })
};

//create salary
exports.createSalary= async(req,res)=>{
    const data =  await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do  not  perform this operation"
        })
    };
    try{
        let salaryData  =  req.body;
        const newSalary = new Employeesalary(salaryData);
        const response = await newSalary.save(); 
        
        res.status(201).json({
            status:"success",
            response
        })

    }catch(err){
          errorhandler(500,err,res);
    }
};

// get all salary
exports.getAllSalary= async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this  operation"
        })
    };
    try{
         const salaryData= await Employeesalary.find();
         res.status(200).json({
            status:"success",
            result:salaryData.length,
            salaryData
         })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// get salary
exports.getSalary = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const salaryData = await Employeesalary.findById(req.params.id);
        if(!salaryData){
             return res.status(404).json({
                status:"fail",
                error:"salary not found"
             })
        };

        res.status(200).json({
            status:"success",
            salaryData
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// update salary
exports.updateSalary = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const salaryId= req.params.id;
        const salaryData = req.body;
        const response = await Employeesalary.findByIdAndUpdate(salaryId,salaryData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"salary not found"
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

// delete salary
exports.deleteSalary = async(req,res)=>{
    const data  = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this opeartion"
        })
    };
    try{
        const salaryId= req.params.id;
        const response = await Employeesalary.findByIdAndDelete(salaryId);
        if(!response){
            return res.status(404).json({
                status:"fail",
                error:" salary not found"
            })
        };

        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}
