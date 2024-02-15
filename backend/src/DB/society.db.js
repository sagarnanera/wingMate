const generateUUID = require("../utils/generateUUID");

exports.insertSociety = async (db, societyData) => {
  const SocietyCollection = db.collection("societies");
  const _id = generateUUID();
  const society = await SocietyCollection.insertOne({ _id, ...societyData });

  if (society) {
    return { _id, ...societyData };
  }

  return null;
};

exports.findSociety = async (db, searchQuery) => {
  const SocietyCollection = db.collection("societies");

  const society = await SocietyCollection.findOne(searchQuery);

  // console.log(society);

  return society;
};

exports.updateSocietyData = async (db, searchQuery, dataToUpdate) => {
  const SocietyCollection = db.collection("societies");

  const society = await SocietyCollection.findOneAndUpdate(
    searchQuery,
    {
      $set: dataToUpdate
    },
    { returnDocument: "after" }
  );

  return society;
};

exports.deleteSocietyData = async (db, searchQuery) => {
  const SocietyCollection = db.collection("societies");

  const society = await SocietyCollection.findOneAndDelete(searchQuery);

  console.log(society);

  return society;
};

exports.updateSocietyAnalytics = async (db, searchQuery, updateQuery) => {
  const SocietyCollection = db.collection("societies");

  SocietyCollection.updateOne(searchQuery, updateQuery);
};
