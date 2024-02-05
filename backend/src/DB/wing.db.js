const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.insertWing = async (
  db,
  { societyId, wingAdminId, ...restWingData }
) => {
  const WingCollection = db.collection("wings");
  const UserCollection = db.collection("users");

  if (wingAdminId && wingAdminId !== "") {
    const wingAdmin = await UserCollection.findOneAndUpdate(
      { _id: wingAdminId, societyId },
      { $set: { role: ROLES.WING_ADMIN } }
    );

    console.log("wingAdmin", wingAdmin);

    if (!wingAdmin) {
      return null;
    }
  }

  const _id = generateUUID();

  const wing = await WingCollection.insertOne({
    _id,
    societyId,
    wingAdminId,
    ...restWingData
  });

  if (wing) {
    return {
      _id,
      societyId,
      wingAdminId,
      ...restWingData
    };
  }

  return null;
};
