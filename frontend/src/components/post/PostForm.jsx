import React, { useState } from "react";
import {
  Button,
  Card,
  FloatingLabel,
  Select,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import withDndFileUpload from "../../hoc/withDndFileUpload";

const PostForm = ({ onSubmit, files }) => {
  const [title, setTitle] = useState("");
  const [isWingFeed, setIsWingFeed] = useState(false);
  const [isShareOnFB, setIsShareOnFB] = useState(false);
  const [media, setMedia] = useState(files);
  const [postBody, setPostBody] = useState("");

  // const handleFileChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   setFiles(selectedFiles);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title,
      feed: isWingFeed ? "wing" : "society",
      text: postBody,
      media,
    };
    onSubmit(postData);
    setTitle("");
    setPostBody("");
    setIsWingFeed(false); // Reset switch to default (Society)
    setMedia([]);
  };

  return (
    <Card className="w-full lg:w-1/2 mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">
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
        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center gap-4">
            <span>Post to Wing</span>
            <ToggleSwitch
              checked={isWingFeed}
              onChange={() => setIsWingFeed(!isWingFeed)}
            />
          </div>
          <div className="flex items-center gap-4">
            <span>Share on FB page</span>
            <ToggleSwitch
              checked={isShareOnFB}
              onChange={() => setIsShareOnFB(!isShareOnFB)}
            />
          </div>
        </div>
        {/* <input
        type="file"
        accept="image/*, video/*, .gif"
        multiple
        onChange={handleFileChange}
        label="Upload Files:"
        required
      /> */}
        <Button type="submit">Post</Button>
      </form>
    </Card>
  );
};

export default withDndFileUpload(PostForm);
