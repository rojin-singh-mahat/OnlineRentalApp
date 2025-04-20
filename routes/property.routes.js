const express = require("express");
const {
  upload,
  createProperty,
  getAllProperties,
} = require("../controller/property.controller");
// const { protect } = require("../middleware/auth.middleware")
const router = express.Router();

router.post("/postProperty/:id", upload.array("images", 10), createProperty);
router.get("/getAllProperty", getAllProperties);

module.exports = router;