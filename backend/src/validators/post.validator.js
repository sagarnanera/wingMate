const joi = require("joi");
const { POST_CONTENT_TYPE, FEED_TYPE } = require("../utils/constants");

// {
//   _id: 'f79091ca-7dce-4163-bfe2-0b87ed84fca9',
//   userId: '5e5646c1-62c3-4c5e-a142-cc62e0292c9c',
//   societyId: '01de2b8f-3c89-48b8-aff7-19c7554e4d1a',
//   title: 'post by secretory - text',
//   postType: 'normal post',
//   contentType: 'text',
//   postId: '9bf7df7f-776f-4e8f-9865-184492c6898e',
//   text: 'all pay maintenance fees'
// }

const IMAGE_REGX = /\.(jpg|jpeg|png|webp)$/i;
const VIDEO_REGX = /\.(mp4)$/i;
const GIF_REGX = /\.(gif)$/i;

exports.titleValidator = (ctx) => {
  let { title } = ctx.request.body;

  if (!title || title === "") {
    return { field: "title", message: "Title is required" };
  }

  title = title.trim();

  const { error } = joi.string().required().validate(title);

  if (error) {
    return { field: "title", message: "Title is not valid" };
  }

  ctx.request.body.title = title;

  return null;
};

exports.feedTypeValidator = (ctx) => {
  const { method: requestMethod } = ctx.request;
  let { feed } = ctx.request.body;

  if (requestMethod === "GET") {
    feed = ctx.query?.feed;
  }

  if (requestMethod !== "GET" && !feed) {
    return { field: "feed", message: "Feed is required" };
  }

  if (feed) {
    const { error } = joi
      .string()
      .valid(...Object.values(FEED_TYPE))
      .required()
      .validate(feed);

    // console.log("err in validation:", error);

    if (error) {
      return {
        field: "feed",
        message: "Feed should be one among [society, wing]."
      };
    }

    feed = feed.trim();
    if (requestMethod === "GET") {
      ctx.query.feed = feed;
    } else {
      ctx.request.body.feed = feed;
    }
  }
  return null;
};

exports.textValidator = (ctx) => {
  let { text, contentType } = ctx.request.body;

  // if (!Object.values(POST_CONTENT_TYPE).includes(contentType)) {
  //   return null;
  // }

  // if (contentType !== "text") {
  // return null;
  // }

  // if (contentType !== "text" && text) {
  //   return { field: "text", message: "Text is not allowed in text posts." };
  // }

  if (contentType === "text" && (!text || text === "")) {
    return { field: "text", message: "Text is required" };
  }

  if (text) {
    text = text.trim();

    const { error } = joi.string().min(10).max(5000).required().validate(text);
    if (error) {
      return {
        field: "text",
        message: "Text should be between 10 and 5000 characters long"
      };
    }

    ctx.request.body.text = text;
  }

  return null;
};

exports.contentTypeValidator = (ctx) => {
  const { media, text } = ctx.request.body;

  let contentType = POST_CONTENT_TYPE.TEXT;

  if (!media && !text) {
    return {
      field: "media_text",
      message: "One of the media or text is required."
    };
  }

  if (text && text.trim() !== "") {
    contentType = POST_CONTENT_TYPE.TEXT;
  }

  if (media && Array.isArray(media) && media.length > 0) {
    // if there is images in the media then contentType will be image
    if (IMAGE_REGX.test(media[0])) {
      contentType = POST_CONTENT_TYPE.IMAGE;
    }

    // if there is a video in the media then contentType will be video
    else if (VIDEO_REGX.test(media[0])) {
      contentType = POST_CONTENT_TYPE.VIDEO;
    }

    // if there is a gif in the media then contentType will be gif
    else if (GIF_REGX.test(media[0])) {
      contentType = POST_CONTENT_TYPE.GIF;
    } else {
      return {
        field: "media",
        message: "Media should contain one of the images, video, or gif only."
      };
    }
  }

  ctx.request.body.contentType = contentType;

  return null;
};

exports.mediaValidator = (ctx) => {
  const { media, contentType } = ctx.request.body;

  // if (contentType === "text" && media) {
  //   return { field: "media", message: "Media is not allowed in text posts." };
  // }

  if (contentType !== "text" && !media) {
    return { field: "media", message: "Media is required" };
  }

  if (media) {
    if (!Array.isArray(media)) {
      return {
        field: "media",
        message: "Media should be an array containing valid media links."
      };
    }

    switch (contentType) {
      case "image":
        if (media.length > 10) {
          return { field: "media", message: "Up to 10 images are allowed." };
        }
        // valid image URLs
        const imageValidationResult = joi
          .array()
          .items(joi.string().uri().pattern(IMAGE_REGX))
          .validate(media);

        if (imageValidationResult?.error) {
          return {
            field: "media",
            message:
              "Invalid image URL format, supported image types are JPG, JPEG, PNG and WEBP."
          };
        }
        break;

      case "video":
        if (media.length !== 1) {
          return {
            field: "media",
            message: "Exactly one video URL is required."
          };
        }
        // valid video URL
        const videoSchema = joi.string().uri().pattern(VIDEO_REGX);
        const videoValidationResult = videoSchema.validate(media[0]);
        if (videoValidationResult?.error) {
          return {
            field: "media",
            message: "Invalid video URL format, only MP4 video is allowed."
          };
        }
        break;
      case "gif":
        if (media.length !== 1) {
          return {
            field: "media",
            message: "Exactly one GIF URL is required."
          };
        }
        // valid GIF URL
        const gifSchema = joi.string().uri().pattern(GIF_REGX);
        const gifValidationResult = gifSchema.validate(media[0]);
        if (gifValidationResult?.error) {
          return { field: "media", message: "Invalid GIF URL format" };
        }
        break;
      default:
        return null; // No specific validation for other content types
    }
  }

  return null;
};

exports.postIdValidator = (ctx) => {
  const { method: requestMethod } = ctx.request;
  let { postId, commentId } = ctx.params;

  if (commentId) {
    return null;
  }

  if (requestMethod === "POST" && ctx.request.url.includes("comment")) {
    console.log("includes comment", ctx.request.body);
    postId = ctx.request.body.postId;
  }

  if (!postId) {
    return { field: "postId", message: "postId is required" };
  }

  // if (postId) {
  const { error } = joi.string().uuid().required().validate(postId);
  if (error) {
    return { field: "postId", message: "Post ID must be a valid UUID" };
  }

  ctx.state.postId = postId;
  // }

  return null;
};
