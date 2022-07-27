const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,

      },
      mobile: {
        type: Number,

      },
      status: {
        type: Boolean,

      },
      password: {
        type: String,

      },
      accountType: {
        type: String,

      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);