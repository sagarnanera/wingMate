const { MongoClient } = require("mongodb");

const mongo_uri =
  process.env.MONGO_URI ||
  "mongodb+srv://FirstTestUser:miRujJ2iiKGVPdZs@firstcluster.vyfrhcb.mongodb.net/?retryWrites=true&w=majority";
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
  }
};

module.exports = {
  connectDB
};
