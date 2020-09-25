const express = require("express");
const router = express.Router();
const connectDB = require("../utils/connectDB");
const cloudinary = require("cloudinary").v2;

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

router.get("/image/:id", async (req, res) => {
  let { id } = req.params;
  let cloudRes = await cloudinary.image(`images/${id}`);
  res.send(cloudRes);
});

router.get("/init", async (req, res) => {
  let obj = await require("../utils/initDB.js")();
  res.json(obj);
});
router.get("/about", (req, res) => {
  res.send("It s a route to send the products of market");
});

module.exports = router;
