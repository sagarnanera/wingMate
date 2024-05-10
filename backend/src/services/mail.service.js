const nodemailer = require("nodemailer");
const { MAIL_CONFIG } = require("../utils/constants");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: MAIL_CONFIG.USER,
    pass: MAIL_CONFIG.PASS,
  },
});

const sendMail = async (to, subject, content, html) => {
  try {
    const mailOptions = {
      from: MAIL_CONFIG.USER,
      to: to,
      subject: subject,
      text: html ? "" : content,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { error: null, info };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;
