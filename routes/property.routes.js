const express = require("express");
const router = express.Router();

const {
  upload,
  createProperty,
  getAllProperties,
} = require("../controller/property.controller");

const {
  deleteProperty,
} = require("../controller/property.remove.controller");

const { protect } = require("../middleware/auth.middleware");

// Create property (only landlords)
router.post("/postProperty/:id", protect, upload.array("images", 10), createProperty);

// Get all properties (public route)
router.get("/getAllProperty", getAllProperties);

// Delete property (only the landlord who created it)
router.delete("/deleteProperty/:id", protect, deleteProperty);

module.exports = router;
