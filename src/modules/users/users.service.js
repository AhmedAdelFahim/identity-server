/* eslint-disable require-jsdoc */
const { getConfig } = require("../../config/config");
const { sendEmail } = require("../../utils/email-helper");
const { getVerificationMailHtml } = require("../../utils/email-template");
const { generateJWT } = require("../../utils/jwt-helper");
const { v4: uuidv4 } = require("uuid");

async function sendVerificationMail(email) {
  const verificationToken = generateJWT(
      { email },
      getConfig().JWT_VERIFICATION_KEY,
      { expiresIn: "24h" },
  );
  await sendEmail({
    from: getConfig().EMAIL_USERNAME,
    to: email,
    subject: "Email Verification",
    html: getVerificationMailHtml(verificationToken),
  });
}

function prepareAccessTokenPayload(user) {
  return {
    jti: uuidv4(),
    email: user.email,
    name: user.username,
    userId: user.userId,
  };
}

module.exports = {
  sendVerificationMail,
  prepareAccessTokenPayload,
};
