const mongoose = require("mongoose");

const adminModel = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    roles: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

adminModel.statics.adminExists = async function () {
  const adminCount = await this.countDocuments({ role: "admin" });
  if (adminCount >= 1) {
    return res.status(400).json({
      success: false,
      message: "Only one admin account is allowed",
    });
  }
};

module.exports = mongoose.model("Admin", adminModel);
