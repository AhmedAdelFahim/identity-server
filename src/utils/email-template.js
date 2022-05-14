/* eslint-disable require-jsdoc */
const { getConfig } = require("../config/config");

function getVerificationMailHtml(token) {
  return `Please user this link to verify your account <a href="${
    getConfig().SERVER_HOST
  }${
    getConfig().EMAIL_VERIFICATION_URL
  }${token}">Verify</a> Please note this link will expire after 24 hours`;
}

module.exports = {
  getVerificationMailHtml,
};
