// comment section, which will display the comment card and a form to add a new comment.

/*

  example comment object

  "comments": [
        {
            "_id": "c0061d8a-1280-4553-9d56-d4311b793cd0",
            "userId": "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
            "content": "nice comment 2",
            "totalLikes": 1,
            "totalReplies": 3,
            "createdOn": "2024-02-23T04:29:29.503Z",
            "postId": "80c85af2-a8fb-4dda-a452-4ef7474f3dea",
            "user": {
                "_id": "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
                "email": "devanshu@gmail.com",
                "societyId": "8426a679-6a38-416a-a6d8-4e9ccadb8744",
                "contact": "1234567890",
                "createdOn": "2024-02-22T12:49:53.843Z",
                "name": "d bhat",
                "password": "$2a$10$5xjpqNdOmsxZlk9s2LClxeWEV7DzSBezQUU/yzKGgRnAA/1ZOKls6",
                "role": "resident",
                "totalPost": 9,
                "wingId": "4918bf3b-f89b-4a57-a78b-064e29123875"
            }
        },
        {
            "_id": "14aa3210-9dcc-4d13-9c6b-ef971bdc51d1",
            "userId": "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
            "content": "nice comment",
            "totalLikes": 0,
            "totalReplies": 0,
            "createdOn": "2024-02-22T12:58:43.102Z",
            "postId": "80c85af2-a8fb-4dda-a452-4ef7474f3dea",
            "user": {
                "_id": "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
                "email": "devanshu@gmail.com",
                "societyId": "8426a679-6a38-416a-a6d8-4e9ccadb8744",
                "contact": "1234567890",
                "createdOn": "2024-02-22T12:49:53.843Z",
                "name": "d bhat",
                "password": "$2a$10$5xjpqNdOmsxZlk9s2LClxeWEV7DzSBezQUU/yzKGgRnAA/1ZOKls6",
                "role": "resident",
                "totalPost": 9,
                "wingId": "4918bf3b-f89b-4a57-a78b-064e29123875"
            }
        }
    ]


    // so if comment have replies then we can show the replies in the comment card itself,
    // replies will be slightly right shifted.

*/

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
