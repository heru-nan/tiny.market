const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const cloudinary = require("cloudinary").v2;

const app = express();

const productsRoute = require("./routes/products");

app.use("/", express.static("build"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "/index.html"));
});

app.get("/shopcart", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "/indexCart.html"));
});

app.get("/images", (req, res) => {
  cloudinary.api.resources(function (error, result) {
    let l = result.resources;
    console.log("l", l);
    let _html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IMAGES</title>
    </head>
    <body>
        ${l.map((e) => `<div><img src="${e.url}"></div>`)}
    </body>
    </html> 
    `;
    res.send(_html);
  });
});

app.use("/products", productsRoute);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../build", "/404.html"));
// });

app.listen(3000, () => console.log("App serve on PORT:3000"));
