const express = require('express');
const router  = express.Router();
const admincont  = require('../controllers/admin/adminCont.js');
const adminProjectCont  = require('../controllers/admin/projectCont.js');
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

module.exports = router;