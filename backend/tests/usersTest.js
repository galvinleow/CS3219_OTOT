const { expect, assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /getAllUsers", () => {
    it("Should get status code 200 - Checked if any property missing", (done) => {
      chai
        .request(app)
        .get("/users/getAllUsers")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Array");
          if (res.body.length > 0) {
            expect(res.body[0]).to.contain.property("_id");
            expect(res.body[0]).to.contain.property("name");
            expect(res.body[0]).to.contain.property("password");
            expect(res.body[0]).to.contain.property("username");
            expect(res.body[0]).to.contain.property("isAdmin");
          }
        });
    });
    done();
  });
});

describe("POST /addUser", () => {
  it("Should get status code 200 - Checked if any property missing after posting", (done) => {
    chai
      .request(app)
      .post("/users/addUser")
      .send({
        password: "Add User Test",
        name: "Add User Test",
        username: "Add User Test",
        isAdmin: true,
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.contain.property("_id");
        expect(res.body).to.contain.property("name");
        expect(res.body).to.contain.property("password");
        expect(res.body).to.contain.property("username");
        expect(res.body).to.contain.property("isAdmin");

        expect(res.body.password).equals("Add User Test");
        expect(res.body.name).equals("Add User Test");
        expect(res.body.username).equals("Add User Test");
        expect(res.body.isAdmin).equals(true);
      });
    done();
  });
});

describe("PUT /updateSingleUser", () => {
  it("Should get status code 200 - Checked value of user before-after", (done) => {
    chai
      .request(app)
      .get("/users/getAllUsers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        const toUpdate = res.body[res.body.length - 1];
        toUpdate.name = "Updated Value Test";

        chai
          .request(app)
          .put("/users/updateSingleUser/" + toUpdate._id)
          .send(toUpdate)
          .end((err, res) => {
            res.should.have.status(200);
            chai
              .request(app)
              .get("/users/getAllUsers")
              .end((err, res) => {
                const toCheck = res.body[res.body.length - 1];
                assert(toCheck.name === "Updated Value Test");
              });
          });
      });
    done();
  });
});

describe("DELETE /deleteSingleUser", () => {
  it("Should get status code 200 - Checked if any amount of user before-after", (done) => {
    chai
      .request(app)
      .get("/users/getAllUsers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        if (res.body.length > 0) {
          expect(res.body[0]).to.contain.property("_id");
          expect(res.body[0]).to.contain.property("name");
          expect(res.body[0]).to.contain.property("password");
          expect(res.body[0]).to.contain.property("username");
          expect(res.body[0]).to.contain.property("isAdmin");
        }
        const beforeAmount = res.body.length;
        const toDelete = res.body[beforeAmount - 1]._id;
        chai
          .request(app)
          .delete("/users/deleteSingleUser/" + toDelete)
          .end((err, res) => {
            res.should.have.status(200);
            chai
              .request(app)
              .get("/users/getAllUsers")
              .end((err, res) => {
                assert(res.body.length === beforeAmount - 1);
              });
          });
      });
    done();
  });
});
