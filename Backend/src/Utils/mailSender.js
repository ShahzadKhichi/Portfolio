const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: email,
      to: `${"shahzadkhichi996@gmail.com"}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return info;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailSender;
