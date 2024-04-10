const express = require('express');
const router  = express.Router();
const admincont  = require('../controllers/adminCont.js');
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

router.post('/login',admincont.adminLogin);
router.post('/createEMP',upload.single('image'),jwtAuthMiddleware,admincont.createEMP);
router.get('getallemp',jwtAuthMiddleware,admincont.getAllEMP);
router.get('/getemp/:id',jwtAuthMiddleware,admincont.getEMP);

module.exports = router;