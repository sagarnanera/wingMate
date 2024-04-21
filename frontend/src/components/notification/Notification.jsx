import React from "react";
import { Button } from "flowbite-react";
import { formateDate } from "../../utils/formateDate";
import { MdCheck } from "react-icons/md";

const Notification = ({ notification }) => {
  return (
    <div className="w-full mb-2 p-4 flex items-center justify-between rounded-md bg-gray-100 shadow-md">
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-semibold text-gray-800 mb-1">
          {notification.title}
        </h1>
        <p className="text-sm text-gray-600 font-light mb-1">
          {notification.description}
        </p>
        <p className="text-xs text-gray-500 mb-1">
          {formateDate(notification.date)}
        </p>
      </div>
      <Button color="gray" size="sm">
        <MdCheck className="mr-1" /> Read
      </Button>
    </div>
  );
};

export default Notification;
