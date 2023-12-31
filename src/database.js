const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const data = require("./data");

let database = null;

async function startDatabase() {
  const mongo = await MongoMemoryServer.create();
  const mongoDBURL = mongo.getUri();

  const connection = await MongoClient.connect(mongoDBURL, {
    useNewUrlParser: true,
  });

  //Seed Database
  if (!database) {
    database = connection.db();
    await database.collection("users").insertMany(data.Users);
  }

  return database;
}

module.exports = startDatabase;
