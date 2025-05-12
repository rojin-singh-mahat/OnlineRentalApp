 KamanaRamtel_FinalCode
// favorites.controller.js
const User = require("../model/user.model");
const Property = require("../model/property.model");

// Adding a property to the user's favorites
const addToFavorites = async (req, res) => {
  const { propertyId } = req.body; // Get the property ID from the request body

  try {
    const user = await User.findById(req.user._id); // Get the current user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if property is already in favorites
    if (user.favorites.includes(propertyId)) {
      return res.status(400).json({ message: "Property already in favorites" });
    }

    // Adding property ID to favorites
    user.favorites.push(propertyId);
    await user.save(); // Save the user

    res.status(200).json({ message: "Property added to favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Error adding to favorites", error: err.message });
  }
};

// Removing a property from the user's favorites
const removeFromFavorites = async (req, res) => {
  const { propertyId } = req.params; // Get the property ID from the URL

  try {
    const user = await User.findById(req.user._id); // Get the current user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove property ID from favorites
    user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
    await user.save();

    res.status(200).json({ message: "Property removed from favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Error removing from favorites", error: err.message });
  }
};

// Get all favorites for the current user (populate the property details)
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("favorites") // Populate the favorites with property details
      .select("favorites");

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Error fetching favorites", error: err.message });
  }
};

module.exports = { addToFavorites, removeFromFavorites, getFavorites };

// favorites.controller.js
const User = require("../model/user.model");
const Property = require("../model/property.model");

// Add a property to the user's favorites
const addToFavorites = async (req, res) => {
  const { propertyId } = req.body; // Get the property ID from the request body

  try {
    const user = await User.findById(req.user._id); // Get the current user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if property is already in favorites
    if (user.favorites.includes(propertyId)) {
      return res.status(400).json({ message: "Property already in favorites" });
    }

    // Add property ID to favorites
    user.favorites.push(propertyId);
    await user.save(); // Save the user

    res.status(200).json({ message: "Property added to favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Error adding to favorites", error: err.message });
  }
};

// Remove a property from the user's favorites
const removeFromFavorites = async (req, res) => {
  const { propertyId } = req.params; // Get the property ID from the URL

  try {
    const user = await User.findById(req.user._id); // Get the current user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove property ID from favorites
    user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
    await user.save();

    res.status(200).json({ message: "Property removed from favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Error removing from favorites", error: err.message });
  }
};

// Get all favorites for the current user (populate the property details)
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("favorites") // Populate the favorites with property details
      .select("favorites");

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Error fetching favorites", error: err.message });
  }
};

module.exports = { addToFavorites, removeFromFavorites, getFavorites };
 main
