const chai = require('chai');
const chaiHttp = require('chai-http'); 
const should = chai.should();
const bcrypt = require('bcrypt');

const server = require('../app');
const models = require('../models');

chai.use(chaiHttp); 
chai.should();

const user = {
  name: "Muhammad Azamuddin", 
  password: "12345", 
  email: "azamuddin@domain.com"
}

const newPost = {
  title: "My post", 
  content: "Here's my content of the post"
}

describe("Posts", () => {

  let token;
  let userId;

  before(async function(){
    await models.users.destroy({where: {}, truncate: true})
    await models.users.create({...user, password: bcrypt.hashSync(user.password, 10)});

     let res = await chai
      .request(server)
      .post('/auth/login')
      .send({email: user.email, password: user.password})

    token = res.body.data.token;
    userId = res.body.data.user.id;

  })

  describe("Create new post", () => {

    it("should return newly created post", function(done){
      chai
        .request(server)
        .post("/posts")
        .set('Authorization', `Bearer ${token}`)
        .send(newPost)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("error").equals(0);
          done();
        })
    });
  });

  describe("List of posts", () => {

    it("should return list of post", function(done){
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {

          res.should.have.status(200); 
          res.body.data.should.be.an('array');
          done();

        });
    });
  });


  describe("List of user posts", () => {

    before(async function(){

      let posts = [
        {
          title: "My post", 
          content: "My post content", 
          user_id: userId
        },
        {
          title: "Other peoples post", 
          content: "post content", 
          user_id: userId + 2
        },
      ];

      await models.posts.destroy({where:{}, truncate: true})
      await models.posts.bulkCreate(posts);
    })

    it("should return user's specific posts", function(done){

      chai
        .request(server)
        .get("/posts/my-posts")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {

          res.should.have.status(200); 
          res.body.data.should.be.an('array');
          res.body.data.filter(post => post.id !== userId).should.have.length(0);
          done();

        });

    })
  });

});


