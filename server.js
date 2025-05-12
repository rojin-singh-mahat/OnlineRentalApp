 KamanaRamtel_FinalCode
const express = require("express");
const connectDB = require("./database/conn");
const app = express();
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
    
  }
};

startServer();

require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

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
  const { name, email, phone, subject, message, ownerEmail} = req.body;

  const mailOptions = {
    from: email,
    to: ownerEmail, //replace this with broker email
    subject: `Contact Form Message: ${subject}`,
    html: `
      <h3>New Inquiry from ${name}</h3>
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
 main
