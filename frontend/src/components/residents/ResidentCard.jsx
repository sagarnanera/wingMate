// resident card component which will have resident name, email and profile pic

import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "flowbite-react";
import { MdDeleteOutline, MdOutlineScheduleSend } from "react-icons/md";
import {
  deleteResidentAction,
  resendInvitationAction,
} from "../../actions/residentAction";
import { ROLES } from "../../utils/constants";
import { useSelector } from "react-redux";

const ResidentCard = ({ residentData }) => {
  const { user } = useSelector((state) => state.user);

  if (residentData.invitationToken && user.role === ROLES.SECRETORY) {
    // if the resident has an invitation token, then we will show a different card

    return (
      <Card className="w-full md:w-[calc(50%-0.5rem)] md:gap-2 lg:w-[calc(33%-1rem)] lg:gap-4 xl:w-[calc(25%-1.5rem)] xl:gap-6 flex items-center p-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-500">
            {residentData?.email
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase())
              .join("")}
          </span>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{residentData.name}</h1>
          <p className="text-gray-500">{residentData.email}</p>
        </div>
        <div className="flex gap-2 justify-between items-center mt-4">
          <Button
            color="red"
            onClick={() => deleteResidentAction(residentData?._id)}
          >
            <MdDeleteOutline className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={() => resendInvitationAction(residentData?._id)}>
            <MdOutlineScheduleSend className="mr-1 h-6 w-6" />
            Resend
          </Button>
        </div>
      </Card>
    );
  }

  return (
    // width of card is full for small screens, (half - gap) for large screens and (1/3 - gap) for extra large screens
    <Card className="w-full md:w-[calc(50%-0.5rem)] md:gap-2 lg:w-[calc(33%-1rem)] lg:gap-4 xl:w-[calc(25%-1.5rem)] xl:gap-6 flex items-center p-4">
      {residentData?.profilePic ? (
        <img
          src={residentData?.profilePic}
          alt={residentData?.name}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-500">
            {residentData?.name
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase())
              .join("")}
          </span>
        </div>
      )}
      <div>
        <h1 className="text-xl font-semibold">{residentData?.name}</h1>
        <p className="text-gray-500">{residentData?.email}</p>
      </div>

      {user?.role === ROLES.SECRETORY ? (
        <div className="flex gap-2 justify-between items-center mt-4">
          <Button
            color="red"
            onClick={() => deleteResidentAction(residentData?._id)}
          >
            <MdDeleteOutline className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      ) : null}
    </Card>
  );
};

// prop validation
ResidentCard.propTypes = {
  residentData: PropTypes.object.isRequired,
};

export default ResidentCard;
