const express = require('express');
const router  = express.Router();
const admincont  = require('../controllers/admin/adminCont.js');
const adminProjectCont  = require('../controllers/admin/projectCont.js');
const Estimate = require('../controllers/admin/estimateCont.js');
const Leave = require('../controllers/admin/leaveCont.js');
const Holiday = require('../controllers/admin/holidayCont.js');
const Payment = require('../controllers/admin/paymentCont.js');
const Employeesalary = require('../controllers/admin/employeeSalaryCont.js');
const Leader  = require('../controllers/admin/leaderCont.js');
const Job  = require('../controllers/admin/jobCont.js');
const Resume = require('../controllers/admin/resumeCont.js');
const Candidates = require('../controllers/admin/candidateCont.js');
const Contact = require('../controllers/admin/contactCont.js');
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

// all route of employeesalary
// create eamployeesalary
router.post('/createsalary',jwtAuthMiddleware,Employeesalary.createSalary);
// get all salary
router.get('/getallsalary',jwtAuthMiddleware,Employeesalary.getAllSalary);
// get salary
router.get('/getsalary/:id',jwtAuthMiddleware,Employeesalary.getSalary);
// update salary
router.put('/updatesalary/:id',jwtAuthMiddleware,Employeesalary.updateSalary);
// delete salary
router.delete('/deletesalary/:id',jwtAuthMiddleware,Employeesalary.deleteSalary);

// all route of leader
// create leader
router.post('/createleader',jwtAuthMiddleware,Leader.createLearder);
// get all leader
router.get('/getallleader',jwtAuthMiddleware,Leader.getAllLeader);
// get leader
router.get('/getleader/:id',jwtAuthMiddleware,Leader.getLeader);
// update leader
router.put('/updateleader/:id',jwtAuthMiddleware,Leader.updateLeader);
// delete leader 
router.delete('/deleteleader/:id',jwtAuthMiddleware,Leader.deleteLeader);

// all route of job
// create job
router.post('/createjob',jwtAuthMiddleware,Job.createJob);
// get all job
router.get('/getalljob',jwtAuthMiddleware,Job.getAllJob);
// get job
router.get('/getjob/:id',jwtAuthMiddleware,Job.getJob);
// update job
router.put('/updatejob/:id',jwtAuthMiddleware,Job.updateJob);
// delete job
router.delete('/deletejob/:id',jwtAuthMiddleware,Job.deleteJob);

// all route of resume
// create resume
router.post('/createresume',jwtAuthMiddleware,Resume.createResume);
// get all resume
router.get('/getallresume',jwtAuthMiddleware,Resume.getAllResume);
// get resume
router.get('/getresume/:id',jwtAuthMiddleware,Resume.getResume);
// update resume
router.put('/updateresume/:id',jwtAuthMiddleware,Resume.updateResume);
// delete resume
router.delete('/deleteresume/:id',jwtAuthMiddleware,Resume.deleteResume);

// all route of candidate
// create candidate 
router.post('/createcandidate',jwtAuthMiddleware,Candidates.createCandidate);
// get all candidate 
router.get('/getallcandidate',jwtAuthMiddleware,Candidates.getAllCandidate);
// get candidate
router.get('/getcandidate/:id',jwtAuthMiddleware,Candidates.getCandidate);
// update candidate 
router.put('/updatecandidate/:id',jwtAuthMiddleware,Candidates.updateCandidate);
// delete candidate
router.delete('/deletecandidate/:id',jwtAuthMiddleware,Candidates.deleteCandidate);

// all route of contact
// create contact
router.post('/createcontact',jwtAuthMiddleware,Contact.createContact);
// get all contact
router.get('/getallcontact',jwtAuthMiddleware,Contact.getAllContact);
// get contact
router.get('/getcontact/:id',jwtAuthMiddleware,Contact.getContact);
// update contact
router.put('/updatecontact/:id',jwtAuthMiddleware,Contact.updateContact);
// delete contact
router.delete('/deletecontact/:id',jwtAuthMiddleware,Contact.deleteContact);

module.exports = router;