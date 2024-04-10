const express =  require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require('../utils/jwt.js');
const superAdmincont  = require('../controllers/superAdmincont.js');

// superAdmin signup
router.post('/signup',superAdmincont.superAdminsignup);
// superAdmin login
router.post('/login',superAdmincont.superAdminlogin);
// create admin 
router.post('/createAdmin',jwtAuthMiddleware,superAdmincont.createAdmin);
//  get all admin
router.get('/getadmin',jwtAuthMiddleware,superAdmincont.getAllAdmin);
// get single data of admin
router.get('/getprofile/:id',jwtAuthMiddleware,superAdmincont.getAdmin);
// admin  update route
router.put('/updateadmin/:id',jwtAuthMiddleware,superAdmincont.adminUpdate);
// delete admin data 
router.delete('/deleteadmin/:id',jwtAuthMiddleware,superAdmincont.deleteAdmin);

module.exports = router;