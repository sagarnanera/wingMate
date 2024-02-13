const joi = require("joi");

// {
//     _id,
//      userId,
//      postId / commentId
// }

exports.likeIdValidator = (ctx) => {
  let { likeId } = ctx.params;

  if (!likeId) {
    return { field: "likeId", message: "LikeId is required." };
  }

  const { error } = joi.string().uuid().required().validate(likeId);

  if (error) {
    return { field: "likeId", message: "Like ID must be a valid UUID" };
  }
  ctx.state.likeId = likeId;

  return null;
};
