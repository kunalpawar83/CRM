const express = require('express');
const clientproject = require('../controllers/client/client.js');
const Ticket = require('../controllers/client/ticket.js');
const {jwtAuthMiddleware} = require('../utils/jwt.js');
const router = express.Router();

// cleint login 
router.post('/login',clientproject.clientlogin);

//all route of client project
// create client project
router.post('/createproject',jwtAuthMiddleware,clientproject.createProject);
// get all project
router.get('/getallproject',jwtAuthMiddleware,clientproject.getAllProject);
// get project
router.get('/getproject/:id',jwtAuthMiddleware,clientproject.getProject);
// update project
router.put('/updateproject/:id',clientproject.projectUpdate)
// delete project 
router.delete('/deleteproject/:id',jwtAuthMiddleware,clientproject.deleteProject);

// all route of client ticket
// create ticket
router.post('/createticket',jwtAuthMiddleware,Ticket.createTicket);
// get all  ticket
router.get('/getallticket',jwtAuthMiddleware,Ticket.getAllTicket);
// get ticket 
router.get('/getticket/:id',jwtAuthMiddleware,Ticket.getTicket);
// update ticket
router.put('/updateticket/:id',Ticket.ticketUpdate);
// delete ticket
router.delete('/deleteticket/:id',jwtAuthMiddleware,Ticket.deleteTicket);

module.exports = router ;

