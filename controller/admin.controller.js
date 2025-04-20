const adminModel = require("../model/admin.model");
require("dotenv").config();
const bcrypt = require("bcrypt");

const registerAdmin = async (req, res) => {
  try {
    const fullname = process.env.ADMIN_FULLNAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        sucess: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await adminModel.create({
      fullname,
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    res.status(200).json({
      sucess: true,
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findOne({ role: "admin" });
    if (!admin) {
      return res.status(404).json({
        sucess: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      sucess: true,
      message: admin,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  getAdmin,
};
