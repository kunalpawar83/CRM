const express = require('express');
const router  = express.Router();
const admincont  = require('../controllers/admin/adminCont.js');
const adminProjectCont  = require('../controllers/admin/projectCont.js');
const Estimate = require('../controllers/admin/estimateCont.js');
const Leave = require('../controllers/admin/leaveCont.js');
const Holiday = require('../controllers/admin/holidayCont.js');
const Payment = require('../controllers/admin/paymentCont.js');
const {jwtAuthMiddleware} = require('../utils/jwt.js');

const multer = require('multer');

const multerStorage = multer.diskStorage({
   destination:(req,file,cb)=>{
       cb(null,'imgUser');
   },
   filename:(req,file,cb)=>{
      const ext = file.mimetype.split('/')[1];
      cb(null,`user-${Date.now()}.${ext}`);
   }
});

const multerFilter = (req,file,cb)=>{
   if(file.mimetype.startsWith('image')){
      cb(null,true);
   }else{
      cb('Not a image ! please upload image',false);
   }
}

const upload =  multer({
   storage:multerStorage,
   fileFilter:multerFilter   
});

// admin login
router.post('/login',admincont.adminLogin);

// all route of employee
// create employee 
router.post('/createemp',upload.single('image'),jwtAuthMiddleware,admincont.createEMP);
// get all employee
router.get('/getallemp',jwtAuthMiddleware,admincont.getAllEMP);
// get employee
router.get('/getemp/:id',jwtAuthMiddleware,admincont.getEMP);
// update employee
router.put('/updateemp/:id',jwtAuthMiddleware,admincont.empUpdate);
// delete employee
router.delete('/deleteemp/:id',jwtAuthMiddleware,admincont.deleteEmp);

// all route of client

// create client 
router.post('/createClient',jwtAuthMiddleware,admincont.createClient);
// get all client
router.get('/getallclient',jwtAuthMiddleware,admincont.getAllClient);
// get client
router.get('/getclient/:id',jwtAuthMiddleware,admincont.getClient);
// update client
router.put('/updateclient/:id',jwtAuthMiddleware,admincont.clientUpdate);
// delete client
router.delete('/deleteclient/:id',jwtAuthMiddleware,admincont.deleteCLient);

// all route of admin project
// create admin project
router.post('/createproject',jwtAuthMiddleware,adminProjectCont.createProject);
// get all admin project
router.get('/getallproject',jwtAuthMiddleware,adminProjectCont.getAllProject);
// get project
router.get('/getproject/:id',jwtAuthMiddleware,adminProjectCont.getProject);
// update project
router.put('/updateproject/:id',jwtAuthMiddleware,adminProjectCont.updateProject);
// delete projecct 
router.delete('/deleteproject/:id',jwtAuthMiddleware,adminProjectCont.deleteProject);

// all route estimate 
// create estimate
router.post('/createestimate',jwtAuthMiddleware,Estimate.createEstimate);
// get all estimate
router.get('/getallestimate',jwtAuthMiddleware,Estimate.getAllEstimate);
// get estimate
router.get('/getestimate/:id',jwtAuthMiddleware,Estimate.getEstimate);
// update estimate
router.put('/updateestimate/:id',jwtAuthMiddleware,Estimate.estimateUpdate);
// delete estimate
router.delete('/deleteestimate/:id',jwtAuthMiddleware,Estimate.deleteEStimate);

// all route of leave
// get all leave
router.get('/getallleave',jwtAuthMiddleware,Leave.getALlLeave);
// get leave
router.get('/getleave/:id',jwtAuthMiddleware,Leave.getLeave);
// update leave
router.put('/updateleave/:id',jwtAuthMiddleware,Leave.updateLeave);
// delete leave
router.delete('/deleteleave/:id',jwtAuthMiddleware,Leave.deleteLeave);

// all route oh holiday
// create holiday
router.post('/createholiday',jwtAuthMiddleware,Holiday.createHoliday)
// get all holiday
router.get('/getallholiday',jwtAuthMiddleware,Holiday.getAllHoliday);
// get holiday
router.get('/getholiday/:id',jwtAuthMiddleware,Holiday.getHoliday);
// update holiday
router.put('/updateholiday/:id',jwtAuthMiddleware,Holiday.updateHoliday);
// delete holiday
router.delete('/deleteholiday/:id',jwtAuthMiddleware,Holiday.deleteHoliday);

// all route of payment
// create payment
router.post('/createpayment',jwtAuthMiddleware,Payment.createPayment);
// get all payment
router.get('/getallpayment',jwtAuthMiddleware,Payment.getAllPaument);
// get payment
router.get('/getpayment/:id',jwtAuthMiddleware,Payment.getPayment);
// update payment
router.put('/updatepayment/:id',jwtAuthMiddleware,Payment.updatePayment);
// delete payment
router.delete('/deletepayment/:id',jwtAuthMiddleware,Payment.deletePayment);
module.exports = router;