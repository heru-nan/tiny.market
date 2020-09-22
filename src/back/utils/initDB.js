const connectDB = require("./connectDB");
const data = require("./data.js").get();

// const db = connectDB("")

data.forEach((e) => {
  console.log(e.title);
});

async function initDB() {
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
    let res = await collection.insertMany(data);
    console.log(res);
    return {
      ok: true,

      message: "db filled",
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,

      message: e,
    };
  }
}

module.exports = initDB;
