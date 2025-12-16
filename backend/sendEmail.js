const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.My_Email,
      pass: process.env.My_Password,
    },
    tls: {
      rejectUnauthorized: false, // OK for local dev
    },
  });

  await transporter.sendMail({
    from: process.env.My_Email,
    to: email,
    subject: subject,
    text: message,
  });
};

module.exports = sendEmail;
