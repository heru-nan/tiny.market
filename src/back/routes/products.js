const express = require("express");
const router = express.Router();
const connectDB = require("../utils/connectDB");

router.get("/", async (req, res) => {
  const db = await connectDB("products");
  const collection = db.collection("products");
  let products = await collection.find({}).toArray();

  res.json({
    ok: true,
    message: "get products from db",
    data: { items: products },
  });
});

router.get("/init", async (req, res) => {
  let obj = await require("../utils/initDB.js")();
  res.json(obj);
});
router.get("/about", (req, res) => {
  res.send("It s a route to send the products of market");
});

module.exports = router;
