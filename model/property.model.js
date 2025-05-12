const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    category: {
      type: String,
      required: true,
      enum: ["Room", "Apartment", "Commercial Space","Villa"],
    },

    propertyType: {
      type: String,
      required: true,
      enum: ["Residential", "Commercial"],
    },

    address: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    municipality: { type: String, required: true },
    wardNo: { type: String, required: true },
    totalArea: { type: Number, required: true },
    floor: { type: String, required: true },
    dimension: { type: Number, required: true },

    roadType: {
      type: String,
      required: true,
      enum: ["Gravelled", "Paved", "Alley"],
    },

    propertyFace: {
      type: String,
      required: true,
      enum: [
        "East",
        "West",
        "North",
        "South",
        "South-East",
        "South-West",
        "North-East",
        "North-West",
      ],
    },

    bedrooms: { type: Number },
    bathrooms: { type: Number },
    kitchens: { type: Number },
    furnishing: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
    },
    balcony: { type: Number },
    attachedBathroom: { type: String },
    suitable: { type: String },
    floorLoad: { type: Number },
    powerBackup: { type: String, enum: ["Yes", "No"] },
    liftAccess: { type: String, enum: ["Yes", "No"] },
    pantryArea: { type: String, enum: ["Yes", "No"] },
    parkingSpace: { type: String },

    imgUrls: {
      type: [String],
      required: true,
      validate: {
        validator: function (val) {
          return val.length >= 5;
        },
        message: "At least 5 images are required.",
      },
    },

    price: { type: Number, required: true },
    priceInWords: { type: String, required: true },

    negotiable: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending", "Rented"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
