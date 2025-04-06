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