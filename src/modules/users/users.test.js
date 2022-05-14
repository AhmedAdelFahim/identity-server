const request = require( "supertest");
const app = require( "../../app");
const { expect } = require( "chai");
const {
  ValidUser,
  VerifiedUser,
  NotVerifiedUser,
} = require("../../test/users.mock");

describe("User APIs Testing", function() {
  it("Should create a new user.", function(done) {
    request(app)
        .post("/api/v1/users/create")
        .send(ValidUser)
        .timeout(5000)
        .expect(201)
        .end(done);
  });

  it("Should not create with existing user.", function(done) {
    request(app)
        .post("/api/v1/users/create")
        .send({
          email: VerifiedUser.email,
          password: "123456",
          passwordConfirmation: "123456",
        })
        .timeout(5000)
        .expect(400)
        .end(done);
  });

  it("Should login to account.", function(done) {
    request(app)
        .post("/api/v1/users/login")
        .send({ email: VerifiedUser.email, password: VerifiedUser.password })
        .expect(200)
        .expect(function(res) {
          expect(res.body.data).to.not.equal({
            email: VerifiedUser.email,
            password: VerifiedUser.password,
            isVerified: true,
          });
        })
        .end(done);
  });

  it("Should not login to unverified account.", function(done) {
    request(app)
        .post("/api/v1/users/login")
        .send({
          email: NotVerifiedUser.email,
          password: NotVerifiedUser.password,
        })
        .expect(400)
        .end(done);
  });
});
