const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const { errorHandler } = require("./middlewares/errorMiddleware.js");
const colors = require("colors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/", require("./routes/medRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
