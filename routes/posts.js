var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');

const models = require('../models');

require('dotenv').config()

router.post('/',
  jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}),
  async function(req, res) {

    try{

      let payload = {
        ...req.body, 
        user_id: req.user.id
      }

      let newPost = await models.posts.create(payload);

      return res.json({
        error: 0, 
        message: "Post created", 
        data: newPost
      });

    } catch(err) {

      if(err.name == "SequelizeValidationError"){
        let details = err.errors.reduce((acc, item) => {
          return {...acc, [item.path]: item.message} 
        }, {});

        return res.json({
          error: 1, 
          message: "ValidationError", 
          data: details
        })
      }

      return res.json({
        error: 1, 
        message: err.message
      })
    }

  }
);

router.get('/', async function(req, res){

  try{

   let posts = await models.posts.findAll({});

    return res.json({
      error: 0, 
      data: posts
    })

  } catch(err) {

    return res.json({
      error: 1, 
      message: err.message, 
    });
  }

});


router.get('/my-posts',
  jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}),
  async function(req, res){

    try{
      let userPosts = await models.posts.findAll({where: {user_id: req.user.id}})

      return res.json({
        error: 0, 
        data: userPosts
      })
    } catch(err) {

      return res.json({
        error: 1, 
        message: err.message
      })
    }
  }
);

module.exports = router;
