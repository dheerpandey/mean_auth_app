const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register',(req,res,next)=>{
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password :  req.body.password
    });   
    User.addUser(newUser, (err, user)=>{
    if(err)
    {
    res.json({
    success: false,
    message: err 
    });
    }else{
        res.json({
        success: true,
        message: "Added successfully"
    });
    }
});
});

router.post('/authenticate',(req,res,next)=>{
let username = req.body.username;
let password = req.body.password;
User.getUserByUsername(username, (err, user)=>{
if(err) throw err;
if(user)
{
 User.comparePassword(password, user.password, (err, isMatch)=>{
    if(err) throw err;
    if(isMatch)
    {
    const token = jwt.sign(user,config.secret, {
        expiresIn : 60
    });

    res.json({success : true, 
        token: 'JWT '+ token,
        user: {
            id : user._id,   
            name : user.name,
            email : user.email,
            username: user.username
        }});        
    }else{
    res.json({success : false, msg:'Incorrect Password.'});        
    } 
 });
}else{
res.json({success : false, msg:'User does not exist.'});
}
});
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;