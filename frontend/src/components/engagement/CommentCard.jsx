// comment card, which will display the comment details like profile picture, name, time of comment, comment text and a reply button.

import { Button, Card } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { deleteCommentAction } from "../../actions/engagementAction";
import { formateDate } from "../../utils/formateDate";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CommentCard = ({ commentData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // const handleEditComment = (commentId) => {
  //   console.log("edit comment with id: ", commentId);

  //   // open the modal with the form to edit the comment
  // };

  const handleDeleteComment = async (commentId) => {
    dispatch(deleteCommentAction(commentId));
  };

  const handleReply = (commentId) => {
    console.log("reply to comment");
  };

  return (
    <>
      <div className="flex items-start m-2 my-4">
        <img
          loading="lazy"
          src="https://xsgames.co/randomusers/avatar.php?g=pixel"
          alt="user"
          className="w-10 h-full rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <div className="flex">
            <Link
              className="block text-md mx-2 font-bold"
              to={`/residents/${123}`}
            >
              {commentData?.user?.name}
            </Link>
            <p className="te">{commentData?.content}</p>
          </div>
          <div className="flex text-xs text-gray-500">
            <p className="mx-2">{formateDate(commentData?.createdOn)}</p>
            <button onClick={() => handleReply(commentData?._id)}>reply</button>
          </div>
        </div>
      </div>
      {/* {user?._id === commentData?.userId ? (
        <div className="flex gap-2 justify-between items-center mt-4">
          <Button
            color="red"
            onClick={() => handleDeleteComment(commentData?._id)}
          >
            <MdDeleteOutline className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      ) : null} */}
    </>
  );
};

CommentCard.propTypes = {
  commentData: PropTypes.object.isRequired,
};

export default CommentCard;
