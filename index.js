require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/dbcon");
const cors = require("cors");
const mainRoutes = require("./routes/index.routes");

const corsOption = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: "GET, POST, PUT, DELETE",
};

app.use(cors(corsOption));
app.use(express.json());
app.use("/", mainRoutes);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}/`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();