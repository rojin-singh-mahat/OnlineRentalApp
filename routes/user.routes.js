const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  switchRole,
} = require("../controller/user.controller");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/registerUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", protect, getUserById);
router.put("/updateUser/:id", protect, updateUser);
router.delete("/deleteUser/:id", protect, deleteUser);
router.post("/switch-role", switchRole);

module.exports = router;
