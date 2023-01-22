const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting middleware
// const limiter = rateLimit({
//   // limit to 5 requests in 10 mins
//   windowMs: 10 * 60 * 1000,
//   max: 5,
// });
// app.use(limiter);
app.set("trust proxy", 1);

// Include routes from weather.js
app.use("/api", require("./routes/weather"));

// Enable CORS
app.use(cors());

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
