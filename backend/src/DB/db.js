const { MongoClient } = require("mongodb");

const node_env = process.env.NODE_ENV;

const mongo_uri =
  node_env === "PROD" ? process.env.MONGO_URI_ATLAS : process.env.MONGO_URI;
const dbName = "wingMate_db";

const client = new MongoClient(mongo_uri);
let _db = null;

const connectDB = async () => {
  try {
    if (_db) {
      return _db;
    }

    await client.connect();
    _db = client.db(dbName);
    console.log(
      "connected to db --> ",
      "mongodb://" +
        client.options.hosts[0].toString() +
        "/" +
        client.options.dbName
    );
    return _db;
  } catch (error) {
    _db = null;
    client.close();
    console.log("Error connecting db --> ", error);
    throw error;
  }
};

module.exports = {
  connectDB,
};
