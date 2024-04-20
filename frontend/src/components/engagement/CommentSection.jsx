// comment section, which will display the comment card and a form to add a new comment.

import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../actions/engagementAction";
import CommentCard from "./CommentCard";
import PropTypes from "prop-types";

const CommentSection = ({ comments, postId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleAddComment = () => {
    dispatch(createCommentAction({ content: comment, postId }));
    setComment("");
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
          Comments
        </h1>
        {comments?.map((comment) => (
          <CommentCard key={comment._id} commentData={comment} />
        ))}
      </div>
      <div className="w-full">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="mt-4"
          color="blue"
          onClick={handleAddComment}
          disabled={!comment}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};

export default CommentSection;
