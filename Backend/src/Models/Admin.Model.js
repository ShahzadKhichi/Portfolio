const mongoose = requrie("mongoose");

const AdminSchema = new mongoose.newSchema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
      lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
