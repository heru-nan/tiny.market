const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const app = express();

const productsRoute = require("./routes/products");

app.use("/", express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "/index.html"));
});

app.get("/shopcart", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "/indexCart.html"));
});

app.use("/products", productsRoute);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../build", "/404.html"));
// });

app.listen(3000, () => console.log("App serve on PORT:3000"));
