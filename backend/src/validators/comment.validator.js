const joi = require("joi");
const { POST_CONTENT_TYPE, FEED_TYPE } = require("../utils/constants");

// {
//     _id,
//      userId,
//      postId,
//      content,
//      totalLikes,
//      totalReplies,
//      recentReplies
// }

exports.contentValidator = (ctx) => {
  const { content } = ctx.request.body;

  if (!content || content === "") {
    return {
      field: "content",
      message: "Content is required."
    };
  }

  const { error } = joi.string().min(2).max(500).validate(content);

  if (error) {
    return {
      field: "content",
      message: "Content should be between 2 and 500 characters long."
    };
  }
  return null;
};

exports.commentIdValidator = (ctx) => {
  let { commentId } = ctx.params;

  if (ctx.request.method === "POST") {
    commentId = ctx.request.body?.commentId;
  }

  if (ctx.request.method === "GET") {
    commentId = ctx.query?.commentId;
  }

  if (!commentId && ctx.request.method !== "GET") {
    return { field: "commentId", message: "CommentId is required." };
  }

  if (commentId) {
    const { error } = joi.string().uuid().required().validate(commentId);

    if (error) {
      return { field: "commentId", message: "Comment ID must be a valid UUID" };
    }
    ctx.state.commentId = commentId;
  }

  return null;
};
