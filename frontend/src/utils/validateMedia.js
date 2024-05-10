// validate media file
/*
file should be image, video or gif
    // check if files are not empty, and meet the requirements
    // (if images <= 10, video = 1, gif = 1)
    // also if there is a media already uploaded, then allow them to upload more media of type images if the media type is image,
    // if the media type is video or gif, then don't allow them to upload more media
    // file types should not mix, if there is an image, then don't allow video or gif


    // these are the allowed format for the media
    Image : png, jpg, jpeg
    Video : mp4
    Gif : gif
*/

const files = [
  {
    name: "LargeImage1.jpg",
    size: 16579680,
    type: "image/jpeg",
  },
  {
    name: "LargeImage2.jpg",
    size: 16579680,
    type: "image/jpeg",
  },
  {
    name: "LargeImage3.jpg",
    size: 16579680,
    type: "image/jpeg",
  },
  {
    name: "LargeImage4.jpg",
    size: 16579680,
    type: "image/jpeg",
  },
  {
    name: "LargeImage5.jpeg",
    size: 16579680,
    type: "image/jpeg",
  },
//   {
//     name: "LargeImage6.mp4",
//     size: 16579680,
//     type: "video/mp4",
//   },
  {
    name: "LargeImage7.gif",
    size: 16579680,
    type: "image/gif",
  },
  {
    name: "LargeImage7.gif",
    size: 16579680,
    type: "image/gif",
  },
  {
    name: "LargeImage7.gif",
    size: 16579680,
    type: "image/gif",
  },
];

export const validateMedia = (files) => {
  const res = {
    success: false,
    message: "",
    files: [],
  };

  if (!files) {
    res.message = "No files found";
    return res;
  }

  if (!Array.isArray(files)) {
    res.message = "Files should be an array";
    return res;
  }

  if (files.length === 0) {
    res.message = "No files found";
    return res;
  }

  if (files.length > 10) {
    res.message = "You can only upload 10 files";
    return res;
  }

  let images = 0;
  let video = 0;
  let gif = 0;
  const sanitizedFiles = [];

  files.forEach((file) => {
    const fileType = file.type.split("/")[0];
    if (fileType !== "image" && fileType !== "video" && fileType !== "gif") {
      res.message = "File type not supported";
      return res;
    }

    if (fileType === "image") {
      if (images > 0 && video > 0) {
        res.message = "You can only upload either images or video, not both";
        return res;
      }
      if (gif > 0) {
        res.message = "You can only upload images or gif, not both";
        return res;
      }
      images++;
      sanitizedFiles.push(file);
    }

    if (fileType === "video") {
      if (video > 0) {
        res.message = "You can only upload 1 video";
        return res;
      }
      if (images > 0) {
        res.message = "You can only upload either images or video, not both";
        return res;
      }
      video++;
      sanitizedFiles.push(file);
    }

    if (fileType === "gif") {
      if (gif > 0) {
        res.message = "You can only upload 1 gif";
        return res;
      }
      if (images > 0) {
        res.message = "You can only upload images or gif, not both";
        return res;
      }
      gif++;
      sanitizedFiles.push(file);
    }
  });

  res.success = true;
  res.files = sanitizedFiles;
  return res;
};

console.log(validateMedia(files));