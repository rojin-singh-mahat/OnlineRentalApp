const express = require('express');
const router = express.Router();
const { registerAdmin, getAdmin } = require("../controller/admin.controller");

router.post("/registerAdmin", registerAdmin);
router.get("/getAdmin", getAdmin);


module.exports = router;