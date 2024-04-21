// engagement section, which will display the like, comment, share and save buttons.

import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillLike,
  AiFillSave,
  AiOutlineLike,
  AiOutlineSave,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { FaComment, FaRegComment } from "react-icons/fa";
import PropTypes from "prop-types";

import {
  likePostAction,
  createCommentAction,
  getCommentsAction,
} from "../../actions/engagementAction";
import CommentSection from "./CommentSection";
import { getEngagementByPostId } from "../../reducers/engagementReducer";
import { showToast } from "../../utils/showToast";

const Engagement = ({ postData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // const [isLiked, setIsLiked] = useState(postData.isLiked);

  const { comments } = useSelector((state) =>
    getEngagementByPostId(state.engagement, postData._id)
  );

  const [isSaved, setIsSaved] = useState(postData.isSaved);
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);

  const handleLike = () => {
    dispatch(likePostAction(postData._id));
  };

  const handleCommentClick = () => {
    setIsCommentSectionVisible((prev) => !prev);
    console.log("comments: ", comments);
    if (!comments || comments.length === 0) {
      dispatch(getCommentsAction(postData._id));
      console.log("comments: ", comments);
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

    showToast("Post saved successfully", "success");

    // TODO: Create APIs to save post and associate with the user
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button className="text-blue-500" onClick={handleLike}>
            <div className="flex items-center justify-between">
              {postData.isLiked ? (
                <AiFillLike size={20} className="" />
              ) : (
                <AiOutlineLike size={20} className="" />
              )}
              <span className="ml-1">{postData?.totalLikes}</span>
            </div>
          </button>
          <button className="ml-4 text-blue-500" onClick={handleCommentClick}>
            <div className="flex items-center justify-between">
              {postData.isCommented ? (
                <FaComment size={20} className="" />
              ) : (
                <FaRegComment size={20} className="" />
              )}
              <span className="ml-1">{postData?.totalComments}</span>
            </div>
          </button>
        </div>
        <div className="flex justify-between">
          <button className="ml-4 text-blue-500 mr-4">
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

      {/* comment section */}
      {isCommentSectionVisible && (
        <CommentSection postId={postData?._id} comments={comments} />
      )}
    </div>
  );
};

// prop types
Engagement.propTypes = {
  postData: PropTypes.object.isRequired,
};

export default Engagement;
