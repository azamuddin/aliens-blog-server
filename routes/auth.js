const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const models = require('../models');
const bcrypt = require('bcrypt');


/* Registration route */

router.post('/register', function(req, res){

  try{

    let payload = {
      ...req.body, 
      password: bcrypt.hashSync(req.body.password, 10) 
    } 

    const users = models.users.create(payload);
    
    if(users){
      return res.json({
        error: 0, 
        message: "User successfully registered",
        data: users
      });
    }

  } catch(err) {
    return res.json({
      error: 1, 
      message: err.message, 
      data: {}
    })
  }
});


router.post('/login', async function(req, res){

  try{
    let {email, password} = req.body; 

    let user = await models.users.findOne({where: {email}});

    if(!user){
      return res.json({
        error: 1, 
        message: "User or password invalid", 
        data: {}
      })
    }

    const passwordValid = bcrypt.compareSync(password, user.password);

    if(!passwordValid){
      return res.json({
        error: 1, 
        message: "User or password invalid", 
        data: {}
      });
    } 


    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {algorithm: "HS256"});

    user = user.toJSON();
    delete user.password;

    return res.json({
      error:0, 
      message: "Successfully login", 
      data: {
        token, 
        user
      }
    })


  } catch(err) {
    return res.json({
      error: 1, 
      message: err.message,
      data: err
    })
  }

});

module.exports = router;
