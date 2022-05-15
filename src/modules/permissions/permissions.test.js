const request = require("supertest");
const app = require("../../app");
const { ValidPermission } = require("../../test/permissions.mock");

describe("Permission APIs Testing", function() {
  it("Should create a new permission.", function(done) {
    request(app)
        .post("/api/v1/permissions/create")
        .send(ValidPermission)
        .expect(201)
        .end(done);
  });
});
