const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.insertWing = async (db, wingData) => {
  const WingCollection = db.collection("wings");
  const UserCollection = db.collection("users");

  const { wingId, wingAdminId, ...restWingData } = wingData;

  // if (wingAdminId && wingAdminId !== "") {
  //   const wingAdmin = await UserCollection.findOneAndUpdate(
  //     { _id: wingAdminId, wingId },
  //     { $set: { role: ROLES.WING_ADMIN } }
  //   );

  //   if (!wingAdmin) {
  //     return null;
  //   }
  // }

  const _id = generateUUID();

  const wing = await WingCollection.insertOne({
    _id,
    wingAdminId,
    ...restWingData
  });

  if (wing) {
    return {
      _id,
      wingId,
      wingAdminId,
      ...restWingData
    };
  }

  return null;
};

exports.findWing = async (db, searchQuery) => {
  const WingCollection = db.collection("wings");

  const wing = await WingCollection.findOne(searchQuery);

  return wing;
};

exports.findWings = async (db, searchQuery, skip, limit, sort) => {
  const WingCollection = db.collection("wings");

  const wings = await WingCollection.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .toArray();

  return wings;
};

exports.updateWingData = async (db, searchQuery, dataToUpdate) => {
  const WingCollection = db.collection("wings");

  const wing = await WingCollection.findOneAndUpdate(
    searchQuery,
    {
      $set: dataToUpdate
    },
    { returnDocument: "after" }
  );

  return wing;
};

exports.deleteWingData = async (db, searchQuery) => {
  const WingCollection = db.collection("wings");

  const wing = await WingCollection.findOneAndDelete(searchQuery);

  console.log(wing);

  return wing;
};
