const jwt = require("jsonwebtoken");

/* eslint-disable require-jsdoc */
function generateJWT(payload, secret, options = {}) {
  return jwt.sign(payload, secret, options);
}

function verifyJWT(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        const error = new Error("Unauthorized");
        error.code = 401;
        reject(error);
      }
      resolve(payload);
    });
  });
}

module.exports = {
  generateJWT,
  verifyJWT,
};
