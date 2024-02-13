const generateUUID = require("../utils/generateUUID");

exports.insertLike = async (db, likeData) => {
  const LikeCollection = db.collection("likes");

  const _id = generateUUID();
  const like = await LikeCollection.insertOne({ _id, ...likeData });

  if (like) {
    return { _id, ...likeData };
  }

  return null;
};

exports.findLike = async (db, searchQuery) => {
  const LikeCollection = db.collection("likes");

  const like = await LikeCollection.findOne(searchQuery);

  return like;
};

exports.findLikes = async (db, searchQuery, skip, limit, sort) => {
  const LikeCollection = db.collection("likes");

  const likes = await LikeCollection.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .toArray();

  return likes;
};

exports.updateLikeData = async (db, searchQuery, updateQuery) => {
  const LikeCollection = db.collection("likes");

  const like = await LikeCollection.findOneAndUpdate(searchQuery, updateQuery, {
    returnDocument: "after"
  });

  return like;
};

exports.deleteLikeData = async (db, searchQuery) => {
  const LikeCollection = db.collection("likes");

  const like = await LikeCollection.findOneAndDelete(searchQuery);

  console.log(like, searchQuery);

  return like;
};

// exports.updateTotalCommentCount = async (db, searchQuery, updateQuery) => {
//   const LikeCollection = db.collection("likes");

//   return LikeCollection.updateOne(searchQuery, updateQuery);
// };
