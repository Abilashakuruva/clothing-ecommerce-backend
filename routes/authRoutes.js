const authController=require('../controllers/authController');

const express=require('express');

const router=express.Router();

router.post('/register',authController.userRegister);
router.post('/login',authController.userLogin);

router.get('/all-users',authController.getAllUsers);

module.exports=router;