// post component which will have the post details, post can be text, image (can have multiple image show carousel), video or gif and will have like, comment and share button

import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineShareAlt,
  AiOutlineSave,
  AiFillSave,
} from "react-icons/ai";

import { FaRegComment, FaComment } from "react-icons/fa";
import { useToast } from "../../context/toast-context";
import { formateDate } from "../../utils/formateDate";

const Post = ({ postData, source }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const showToast = useToast();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const isPostSaved = savedPosts.some((post) => post._id === postData?._id);
    if (isPostSaved) {
      setIsSaved(true);
    }
  }, [postData?._id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    setIsCommented(!isCommented);
  };

  const handleShare = () => {
    const navigator = window.navigator;
    if (navigator.share) {
      navigator.share({
        title: postData?.title,
        text: postData?.text,
        url: "https://wingmate.com/posts/123",
      });
    } else {
      console.log("Web share not supported");

      // add fallback for web share (can be social dropdown)
    }
  };

  const handleSave = () => {
    // save post as of now we will save post in the local storage
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const isPostAlreadySaved = savedPosts.some(
      (post) => post._id === postData._id
    );
    if (isPostAlreadySaved) {
      const updatedSavedPosts = savedPosts.filter(
        (post) => post._id !== postData._id
      );
      localStorage.setItem("savedPosts", JSON.stringify(updatedSavedPosts));
    } else {
      savedPosts.push(postData);
      localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
    }

    setIsSaved((prev) => !prev);
    // show success toast

    showToast("Post saved successfully", "info");

    // TODO: Create APIs to save post and associate with the user
  };

  return (
    <Card className={`w-full ${source === "profile" ? "" : "lg:w-1/2"} mt-4`}>
      <div className="flex items-center">
        <img
          loading="lazy"
          src="https://xsgames.co/randomusers/avatar.php?g=pixel"
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <Link className="block text-sm" to={`/residents/${123}`}>
            {postData?.user?.name}
          </Link>
          <span className="block text-xs text-gray-500">
            {formateDate(postData?.createdOn)}
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mt-4">{postData.title}</h2>
        {/* image post */}
        {postData &&
          postData.contentType &&
          postData.contentType === "image" &&
          (postData.media && postData.media.length > 1 ? (
            <Carousel
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              infiniteLoop={true}
              autoPlay={true}
            >
              {postData.media.map((image, index) => (
                <img
                  loading="lazy"
                  key={index}
                  src={image}
                  alt="post"
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "fallback-image-url";
                  }}
                />
              ))}
            </Carousel>
          ) : (
            <div className="mt-4">
              <img
                loading="lazy"
                src={postData.media[0]}
                alt="post"
                className="w-full rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "fallback-image-url";
                }}
              />
            </div>
          ))}
        {/* gif post */}
        {postData && postData.contentType && postData.contentType === "gif" && (
          <div className="mt-4">
            <img
              loading="lazy"
              src={postData.media[0]}
              alt="post"
              className="w-full rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "fallback-image-url";
              }}
            />
          </div>
        )}
        {/* video post */}
        {postData &&
          postData.contentType &&
          postData.contentType === "video" && (
            <div className="mt-4">
              <video
                src={postData.media[0]}
                controls
                controlsList="nodownload"
                className="w-full rounded-lg"
              />
            </div>
          )}

        {postData &&
          postData.contentType &&
          postData.contentType === "text" && (
            <p className="text-sm mt-4">{postData.text}</p>
          )}
      </div>

      {/* engagement section: like comment share save */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="text-blue-500" onClick={handleLike}>
              <div className="flex items-center justify-between">
                {isLiked ? (
                  <AiFillLike size={20} className="" />
                ) : (
                  <AiOutlineLike size={20} className="" />
                )}
                <span className="ml-1">{postData?.totalLikes}</span>
              </div>
            </button>
            <button className="ml-4 text-blue-500" onClick={handleComment}>
              <div className="flex items-center justify-between">
                {isCommented ? (
                  <FaComment size={20} className="" />
                ) : (
                  <FaRegComment size={20} className="" />
                )}
                <span className="ml-1">{postData?.totalComments}</span>
              </div>
            </button>
          </div>
          <div className="flex justify-between">
            <button className="ml-4 text-blue-500 mr-4" onClick={handleShare}>
              <AiOutlineShareAlt size={20} className="" />
            </button>
            <button className="text-blue-500" onClick={handleSave}>
              {isSaved ? (
                <AiFillSave size={20} className="" />
              ) : (
                <AiOutlineSave size={20} className="" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Post;

// prop types
Post.propTypes = {
  postData: PropTypes.object.isRequired,
  source: PropTypes.string,
};

{
  /* <Card className={`w-full ${source === "profile" ? "" : "lg:w-1/2"} mt-4`}>
<div className="flex items-center">
  <img
  loading="lazy"
    src="https://xsgames.co/randomusers/avatar.php?g=pixel"
    alt="user"
    className="w-10 h-10 rounded-full"
  />
  <div className="ml-4">
    <Link className="block text-sm" to={`/residents/${123}`}>
      Sk Nanera
    </Link>
    <span className="block text-xs text-gray-500">2 hours ago</span>
  </div>
</div>
<div>
  <p className="text-sm mt-4">Lorem ipsum dolor.</p>
  <div className="mt-4">
    <img
    loading="lazy"
      src="https://xsgames.co/randomusers/avatar.php?g=pixel"
      alt="post"
      className="w-full rounded-lg"
    />
  </div>
</div>
<div>
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <button className="text-blue-500">Like</button>
      <button className="ml-4 text-blue-500">Comment</button>
      <button className="ml-4 text-blue-500">Share</button>
    </div>
    <button className="text-blue-500">Save</button>
  </div>
</div>
</Card> */
}
