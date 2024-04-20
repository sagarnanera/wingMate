import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  FloatingLabel,
  Label,
  Select,
  TextInput,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import withDndFileUpload from "../../hoc/withDndFileUpload";

import { MdOutlinePermMedia } from "react-icons/md";
import MediaCard from "../shared/MediaCard";
import ImageEditor from "../shared/ImageEditor";
import { showToast } from "../../utils/showToast";

const PostForm = ({ draggedFiles }) => {
  const [title, setTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isWingFeed, setIsWingFeed] = useState(false);
  const [isShareOnFB, setIsShareOnFB] = useState(false);
  const [media, setMedia] = useState([]);
  const [mediaType, setMediaType] = useState(""); // image, video, or gif

  const [uploadedMedia, setUploadedMedia] = useState([]);

  const [editingImage, setEditingImage] = useState("");

  useEffect(() => {
    // TODO: check if files are not empty, and meet the requirements
    // (if images <= 10, video = 1, gif = 1)
    // also if there is a media already uploaded, then allow them to upload more media of type images if the media type is image,
    // if the media type is video or gif, then don't allow them to upload more media

    let error = "";

    if (draggedFiles.length > 0) {
      const newMedia = [...media];
      let newMediaType = mediaType;
      draggedFiles.forEach((file) => {
        const fileType = file.type.split("/")[0];
        if (
          fileType === "image" &&
          newMedia.length < 10 &&
          (mediaType === "image" || mediaType === "")
        ) {
          newMedia.push(file);
          newMediaType = "image";
        } else if (fileType === "video" && !newMediaType) {
          newMedia.push(file);
          newMediaType = "video";
        } else if (fileType === "gif" && !newMediaType) {
          newMedia.push(file);
          newMediaType = "gif";
        } else {
          error =
            "Unsupported file type. Please upload an image, video, or gif.";
        }
      });

      if (error) {
        showToast(
          "Unsupported file type. Please upload an image, video, or gif.",
          "error"
        );

        return;
      }
      setMedia(newMedia);
      setMediaType(newMediaType);
    }
  }, [draggedFiles]);

  const handleMediaUpload = (e) => {
    let error = "";

    const files = Array.from(e.target.files);
    const newMedia = [...media];
    let newMediaType = mediaType;
    files.forEach((file) => {
      const fileType = file.type.split("/")[0];
      if (
        fileType === "image" &&
        newMedia.length < 10 &&
        (mediaType === "image" || mediaType === "")
      ) {
        newMedia.push(file);
        newMediaType = "image";
      } else if (fileType === "video" && !newMediaType) {
        newMedia.push(file);
        newMediaType = "video";
      } else if (fileType === "gif" && !newMediaType) {
        newMedia.push(file);
        newMediaType = "gif";
      } else {
        error = "Unsupported file type. Please upload an image, video, or gif.";
      }
    });

    // TODO: show toast message if more than 10 images, 1 video , 1 gif is uploaded

    // TODO : upload media to the cloud storage (cloudinary in this case) and get the URL

    if (error) {
      showToast(
        "Unsupported file type. Please upload an image, video, or gif.",
        "error"
      );
      return;
    }
    setMedia(newMedia);
    setMediaType(newMediaType);
  };

  const handleRemoveMedia = (index) => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
    if (updatedMedia.length === 0) {
      setMediaType("");
    }
  };

  const handlePost = () => {
    // Handle post submission with title, text, feed selection, share to FB, and media
    console.log("Post submitted:", {
      title,
      postBody,
      isWingFeed,
      isShareOnFB,
      media,
    });
  };

  return (
    <>
      <Card className="w-full lg:w-1/2 mx-auto">
        <div className="flex flex-col gap-4 rounded-lg">
          <FloatingLabel
            variant="outlined"
            label="Post title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="What's on your mind?"
            type="text"
            value={postBody}
            name="postBody"
            onChange={(e) => setPostBody(e.target.value)}
            required
          />
          <div className="flex flex-wrap justify-between items-center gap-2">
            <Label
              htmlFor="mediaUpload"
              className="flex justify-center items-center gap-2 cursor-pointer"
            >
              <MdOutlinePermMedia
                color="gray"
                className="text-blue-500 h-8 w-8"
              />
              <span>Upload Media</span>
            </Label>
            <input
              id="mediaUpload"
              type="file"
              accept="image/*,video/*,.gif"
              className="sr-only"
              onChange={handleMediaUpload}
              multiple
              // disabled={media !== null}
            />

            <div className="flex items-center gap-4">
              <Label htmlFor="wingFeed-switch">Post to Wing</Label>
              <ToggleSwitch
                id="wingFeed-switch"
                checked={isWingFeed}
                onChange={() => setIsWingFeed(!isWingFeed)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="shareOnFB-switch">Share on FB page</Label>
              <ToggleSwitch
                id="shareOnFB-switch"
                checked={isShareOnFB}
                onChange={() => setIsShareOnFB(!isShareOnFB)}
              />
            </div>
          </div>
          <div className="mt-4 relative">
            {media.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                {mediaType === "image" &&
                  media.map((file, index) => (
                    <MediaCard
                      key={index}
                      media={file}
                      mediaType={"image"}
                      index={index}
                      onRemove={handleRemoveMedia}
                      alt="Uploaded Image"
                      onEdit={() => setEditingImage(file)}
                    />
                  ))}
                {mediaType === "video" && (
                  <MediaCard
                    media={media[0]}
                    mediaType={"video"}
                    index={0}
                    onRemove={handleRemoveMedia}
                    alt={"Uploaded Video"}
                    onEdit={() => setEditingImage(media)}
                  />
                )}
                {mediaType === "gif" && (
                  <MediaCard
                    media={media[0]}
                    mediaType={"image"}
                    index={0}
                    onRemove={handleRemoveMedia}
                    alt="Uploaded Image"
                    onEdit={() => setEditingImage(media)}
                  />
                )}
              </div>
            )}
          </div>
          <Button color="green" onClick={handlePost}>
            Post
          </Button>
        </div>
      </Card>

      {/* {editingImage && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] h-[80%] bg-black bg-opacity-30 flex justify-center items-center z-50">
          <ImageEditor imageUrl={editingImage} />
        </div>
      )} */}
    </>
  );
};

PostForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
  draggedFiles: PropTypes.array.isRequired,
};

export default withDndFileUpload(PostForm);

// const PostForm = ({ onSubmit, files }) => {
//   const [title, setTitle] = useState("");
//   const [isWingFeed, setIsWingFeed] = useState(false);
//   const [isShareOnFB, setIsShareOnFB] = useState(false);
//   const [media, setMedia] = useState(files);
//   const [postBody, setPostBody] = useState("");

//   // const handleFileChange = (e) => {
//   //   const selectedFiles = Array.from(e.target.files);
//   //   setFiles(selectedFiles);
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const postData = {
//       title,
//       feed: isWingFeed ? "wing" : "society",
//       text: postBody,
//       media,
//     };
//     onSubmit(postData);
//     setTitle("");
//     setPostBody("");
//     setIsWingFeed(false); // Reset switch to default (Society)
//     setMedia([]);
//   };

//   return (
//     <Card className="w-full lg:w-1/2 mx-auto">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">
//         <FloatingLabel
//           variant="outlined"
//           label="Post title"
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <Textarea
//           placeholder="What's on your mind?"
//           type="text"
//           value={postBody}
//           name="postBody"
//           onChange={(e) => setPostBody(e.target.value)}
//           required
//         />
//         <div className="flex justify-center items-center gap-2">
//           <div className="flex items-center gap-4">
//             <span>Post to Wing</span>
//             <ToggleSwitch
//               checked={isWingFeed}
//               onChange={() => setIsWingFeed(!isWingFeed)}
//             />
//           </div>
//           <div className="flex items-center gap-4">
//             <span>Share on FB page</span>
//             <ToggleSwitch
//               checked={isShareOnFB}
//               onChange={() => setIsShareOnFB(!isShareOnFB)}
//             />
//           </div>
//         </div>
//         {/* <input
//         type="file"
//         accept="image/*, video/*, .gif"
//         multiple
//         onChange={handleFileChange}
//         label="Upload Files:"
//         required
//       /> */}
//         <Button type="submit">Post</Button>
//       </form>
//     </Card>
//   );
// };
