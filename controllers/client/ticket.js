const Client  = require('../../models/client/clientModel.js');
const Ticket  = require('../../models/client/ticketModel.js');

// create client ticket
exports.createTicket= async(req,res)=>{
    const data = await Client.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
   try{
      let data = req.body;
      const newProject= new Ticket(data);
      const response = await newProject.save();
    
      //sendEmail(newAdmin.email,'Welcome to our website', 'Thank you for registering with us!');
        res.status(201).json({
          status:"success",
          response
        });
     
   }catch(err){errorhandle(500,err,res)}
};

// get all ticket
exports.getAllTicket =async (req,res)=>{
    const data = await Client.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    
    try{
       const ticketData = await Ticket.find();
       
       res.status(200).json({
         status:"success",
         result:ticketData.length,
         data:{
           ticketData
         }
       })
    }catch(err){errorhandle(500,err,res)}
};

// get single data of ticket
exports.getTicket=async(req,res)=>{
    const data = await Client.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    try{
       const ticketData = await Ticket.findById(req.params.id);
       if(!ticketData){
           return res.status(404).json({
             status:"fail",
             error:" project not found"
          })
       }
  
       res.status(200).json({
          status:"success",
          ticketData
       })
    }catch(err){errorhandle(500,err,res)}   
  };

  
// ticket update route
exports.ticketUpdate = async(req,res)=>{
    try{
       const ticketId= req.params.id;
       const ticketData = req.body;
       
       const response = await Ticket.findByIdAndUpdate(ticketId,ticketData,{
         new:true,
         runValidators:true
       })
       if(!response){
        return res.status(404).json({
            status:"fail",
            error:"ticket not found"
        })
       }
  
       console.log('data updated');
       res.status(200).json({
        status:"success",
        data:response
    })
    }catch(err){errorhandle(500,err,res)}
  };

// delete ticket data 
exports.deleteTicket =async(req,res)=>{
    const data = await Client.findById(req.user.id);
    if(!data){
        return res.status(400).json({
           status:"fail",
           error:"you do not perform this operation"
        })
    }
    try{
       const ticketId  = req.params.id;
       
       const response = await Ticket.findByIdAndDelete(ticketId)
       if(!response){
        return res.status(404).json({
            status:"fail",
            error:" project not found"
        })
       }
       res.status(200).json({
        status:"success",
    })
    }catch(err){errorhandle(500,err,res) }
  };
    

