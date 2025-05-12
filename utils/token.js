const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = "7d"; 

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRES_IN,
    });
};

module.exports = { generateToken };