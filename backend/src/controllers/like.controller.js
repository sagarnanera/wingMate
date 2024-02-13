const { Promise } = require("bluebird");
const {
  insertLike,
  findLikes,
  updateLikeData,
  deleteLikeData,
  deleteLikes
} = require("../DB/like.db");
const { updatePostData } = require("../DB/post.db");
const { updateCommentData } = require("../DB/comment.db");

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

    console.log("like on like :", like, rest);

    if (!like) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Unable to add like, try again later!!!"
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Liked successfully!!!",
      like
    };
    return;
  } else {
    delete likeData.createdOn;

    const like = await deleteLikeData(ctx.db, likeData);

    console.log("like deleted", like);

    if (!like) {
      ctx.status = 404;
      ctx.body = { success: false, message: "Like details not found." };
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

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "UnLiked successfully."
    };
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

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "likes fetched successfully!!!",
    totalLikes: likes.length,
    likes
  };

  return;
};

// exports.deleteLike = async (ctx) => {
//   const { _id: userId } = ctx.request.user;
//   const { likeId: _id } = ctx.params;

//   const like = await deleteLikeData(ctx.db, {
//     _id,
//     userId
//   });

//   if (!like) {
//     ctx.status = 404;
//     ctx.body = { success: false, message: "Like not found." };
//     return;
//   }

//   await Promise.all([
//     await updatePostData(
//       ctx.db,
//       { _id: like?.postId },
//       {
//         $inc: { totalLikes: -1 }
//       }
//     ),
//     await updateLikeData(
//       ctx.db,
//       { _id: like?.likeId },
//       { $inc: { totalReplies: -1 } }
//     )
//   ]);

//   // console.log("likes", likes);

//   // if (!likes) {
//   //   ctx.status = 404;
//   //   ctx.body = { success: false, message: "Like details not found." };
//   //   return;
//   // }

//   ctx.status = 200;
//   ctx.body = {
//     success: true,
//     message: "Like details deleted successfully."
//   };
//   return;
// };
