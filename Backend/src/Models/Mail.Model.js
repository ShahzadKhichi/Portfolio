const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
