const request = require("supertest");
const app = require("../../app");
const { expect } = require("chai");
const {
  ValidPermission,
  PermissionToBeRemoved,
  getPermission,
} = require("../../test/permissions.mock");

describe("Permission APIs Testing", function() {
  it("Should create a new permission.", function(done) {
    request(app)
        .post("/api/v1/permissions/create")
        .send(ValidPermission)
        .expect(201)
        .end(done);
  });

  it("Should remove permission.", function(done) {
    request(app)
        .delete(`/api/v1/permissions/remove/${PermissionToBeRemoved._id}`)
        .expect(200)
        .expect(function(res) {
          return getPermission(PermissionToBeRemoved._id)
              .then((permission) => {
                expect(permission).equal(null);
              })
              .catch(done);
        })
        .end(done);
  });
});
