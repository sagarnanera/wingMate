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

exports.skipValidator = (ctx) => {
  let { skip } = ctx.request.query;
  skip = parseInt(skip);

  if (skip && (isNaN(skip) || skip < 0)) {
    return { field: "skip", message: "Skip must be a non-negative integer" };
  }

  ctx.request.query.skip = skip || 0;

  return null;
};

exports.limitValidator = (ctx) => {
  let { limit } = ctx.request.query;
  limit = parseInt(limit);

  if (limit && (isNaN(limit) || limit <= 0)) {
    return { field: "limit", message: "Limit must be a positive integer" };
  }

  ctx.request.query.limit = limit || 10;

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

  if (!Object.values(POST_CONTENT_TYPE).includes(contentType)) {
    return null;
  }

  if (contentType !== "text" && text) {
    return { field: "text", message: "Text is not allowed in text posts." };
  }

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
  const { contentType } = ctx.request.body;

  if (!contentType) {
    return { field: "contentType", message: "Content Type is required" };
  }

  const { error } = joi
    .array()
    .valid(...Object.values(POST_CONTENT_TYPE))
    .required()
    .validate(contentType);

  if (error) {
    return {
      field: "contentType",
      message: "Content Type should be one among [text, image, video, gif]."
    };
  }

  return null;
};

exports.mediaValidator = (ctx) => {
  const { media, contentType } = ctx.request.body;

  if (!Object.values(POST_CONTENT_TYPE).includes(contentType)) {
    return null;
  }

  if (contentType === "text" && media) {
    return { field: "media", message: "Media is not allowed in text posts." };
  }

  if (contentType !== "text" && !media) {
    return { field: "media", message: "Media is required" };
  }

  //   const mediaTypeValidationMap = {
  //     [POST_CONTENT_TYPE.IMAGE]: {
  //       pattern: /\.(jpg|jpeg|png)$/i,
  //       message: "Image URLs are required"
  //     },
  //     [POST_CONTENT_TYPE.VIDEO]: {
  //       pattern: /\.(mp4|avi|mov)$/i,
  //       message: "Video URLs are required"
  //     },
  //     [POST_CONTENT_TYPE.GIF]: {
  //       pattern: /\.(gif)$/i,
  //       message: "GIF URLs are required"
  //     }
  //   };

  //   const validationSchemaPattern = mediaTypeValidationMap[contentType];

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
          .items(
            joi
              .string()
              .uri()
              .pattern(/\.(jpg|jpeg|png|webp)$/i)
          )
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
        const videoSchema = joi
          .string()
          .uri()
          .pattern(/\.(mp4)$/i);
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
        const gifSchema = joi
          .string()
          .uri()
          .pattern(/\.(gif)$/i);
        const gifValidationResult = gifSchema.validate(media[0]);
        if (gifValidationResult?.error) {
          return { field: "media", message: "Invalid GIF URL format" };
        }
        break;
      default:
        return null; // No specific validation for other content types
    }
  }
  //   if (media) {
  //     switch (contentType) {
  //       case "image":
  //         break;
  //       case "video":
  //         break;
  //       case "gif":
  //         break;

  //       default:
  //         break;
  //     }

  // const { error } = joi
  //   .array()
  //   .items(joi.string().uri().required())
  //   .required()
  //   .validate(media);

  // if (error) {
  //   console.log(error, 38);
  //   return {
  //     field: "media",
  //     message: "Media must be an array of valid URLs."
  //   };
  // }
  //   }

  return null;
};

exports.postIdValidator = (ctx) => {
  const { postId } = ctx.params;

  if (!postId) {
    return { field: "postId", message: "PostId is required." };
  }

  const { error } = joi.string().uuid().required().validate(postId);
  if (error) {
    return { field: "postId", message: "Post ID must be a valid UUID" };
  }

  return null;
};
