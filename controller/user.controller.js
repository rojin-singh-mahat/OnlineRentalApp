const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

const createUser = async (req, res) => {
  const { fullname, phoneNumber, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullname,
      phoneNumber,
      email,
      password: hashedPassword,
      profileImage: `https://avatar.iran.liara.run/username?username=${fullname}`,
    });

    const token = generateToken({
      id: newUser._id,
      email: newUser.email,
      role: newUser.roles,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        phoneNumber: newUser.phoneNumber,
        profileImage: newUser.profileImage,
        email: newUser.email,
        role: newUser.roles,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password)
      updates.password = await bcrypt.hash(updates.password, 10);

    const user = await userModel
      .findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const switchRole = async (req, res) => {
  try {
    const { email, newRole } = req.body;

    if (!["tenant", "landlord"].includes(newRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'tenant' or 'landlord'.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.roles.includes(newRole)) {
      user.roles.push(newRole);
    }

    user.currentRole = newRole;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Role switched to ${newRole}`,
      user,
    });
  } catch (error) {
    console.error("Error switching user:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeFromFavorites = async (req, res) => {
  const { userId, propertyId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== propertyId
    );
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Property removed from favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error removing property from favorites:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  switchRole,
  removeFromFavorites,
};
