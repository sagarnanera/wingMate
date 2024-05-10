const generateUUID = require("../utils/generateUUID");

exports.insertUser = async (db, userData) => {
  const UserCollection = db.collection("users");

  const _id = generateUUID();
  const user = await UserCollection.insertOne({ _id, ...userData });

  return { _id, ...userData };
};

exports.insertUsers = async (db, userData) => {
  const UserCollection = db.collection("users");

  await UserCollection.insertMany(userData);

  return userData;
};

exports.findUser = async (db, searchQuery) => {
  const UserCollection = db.collection("users");

  const user = await UserCollection.findOne(searchQuery, {
    projection: { password: 0 },
  });

  return user;
};

exports.findUserWithPass = async (db, searchQuery) => {
  const UserCollection = db.collection("users");

  // const user = await UserCollection.findOne(searchQuery);

  const user = await UserCollection.aggregate([
    { $match: searchQuery },
    {
      $lookup: {
        from: "societies",
        localField: "societyId",
        foreignField: "_id",
        as: "society",
      },
    },
    {
      $unwind: {
        path: "$society",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]).toArray();

  return user[0] || {};
};

exports.findUsers = async (db, searchQuery, skip, limit, sort, projection) => {
  const UserCollection = db.collection("users");

  const users = await UserCollection.find(searchQuery, {
    projection: projection || { password: 0 },
  })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .toArray();

  console.log(users);

  return users;
};

exports.updateUserData = async (db, searchQuery, updateQuery) => {
  const UserCollection = db.collection("users");

  const user = await UserCollection.findOneAndUpdate(searchQuery, updateQuery, {
    returnDocument: "after",
    projection: { password: 0 },
  });

  return user;
};

exports.deleteUserData = async (db, searchQuery) => {
  const UserCollection = db.collection("users");

  const user = await UserCollection.findOneAndDelete(searchQuery);

  console.log(user);

  return user;
};

exports.updateTotalPostCount = async (db, searchQuery, updateQuery) => {
  const UserCollection = db.collection("users");

  UserCollection.updateOne(searchQuery, updateQuery);
};
