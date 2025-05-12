 KamanaRamtel_FinalCode
const propertyModel = require("../model/property.model");
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require("datauri/parser");
const path = require("path");
const multer = require("multer");
const userModel = require("../model/user.model");

const parser = new DatauriParser();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImages = async (files) => {
  const uploads = files.map(async (file) => {
    const ext = path.extname(file.originalname).toString();
    const file64 = parser.format(ext, file.buffer);
    const result = await cloudinary.uploader.upload(file64.content, {
      folder: "rentEase/Properties",
    });
    return result.secure_url;
  });

  return Promise.all(uploads);
};

const createProperty = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    console.log("Form data received:", formData);

    // Convert price to number
    formData.price = Number(formData.price);

    // Normalize optional numeric fields
    const numericFields = [
      "bedrooms",
      "bathrooms",
      "balcony",
      "dimension",
      "totalArea",
      "floorLoad",
    ];

    numericFields.forEach((field) => {
      if (formData[field]) {
        formData[field] = Number(formData[field]) || 0;
      }
    });

    // Validate image count
    if (!files || files.length < 5) {
      return res.status(400).json({
        message: "At least 5 images are required",
      });
    }

    const imgUrls = await uploadImages(files);

    const newProperty = new propertyModel({
      ...formData,
      imgUrls,
    });

    await newProperty.save();

    const user = await userModel.findById(req.params.id);

    if (!user.roles.includes("landlord")) {
      user.roles.push("landlord");
      user.currentRole = "landlord";
      await user.save();
    }

    res.status(201).json({
      success: true,
      property: newProperty,
      user: {
        roles: user.roles,
        currentRole: user.currentRole,
        fullname: user.fullname,
        email: user.email,
        id: user._id,
        profileImage: user.profileImage,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create property",
    });
  }
};


const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

module.exports = { upload, createProperty, getAllProperties };

const propertyModel = require("../model/property.model");
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require("datauri/parser");
const path = require("path");
const multer = require("multer");
const userModel = require("../model/user.model");

const parser = new DatauriParser();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImages = async (files) => {
  const uploads = files.map(async (file) => {
    const ext = path.extname(file.originalname).toString();
    const file64 = parser.format(ext, file.buffer);
    const result = await cloudinary.uploader.upload(file64.content, {
      folder: "rentEase/Properties",
    });
    return result.secure_url;
  });

  return Promise.all(uploads);
};

const createProperty = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    console.log("Form data received:", formData);

    // Convert price to number
    formData.price = Number(formData.price);

    // Normalize optional numeric fields
    const numericFields = [
      "bedrooms",
      "bathrooms",
      "balcony",
      "dimension",
      "totalArea",
      "floorLoad",
    ];

    numericFields.forEach((field) => {
      if (formData[field]) {
        formData[field] = Number(formData[field]) || 0;
      }
    });

    // Validate image count
    if (!files || files.length < 5) {
      return res.status(400).json({
        message: "At least 5 images are required",
      });
    }

    const imgUrls = await uploadImages(files);

    const newProperty = new propertyModel({
      ...formData,
      imgUrls,
    });

    await newProperty.save();

    const user = await userModel.findById(req.params.id);

    if (!user.roles.includes("landlord")) {
      user.roles.push("landlord");
      user.currentRole = "landlord";
      await user.save();
    }

    res.status(201).json({
      success: true,
      property: newProperty,
      user: {
        roles: user.roles,
        currentRole: user.currentRole,
        fullname: user.fullname,
        email: user.email,
        id: user._id,
        profileImage: user.profileImage,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create property",
    });
  }
};


const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

module.exports = { upload, createProperty, getAllProperties };
 main
