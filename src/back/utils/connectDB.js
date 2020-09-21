const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Instance is connected successfully to mongodb");
    const db = client.db("tiny-market");
    const collection = db.collection("products");

    const cursor = await collection.find({});
    let products = await cursor.toArray();
    if (products) console.log("return json products successfully");
    return products;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = run;
