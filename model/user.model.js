// user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },

    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is required"],
    },

    profileImage: {
      type: String,
      default: "",
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
      type: [String],
      enum: ["tenant", "landlord"],
      default: ["tenant"],
    },

    currentRole: {
      type: String,
      enum: ["tenant", "landlord"],
      default: "tenant",
    },

    // Favorite properties (store property IDs)
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",  // Reference to Property model for ID
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
