const Admin = require('../../models/admin/adminModel.js');
const Contact = require('../../models/admin/contactModel.js');

function errorhandler(code,err,res){
    console.log(err),
    res.status(code).json({
        status:"fail",
        error:"internal server error"
    })
};

// create contact
exports.createContact = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const contactdata = req.body;
        const newContact = Contact(contactdata);
        const response = await newContact.save();

        res.status(201).json({
            status:"success",
            response
        })
    }catch(err){
        errorhandler(500,err,res);
    }
}

// get all contact 
exports.getAllContact = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const contactdata = await Contact.find();

        res.status(200).json({
            status:"success",
            result:contactdata.length,
            contactdata
        })

    }catch(err){
        errorhandler(500,err,res);
    }
};

// get contact
exports.getContact = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const contactdata = await Contact.findById(req.params.id);
        if(!contactdata){
            return res.status(404).json({
                status:"fail",
                error:"contact not found"
            })
        };

        res.status(200).json({
            status:"success",
            contactdata
        })
    }catch(err){
        errorhandler(500,err,res);
    }
};

// update contact
exports.updateContact = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const contactId = req.params.id;
        const contactdata = req.body;
        const response = await Contact.findByIdAndUpdate(contactId,contactdata,{
            new:true,
            runValidators:true
        });

        if(!response){
            return res.status(404).json({
                status:"fail",
                error:"contact not found"
            })
        };

        res.status(200).json({
            status:"success",
            response
        })

    }catch(err){
        errorhandler(500,err,res);
    }
}

// delete contact
exports.deleteContact = async(req,res)=>{
    const data = await Admin.findById(req.user.id);
    if(!data){
        return  res.status(400).json({
            status:"fail",
            error:"you do not perform this operation"
        })
    };
    try{
        const contactId = req.params.id;

        const contactdata = await Contact.findByIdAndDelete(contactId);
        if(!contactdata){
            return res.status(404).json({
                status:"fail",
                error:"contact not found"
            })
        };
        res.status(200).json({
            status:"success"
        })
    }catch(err){
        errorhandler(500,err,res)
    }
}