const request = require("supertest");
const app = require("../../app");
const {
  ValidPermission,
  InsertedPermission,
} = require("../../test/permissions.mock");
const { VerifiedUserToken } = require("../../test/users.mock");

describe("Access APIs Testing", function() {
  it("Should not access resource.", function(done) {
    request(app)
        .post("/api/v1/access/check")
        .set({ authorization: `Bearer ${VerifiedUserToken}` })
        .send({
          action: ValidPermission.action,
          resource: ValidPermission.resource,
        })
        .expect(401)
        .end(done);
  });

  it("Should access resource.", function(done) {
    request(app)
        .post("/api/v1/access/check")
        .set({ authorization: `Bearer ${VerifiedUserToken}` })
        .send({
          action: InsertedPermission.action,
          resource: InsertedPermission.resource,
        })
        .expect(401)
        .end(done);
  });
});
