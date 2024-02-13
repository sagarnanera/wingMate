const { Promise } = require("bluebird");
const {
  insertComment,
  findComments,
  updateCommentData,
  deleteCommentData,
  deleteComments
} = require("../DB/comment.db");
const { updatePostData } = require("../DB/post.db");

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
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "Unable to add comment, try again later!!!"
    };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Comment added successfully!!!",
    comment
  };
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

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "comments fetched successfully!!!",
    totalComments: comments.length,
    comments
  };

  return;
};

exports.updateComment = async (ctx) => {
  const { content } = ctx.request.body;
  const { _id } = ctx.request.user;
  const { commentId } = ctx.params;

  // console.log("commentData before update:", commentData);

  const comment = await updateCommentData(
    ctx.db,
    { _id: commentId, userId: _id },
    { $set: { content } }
  );

  console.log("comment after update:", comment);

  if (!comment) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Comment not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Comment details updated successfully!!!",
    comment
  };
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
    ctx.status = 404;
    ctx.body = { success: false, message: "Comment not found." };
    return;
  }

  const deletedComments = await deleteComments(ctx.db, {
    $or: [{ _id }, { commentId: comment._id }]
  });

  console.log("deletedComments", deletedComments);
  const { deletedCount } = deletedComments;
  console.log("deletedComments", deletedCount, -deletedCount);

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

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Comment details deleted successfully."
  };
  return;
};
