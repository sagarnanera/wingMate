const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.insertUser = async (db, userData) => {
  const UserCollection = db.collection("users");

  const _id = generateUUID();
  const user = await UserCollection.insertOne({ _id, ...userData });

  if (user) {
    return { _id };
  }

  return null;
};

exports.getUser = async (db, searchQuery) => {
  const UserCollection = db.collection("users");

  const user = await UserCollection.findOne(searchQuery);

  console.log(user);

  return user;
};

exports.getUsers = async (db, searchQuery) => {
  const UserCollection = db.collection("users");

  const users = await UserCollection.find(searchQuery).toArray();

  console.log(users);

  return users;
};

exports.updateUser = async (db, searchQuery, dataToUpdate) => {
  const UserCollection = db.collection("users");

  const user = await UserCollection.findOneAndUpdate(
    searchQuery,
    {
      $set: dataToUpdate
    },
    { returnDocument: "after" }
  );

  return user;
};

exports.deleteUser = async (db, searchQuery) => {
  const UserCollection = db.collection("users");

  const user = await UserCollection.findOneAndDelete(searchQuery);

  console.log(user);

  return user;
};
