const express = require("express");
const router = express.Router();
const connectDB = require("../utils/connectDB");

// connectDB();

router.get("/", async (req, res) => {
  const products = await connectDB();
  res.json({
    data: products,
    message: "products get response",
  });
});

router.get("/about", (req, res) => {
  res.send("It s a route to send the products of market");
});

module.exports = router;
