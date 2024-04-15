const express = require('express');
const clientproject = require('../controllers/client/client.js');
const {jwtAuthMiddleware} = require('../utils/jwt.js');
const router = express.Router();

// cleint login 
router.post('/login',clientproject.clientlogin);
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

module.exports = router ;

