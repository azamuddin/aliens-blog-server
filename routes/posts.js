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

    let { skip = 0, limit = 10 } = req.query;

    let posts =
      await models
      .posts
      .findAll(
        {
          where: {},
          include:[{model: models.users}], 
          offset: parseInt(skip), 
          limit: parseInt(limit)
        }
      );

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

router.get('/:id', async function(req, res){

  try{
    let id = req.params.id; 

    let post = await models.posts.findOne({where: {id}, include: [{model: models.users}]})

    if(!post){
      return res.json({
        error: 1, 
        message: "Post not found",
      }); 
    };


    return res.json({
      error: 0, 
      data: post
    });

  } catch(err) {

    return res.json({
      error: 1, 
      message: err.message, 
      data: err
    })
  }

});


router.get('/my-posts',
  jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}),
  async function(req, res){

    try{
      let { skip = 0, limit = 10 } = req.query;

      let userPosts =
        await models
        .posts
        .findAll(
          {
            where: {user_id: req.user.id}, 
            offset: parseInt(skip), 
            limit: parseInt(limit)
          }
        )

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
