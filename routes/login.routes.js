const express = require("express");
const router = express.Router();
const { logIn } = require("../controller/login.controller");

router.post("/login", logIn);

module.exports = router;