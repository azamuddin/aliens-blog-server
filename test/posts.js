const chai = require('chai');
const chaiHttp = require('chai-http'); 
const should = chai.should();

const server = require('../app');


describe("Posts", () => {

  describe("List of posts", () => {
    it("should return list of post");
  });

  describe("Create new post", () => {
    it("should return newly created post");
  });

  describe("List of user posts", () => {
    it("should return user's specific posts")
  });

  describe("Delete post", () => {
    describe("When user is post's author", () => {
      it("should allow delete");
    });

    describe("When user is not post's author", () => {
      it("should deny the delete operation");
    });
  });
});


