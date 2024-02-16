const { Promise } = require("bluebird");
const { insertLike, findLikes, deleteLikeData } = require("../DB/like.db");
const { updatePostData } = require("../DB/post.db");
const { updateCommentData } = require("../DB/comment.db");
const { responseHandler } = require("../handlers/response.handler");

exports.addRemoveLike = async (ctx) => {
  const { commentId, isLiked } = ctx.request.body;
  const { postId } = ctx.state;
  const { _id: userId } = ctx.request.user;

  const likeData = {
    userId,
    createdOn: new Date()
  };

  if (commentId) {
    likeData["commentId"] = commentId;
  } else {
    likeData["postId"] = postId;
  }

  if (!isLiked) {
    const likePromise = insertLike(ctx.db, likeData);

    const promiseArr = [likePromise];

    if (commentId) {
      const commentPromise = updateCommentData(
        ctx.db,
        { _id: commentId },
        { $inc: { totalLikes: 1 } }
      );
      promiseArr.push(commentPromise);
    } else {
      const postPromise = updatePostData(
        ctx.db,
        { _id: postId },
        {
          $inc: { totalLikes: 1 }
        }
      );
      promiseArr.push(postPromise);
    }

    // TODO : check better way to update the counter as if post doesn't get inserted it will still update the count
    const [like, ...rest] = await Promise.all(promiseArr);

    if (!like) {
      responseHandler(
        ctx,
        false,
        "Unable to add like, try again later!!!",
        400,
        null,
        "error while adding like in db."
      );
      return;
    }

    responseHandler(
      ctx,
      true,
      "Liked successfully!!!",
      201,
      { like },
      "like added : "
    );
    return;
  } else {
    delete likeData.createdOn;

    const like = await deleteLikeData(ctx.db, likeData);

    console.log("like deleted", like);

    if (!like) {
      responseHandler(
        ctx,
        false,
        "Like details not found!!!",
        400,
        null,
        "error while deleting like from db."
      );
      return;
    }

    if (commentId) {
      await updateCommentData(
        ctx.db,
        { _id: like?.commentId },
        { $inc: { totalLikes: -1 } }
      );
    } else {
      await updatePostData(
        ctx.db,
        { _id: like?.postId },
        {
          $inc: { totalLikes: -1 }
        }
      );
    }
    responseHandler(
      ctx,
      true,
      "UnLiked successfully!!!",
      200,
      null,
      "like deleted : "
    );
    return;
  }
};

exports.getLikes = async (ctx) => {
  const { postId } = ctx.params;
  const { skip, limit, commentId } = ctx.query;

  const searchQuery = {};

  if (commentId) {
    searchQuery["commentId"] = commentId;
  } else {
    searchQuery["postId"] = postId;
  }

  // to get the most recent like
  const sortFilter = {
    createdOn: -1
  };

  const likes = await findLikes(ctx.db, searchQuery, skip, limit, sortFilter);

  responseHandler(
    ctx,
    true,
    "Like list fetched successfully!!!",
    200,
    { totalFetchedLikes: likes.length, likes },
    "like list fetched : "
  );

  return;
};
