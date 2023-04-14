const nodemailer = require("nodemailer");
const { MAIL_USER, MAIL_PASSWORD, EMAIL_ON } = require("../../helpers/env.js");
const params = require("../params.json");
const emailModel = require("../../models/emailModel.js");

// transporter
const transporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });
};

// email send function
const send = async (to, subject, body) => {
  const transport = transporter();
  if (transport) {
    const email = {
      to: to.email,
      from: `"${params.project.name}"`,
      subject,
      html: body,
    };

    // inorder to avoid email send in production level
    if (String(EMAIL_ON) === "1") {
      transport.sendMail(email, async (err, info) => {
        if (err) {
          console.info("Error ", err);
          throw new Error(params.message.error.emailNotSent);
        } else {
          console.info("Info Email Sent");
        }
      });
    }
    else {
      console.info(params.message.info.emailOn);
    }

    // saving mail into database
    await emailModel.create({
      fromEmail: params.project.email,
      toEmail: to.email,
      toName: to.name,
      subject,
      body,
    });
  } else {
    throw new Error(params.message.error.common);
  }
};


module.exports = send;
