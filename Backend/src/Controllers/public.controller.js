const Mail = require("../Models/Mail.Model");

const mailSender = require("../Utils/mailSender");

exports.sendMail = async (req, res) => {
  try {
    const { email, firstname, lastname, message } = req.body;

    if (!email || !firstname || !lastname || !message) {
      return res.status(401).json({
        message: "ALl fields are required",
        success: false,
      });
    }

    await mailSender(
      email,
      "you have an email from " + email,
      "message: " + message
    );

    await Mail.create({ from: email, name: firstname + lastname, message });

    return res.status(200).json({
      message: "mail sent",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internel server error",
      success: false,
    });
  }
};
