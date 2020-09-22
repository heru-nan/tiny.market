const { MongoClient } = require("mongodb");

let db = null;

const client = new MongoClient(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
});
async function run(optional = "not specificado") {
  if (db) {
    console.log("connect to DB");
    return db;
  }
  let client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db("tiny-market");
  console.log(`Instance(${optional}) is connected successfully to mongodb`);
  return db;
}

module.exports = run;
