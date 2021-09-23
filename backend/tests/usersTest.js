const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /users/getAllUsers", () => {
    it("Should get 200 error", (done) => {
      chai
        .request(app)
        .get("/users/getAllUsers")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });
});
