const { Promise } = require("bluebird");
const {
  insertComment,
  findComments,
  updateCommentData,
  deleteCommentData,
  deleteComments
} = require("../DB/comment.db");
const { updatePostData } = require("../DB/post.db");
const { responseHandler } = require("../handlers/response.handler");

exports.addComment = async (ctx) => {
  const { content, commentId } = ctx.request.body;
  const { postId } = ctx.state;

  const { _id: userId } = ctx.request.user;

  const commentData = {
    userId,
    content,
    totalLikes: 0,
    totalReplies: 0,
    createdOn: new Date()
  };

  if (commentId) {
    commentData["commentId"] = commentId;
  } else {
    commentData["postId"] = postId;
  }

  // try {
  //   // throw new Error();
  //   await insertComment(ctx.db, commentData);
  // } catch (error) {
  //   ctx.throw(503, "unable to add comment. try again later.");
  // }

  const commentPromise = insertComment(ctx.db, commentData);

  const postPromise = updatePostData(
    ctx.db,
    { _id: postId },
    {
      $inc: { totalComments: 1 }
    }
  );

  const promiseArr = [commentPromise, postPromise];

  if (commentId) {
    const parentCommentPromise = updateCommentData(
      ctx.db,
      { _id: commentId },
      { $inc: { totalReplies: 1 } }
    );
    promiseArr.push(parentCommentPromise);
  }
  // TODO : check better way to update the counter as if post doesn't get inserted it will still update the count
  const [comment, ...rest] = await Promise.all(promiseArr);

  console.log("comment on comment :", comment, rest);

  if (!comment) {
    responseHandler(
      ctx,
      false,
      "Unable to add comment, try again later!!!",
      400,
      null,
      "error in db while adding comment."
    );
    return;
  }

  responseHandler(
    ctx,
    true,
    "Comment added successfully!!!",
    201,
    {
      comment
    },
    "comment added :"
  );
  return;
};

exports.getComments = async (ctx) => {
  const { postId } = ctx.params;
  const { skip, limit, commentId } = ctx.query;

  const searchQuery = {};

  if (commentId) {
    searchQuery["commentId"] = commentId;
  } else {
    searchQuery["postId"] = postId;
  }

  // to get the most recent comment
  const sortFilter = {
    createdOn: -1
  };

  const comments = await findComments(
    ctx.db,
    searchQuery,
    skip,
    limit,
    sortFilter
  );

  responseHandler(
    ctx,
    true,
    "comments fetched successfully!!!",
    200,
    {
      totalComments: comments.length,
      comments
    },
    "comments fetched :"
  );

  return;
};

exports.updateComment = async (ctx) => {
  const { content } = ctx.request.body;
  const { _id } = ctx.request.user;
  const { commentId } = ctx.params;

  const comment = await updateCommentData(
    ctx.db,
    { _id: commentId, userId: _id },
    { $set: { content } }
  );

  console.log("comment after update:", comment);

  if (!comment) {
    responseHandler(
      ctx,
      false,
      "Comment not found.",
      404,
      null,
      "comment not found."
    );
    return;
  }

  responseHandler(
    ctx,
    true,
    "Comment details updated successfully!!!",
    200,
    {
      comment
    },
    "comments updated :"
  );

  return;
};

exports.deleteComment = async (ctx) => {
  const { _id: userId } = ctx.request.user;
  const { commentId: _id } = ctx.params;

  const comment = await deleteCommentData(ctx.db, {
    _id,
    userId
  });

  if (!comment) {
    responseHandler(
      ctx,
      false,
      "Comment not found.",
      404,
      null,
      "comment not found."
    );

    return;
  }

  const deletedComments = await deleteComments(ctx.db, {
    $or: [{ _id }, { commentId: comment._id }]
  });

  const { deletedCount } = deletedComments;

  await Promise.all([
    updateCommentData(
      ctx.db,
      { _id: comment?.commentId },
      { $inc: { totalReplies: -deletedCount } }
    ),
    updatePostData(
      ctx.db,
      { _id: comment?.postId },
      {
        $inc: { totalComments: -(deletedCount + 1) }
      }
    )
  ]);

  responseHandler(
    ctx,
    true,
    "Comment details deleted successfully.",
    200,
    null,
    "comments deleted :"
  );

  return;
};
