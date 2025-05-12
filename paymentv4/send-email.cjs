require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Nodemailer transporter (Step 1)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// POST route to receive form data and send email
app.post("/send-email", (req, res) => {
  const { name, email, phone, message, ownerEmail} = req.body;
  console.log(ownerEmail);
  const mailOptions = {
    from: email,
    to: ownerEmail, //replace this with broker email
    subject: `Your Property has been Rented`,
    html: `
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.error("Email error:", err);
      res.status(500).json({ message: "Failed to send email" });
    } else {
      console.log("Email sent!");
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});