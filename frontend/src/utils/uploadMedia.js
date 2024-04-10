// upload media to cloudinary

import { get } from "./request";

const uploadMedia = async (media) => {
  // media can be array of images, video, or gif

  const formData = new FormData();
  media.forEach((file) => {
    formData.append("file", file);
    formData.append("upload_preset", "social_media");
  });

  try {
    const res = await get(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default uploadMedia;
