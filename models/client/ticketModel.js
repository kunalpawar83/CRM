const mongooose  = require('mongoose');

const ticketSc =  new mongooose.Schema({
    createdBy:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    status:{
        type:String,
        emun:['Open','Closed'],
        required:true
    },
    assignTo:{
        type:String,
        required:true
    },
    dateTo:{
        type:Date,
        default:Date.now()
    },
    detail:{
        type:String
    }
});

const Ticket = new mongooose.model('Ticket',ticketSc);
module.exports = Ticket;