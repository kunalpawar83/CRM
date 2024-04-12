const express = require('express');
const empLeave = require('../controllers/employee/empleaveCon.js');
const Task = require('../controllers/employee/taskcont.js');
const {jwtAuthMiddleware} = require('../utils/jwt.js');


const router =  express.Router();

// employee login
router.post('/login',empLeave.emplogin);

//  all route of employee leave 
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

// all route of employee task
// create task 
router.post('/createtask',jwtAuthMiddleware,Task.createTask);
// getall task
router.get('/getalltask',jwtAuthMiddleware,Task.getAllTask);
// get task 
router.get('/gettask/:id',jwtAuthMiddleware,Task.getTask);
// update task 
router.put('/updatetask/:id',jwtAuthMiddleware,Task.taskUpdate);
// delete task
router.delete('/deletetask/:id',jwtAuthMiddleware,Task.deleteTask);
module.exports = router;