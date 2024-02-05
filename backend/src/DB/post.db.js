const { POST_TYPE } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.insertPost = async (
  db,
  { title, text, mediaURLs, visibility, postType, userId, wingId }
) => {
  const PostCollection = db.collection("posts");

  const postData = {};

  if (postType !== POST_TYPE.TEXT && mediaURLs && mediaURLs.length > 0) {
    postData["media"] = mediaURLs;
  } else {
    postData["text"] = text;
  }

  if (visibility === AUDIENCE_TYPE.WING) {
    postData["visibility"] = AUDIENCE_TYPE.WING;
    postData["wingId"] = wingId;
  }

  const _id = generateUUID();
  const post = await PostCollection.insertOne({
    _id,
    userId,
    title,
    visibility,
    postType,
    ...postData
  });

  if (post) {
    return { _id, userId, title, visibility, postType, ...postData };
  }

  return null;
};
