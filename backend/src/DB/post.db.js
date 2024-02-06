const { POST_TYPE, POST_CONTENT_TYPE } = require("../utils/constants");
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

  const post = await PostCollection.findOne(searchQuery);

  console.log(post);

  return post;
};

exports.findPosts = async (db, searchQuery) => {
  const PostCollection = db.collection("posts");

  const posts = await PostCollection.find(searchQuery).toArray();

  console.log(posts);

  return posts;
};

exports.updatePostData = async (db, searchQuery, dataToUpdate) => {
  const PostCollection = db.collection("posts");

  const post = await PostCollection.findOneAndUpdate(
    searchQuery,
    {
      $set: dataToUpdate
    },
    { returnDocument: "after" }
  );

  return post;
};

exports.deletePostData = async (db, searchQuery) => {
  const PostCollection = db.collection("posts");

  const post = await PostCollection.findOneAndDelete(searchQuery);

  console.log(post);

  return post;
};
