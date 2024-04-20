const generateUUID = require("../utils/generateUUID");

exports.insertComment = async (db, commentData) => {
  const CommentCollection = db.collection("comments");

  const _id = generateUUID();
  const comment = await CommentCollection.insertOne({ _id, ...commentData });

  // return { _id, ...commentData };
  if (comment) {
    return { _id, ...commentData };
  }

  return null;
};

exports.findComment = async (db, searchQuery) => {
  const CommentCollection = db.collection("comments");

  const comment = await CommentCollection.findOne(searchQuery);

  console.log(comment);

  return comment;
};

exports.findComments = async (db, searchQuery, skip, limit, sort) => {
  const CommentCollection = db.collection("comments");

  // const comments = await CommentCollection.find(searchQuery)
  //   .skip(skip)
  //   .limit(limit)
  //   .sort(sort)
  //   .toArray();

  const comments = await CommentCollection.aggregate([
    { $match: searchQuery },
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
  ]).toArray();

  console.log(comments);

  return comments;
};

exports.updateCommentData = async (db, searchQuery, updateQuery) => {
  const CommentCollection = db.collection("comments");

  const comment = await CommentCollection.findOneAndUpdate(
    searchQuery,
    updateQuery,
    { returnDocument: "after" }
  );

  return comment;
};

exports.deleteCommentData = async (db, searchQuery) => {
  const CommentCollection = db.collection("comments");

  const comment = await CommentCollection.findOneAndDelete(searchQuery);

  console.log(comment);

  return comment;
};

exports.deleteComments = async (db, searchQuery) => {
  const CommentCollection = db.collection("comments");

  const comment = await CommentCollection.deleteMany(searchQuery);

  console.log(comment);

  return comment;
};
