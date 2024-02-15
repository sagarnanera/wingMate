// const { Promise } = require("bluebird");
// const { findUser } = require("../db/user.db");

const { POST_CONTENT_TYPE } = require("../utils/constants");

const FACEBOOK_BASE_URL = process.env.FACEBOOK_BASE_URL;
// const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
// const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_Id;
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const FACEBOOK_PAGE_TOKEN = process.env.FACEBOOK_PAGE_TOKEN;

/**
 *
 * @param {*} postData
 * @returns
 */

exports.postToFacebook = async (postData) => {
  const { title, text, media, contentType } = postData;
  const facebookPostData = {};

  if (contentType === POST_CONTENT_TYPE.TEXT) {
    facebookPostData["message"] = `${title} \n ${text}`;
  } else if (contentType === POST_CONTENT_TYPE.VIDEO) {
    facebookPostData["description"] = title;
    facebookPostData["file_url"] = media[0];
  } else {
    facebookPostData["message"] = title;
    facebookPostData["link"] = media[0];
  }
  const url = `${FACEBOOK_BASE_URL}/${FACEBOOK_PAGE_ID}/${
    contentType === POST_CONTENT_TYPE.VIDEO ? "videos" : "feed"
  }?access_token=${FACEBOOK_PAGE_TOKEN}`;

  console.log(url, 26);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(facebookPostData)
    });

    if (res.ok) {
      const post = await res.json();

      console.log(post);

      return { postId: post.id, pageId: post.id.split("_")[0] };
    } else {
      const errorResponse = await res.json();
      console.error("Error sharing post on Facebook:", errorResponse);
      throw new Error("Failed to share post on Facebook");
    }
  } catch (error) {
    console.error(`Error while creating post :`, error);
    throw error;
  }
};

/**
 *
 * @param {*} postId
 * @returns
 */
exports.deleteFacebookPost = async (postId) => {
  const url = `${FACEBOOK_BASE_URL}/${postId}?access_token=${FACEBOOK_PAGE_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: "DELETE"
    });
    const response = await res.json();

    console.log("fb post deletion : ", postId, response);

    if (!response.success) {
      console.error("Error while deleting post Facebook:", errorResponse);
      throw new Error("Failed to delete post on Facebook");
    }
  } catch (error) {
    console.error(`Error while deleting post :`, error);
    throw error;
  }
};

// exports.getPageAccessTokens = (pageIds, userAccessToken) => {
//   return Promise.map(pageIds, async (pageId) => {
//     try {
//       const response = await fetch(
//         `${FACEBOOK_BASE_URL}/${pageId}?fields=access_token,name&access_token=${userAccessToken}`
//       );
//       const pageData = await response.json();
//       return pageData;
//     } catch (error) {
//       console.error(`Error fetching page ${pageId} access token:`, error);
//       throw error;
//     }
//   });
// };
