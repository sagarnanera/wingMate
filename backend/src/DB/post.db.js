const generateUUID = require("../utils/generateUUID");

exports.insertPost = async (db, postData) => {
  const PostCollection = db.collection("posts");

  // const postData = {};

  // if (postType !== POST_TYPE.TEXT && mediaURLs && mediaURLs.length > 0) {
  //   postData["media"] = mediaURLs;
  // } else {
  //   postData["text"] = text;
  // }

  // if (visibility === AUDIENCE_TYPE.WING) {
  //   postData["visibility"] = AUDIENCE_TYPE.WING;
  //   postData["wingId"] = wingId;
  // }

  // const _id = generateUUID();
  // const post = await PostCollection.insertOne({
  //   _id,
  //   userId,
  //   title,
  //   visibility,
  //   postType,
  //   ...postData
  // });

  // if (post) {
  //   return { _id, userId, title, visibility, postType, ...postData };
  // }

  // const postData = {
  //   userId,
  //   wingId,
  //   societyId,
  //   title,
  //   postType: POST_TYPE.NORMAL_POST,
  //   contentType
  // };

  // if (postType === POST_TYPE.POST_POST) {
  //   postData["postType"] = POST_TYPE.POST_POST;
  // }

  // if (
  //   contentType !== POST_CONTENT_TYPE.TEXT &&
  //   mediaURLs &&
  //   mediaURLs.length > 0
  // ) {
  //   postData["media"] = mediaURLs;
  // } else {
  //   postData["text"] = text;
  // }

  const _id = generateUUID();
  const post = await PostCollection.insertOne({ _id, ...postData });

  if (post) {
    return { _id, ...postData };
  }

  return null;
};

exports.findPost = async (db, searchQuery) => {
  const PostCollection = db.collection("posts");

  // const post = await PostCollection.findOne(searchQuery);

  // which approach is better finding user details in second query
  // or doing aggregation

  const post = await PostCollection.aggregate([
    { $match: searchQuery },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        // localField: "userId",
        // foreignField: "_id",
        pipeline: [
          { $match: { $expr: { $eq: ["$$userId", "$_id"] } } },
          { $project: { _id: 0, name: 1, role: 1 } }
        ],
        as: "user"
      } // will return array
    },
    { $unwind: "$user" }
  ]).toArray();

  console.log(post);

  return post[0];
};

exports.findPosts = async (db, searchQuery, skip, limit, sort) => {
  const PostCollection = db.collection("posts");

  // const posts = await PostCollection.find(searchQuery)
  //   .skip(skip)
  //   .limit(limit)
  //   .sort(sort)
  //   .toArray();

  // console.log(searchQuery, posts);

  const posts = await PostCollection.aggregate([
    { $match: searchQuery },
    { $skip: skip },
    { $limit: limit },
    { $sort: sort },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        // localField: "userId",
        // foreignField: "_id",
        pipeline: [
          { $match: { $expr: { $eq: ["$$userId", "$_id"] } } },
          { $project: { _id: 0, name: 1, role: 1 } },
        ],
        as: "user",
      }, // will return array
    },
    { $unwind: "$user" },
    // to check whether the post is liked by the user
    {
      $lookup: {
        from: "likes",
        let: { postId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$postId", "$postId"] } } },
          { $project: { _id: 0, userId: 1 } },
        ],
        as: "likes",
      },
    },
    {
      $addFields: {
        isLiked: {
          $in: ["$user._id", "$likes.userId"],
        },
      },
    },
  ]).toArray();

  return posts;
};

exports.updatePostData = async (db, searchQuery, updateQuery) => {
  const PostCollection = db.collection("posts");

  const post = await PostCollection.findOneAndUpdate(searchQuery, updateQuery, {
    returnDocument: "after"
  });

  return post;
};

exports.deletePostData = async (db, searchQuery) => {
  const PostCollection = db.collection("posts");

  const post = await PostCollection.findOneAndDelete(searchQuery);

  // console.log(post);

  return post;
};

exports.updateTotalCommentCount = async (db, searchQuery, updateQuery) => {
  const PostCollection = db.collection("posts");

  return PostCollection.updateOne(searchQuery, updateQuery);
};
