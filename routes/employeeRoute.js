const express = require('express');
const empLeave = require('../controllers/empleaveCon.js');
const {jwtAuthMiddleware} = require('../utils/jwt.js');
const e = require('express');

const router =  express.Router();

// employee login
router.post('/login',empLeave.emplogin);
// create  leave
router.post('/createLeave',jwtAuthMiddleware,empLeave.createLeave);
// get all leave
router.get('/getallleave',jwtAuthMiddleware,empLeave.getAllLeave);
// get leave 
router.get('/getleave/:id',jwtAuthMiddleware,empLeave.getLeave);
// update leave 
router.put('/updateleave/:id',empLeave.leaveUpdate);
// delete leave 
router.delete('/deleteleave/:id',jwtAuthMiddleware,empLeave.deleteleave);



module.exports = router;