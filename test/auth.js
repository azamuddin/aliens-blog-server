const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http'); 
const should = chai.should();

const server = require('../app');
const models = require('../models');

chai.use(chaiHttp);
chai.should();

const user = {
  name: "Muhammad Azamuddin", 
  password: "12345", 
  email: "azamuddin@domain.com"
}

describe("Auth", () => {


  describe("Register new user", async () => {

    before(async function(){
      await models.users.destroy({truncate: true, where: {} });
    });

    it("should response 200 with error 0", function(done){
      chai
        .request(server)
        .post("/auth/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("error").equals(0);
          done();
        })
    });

  });

  describe("Login", () => {

    it("should return JWT token", function(done){
      chai
        .request(server)
        .post("/auth/login")
        .send({email: user.email, password: user.password})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.nested.property("data.token");
          done();
        })
    });
  })

});


