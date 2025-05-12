 KamanaRamtel_FinalCode
// favorites.routes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware"); // Protect the routes to ensure the user is authenticated
const { addToFavorites, removeFromFavorites, getFavorites } = require("../controller/favorites.controller");

// Add a property to favorites
router.post("/add", protect, addToFavorites);

// Remove a property from favorites
router.delete("/remove/:propertyId", protect, removeFromFavorites);

// Get all favorites for the user (populate the property details)
router.get("/get", protect, getFavorites);

module.exports = router;

// favorites.routes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware"); // Protect the routes to ensure the user is authenticated
const { addToFavorites, removeFromFavorites, getFavorites } = require("../controller/favorites.controller");

// Add a property to favorites
router.post("/add", protect, addToFavorites);

// Remove a property from favorites
router.delete("/remove/:propertyId", protect, removeFromFavorites);

// Get all favorites for the user (populate the property details)
router.get("/get", protect, getFavorites);

module.exports = router;
 main
