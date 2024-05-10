// misc controller for miscellaneous tasks

// import { responseHandler } from "../handlers/response.handler";
const { responseHandler } = require("../handlers/response.handler");

const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CONFIG } = require("../utils/constants");

cloudinary.config({
  cloud_name: CLOUDINARY_CONFIG.CLOUD_NAME,
  api_key: CLOUDINARY_CONFIG.API_KEY,
  api_secret: CLOUDINARY_CONFIG.API_SECRET,
});

// media upload controller
exports.mediaUpload = async (ctx) => {
  const {
    phase,
    name: fileName,
    size: fileSize,
    type: resourceType,
  } = ctx.request.query;

  const { _id: userId } = ctx.request.user;

  // incoming file info formate
  /*
    name: "card.png";
    size: 22645;
    type: "image/png";
  */

  // validation

  if (!fileName || !fileSize || !resourceType) {
    return responseHandler(
      ctx,
      false,
      "Please provide all the required fields.",
      400,
      null
    );
  }

  // size validation, 10MB
  if (fileSize > 1024 * 1024 * 10) {
    return responseHandler(
      ctx,
      false,
      "File size is too large, please upload a file less than 10MB.",
      400,
      null
    );
  }

  // resource type validation, only images, videos and GIF are allowed
  if (
    ![
      "image/png",
      "image/jpeg",
      "image/jpg",
      "video/mp4",
      "image/gif",
    ].includes(resourceType)
  ) {
    return responseHandler(
      ctx,
      false,
      "Invalid file type, please upload a valid file type.",
      400,
      null
    );
  }

  // generate public_id for the media
  let public_id = `${userId}/${Date.now()}-${fileName.split(".")[0]}`;

  switch (resourceType.split("/")[0]) {
    case "image":
      public_id = `images/${public_id}`;
      break;
    case "video":
      public_id = `videos/${public_id}`;
      break;
    default:
      public_id = `media/${public_id}`;
      break;
  }

  if (phase === "initialize") {
    // getting the signature for the upload, frontend have to upload withing 5 minutes after that signature will expire
    // for the 5 minutes window, using 55 minutes past time
    const timestamp = Math.floor(Date.now() / 1000) - 55 * 60;
    const signatureParams = {
      public_id,
      timestamp,
    };

    let signatureResult = null;

    try {
      signatureResult = cloudinary.utils.api_sign_request(
        signatureParams,
        CLOUDINARY_CONFIG.API_SECRET
      );
    } catch (error) {
      console.log(error);
    }

    if (!signatureResult) {
      return responseHandler(
        ctx,
        false,
        "Error generating signature, please try again.",
        500,
        null
      );
    }

    return responseHandler(
      ctx,
      true,
      "Signature generated successfully.",
      200,
      {
        data: { signature: signatureResult, timestamp, public_id },
      }
    );
  } else if (phase === "complete") {
    //getting the url of the uploaded media

    const url = cloudinary.url(public_id);

    return responseHandler(ctx, true, "Media uploaded successfully.", 200, {
      url,
    });
  }

  responseHandler(
    ctx,
    false,
    "Invalid phase, please provide valid phase.",
    400,
    null,
    "Invalid phase."
  );
};

// get all wings controller
exports.getAllWings = async (ctx) => {
  // const { societyId } = ctx.request.query;

  return responseHandler(ctx, true, "Wings fetched successfully.", 200, {
    wings,
  });
};
