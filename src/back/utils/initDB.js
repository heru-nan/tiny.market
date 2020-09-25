const connectDB = require("./connectDB");
const data = require("./data.js").get();
const csvParse = require("csv-parser");
const fs = require("fs");

function initDB() {
  const results = [];

  fs.createReadStream("productos.csv")
    .pipe(csvParse({ separator: ";" }))
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      results.map((e) => {
        e.price = Number(e.price);
        e.stock = e.stock === "True" ? true : false;
      });

      const db = await connectDB("fill db");
      let collection = db.collection("products");
      let arrProducts = await collection.find({}).toArray();
      if (arrProducts.length > 0) {
        return {
          ok: false,
          message: "db is not empty",
        };
      }
      try {
        let res = await collection.insertMany(results);
        return {
          ok: true,
          message: "db filled",
          products: results,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          message: e,
        };
      }
    });
}

module.exports = initDB;
