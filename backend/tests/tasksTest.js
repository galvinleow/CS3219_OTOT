// Import libraries
const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
var mongoose = require("mongoose");

// Import server
var server = require("../server");

// Import Todo Model
var Todo = require("../models/Task");

chai.use(chaiHttp);

describe("Tasks API", function () {
  it("Should 401 Error for GetAllTask - Not Authorized", function (done) {
    chai
      .request(server)
      .get("/tasks/getAllTasks")
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });

  // it("Should 403 Error for GetAllTask - Not Authenticated", function (done) {
  //   // Login First
  //   chai
  //     .request(server)
  //     .post("/users/auth/signin")
  //     .send({
  //       username: "clue",
  //       password: "clue",
  //     })
  //     .end((err, res) => {
  //       res.body.should.have.property("token");
  //       var token = res.body.token;

  //       chai
  //         .request(server)
  //         .get("/tasks/getAllTasks")
  //         .set("Authorization", "Bearer " + token)
  //         .end(function (err, res) {
  //           res.should.have.status(403);
  //           done();
  //         });
  //     });
  // });
});
