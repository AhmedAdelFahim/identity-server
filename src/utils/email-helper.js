const { getConfig } = require("../config/config");
const Logger = require("../middlewares/logger.middleware");
const nodemailer = require("nodemailer");

/* eslint-disable require-jsdoc */
function getEmailConfig() {
  return {
    host: getConfig().EMAIL_HOST,
    port: getConfig().EMAIL_PORT,
    secure: true,
    auth: {
      user: getConfig().EMAIL_USERNAME,
      pass: getConfig().EMAIL_PASSWORD,
    },
  };
}

function getTransporter(emailConfig) {
  return nodemailer.createTransport(emailConfig);
}

async function sendEmail(message) {
  const transporter = getTransporter(getEmailConfig());
  const info = await transporter.sendMail(message);
  Logger.log("debug", `Message sent: ${info.messageId}`);
}

module.exports = {
  sendEmail,
};
