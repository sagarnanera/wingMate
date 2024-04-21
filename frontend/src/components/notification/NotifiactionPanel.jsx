import React, { useEffect, useRef } from "react";
import { MdChecklist, MdClose } from "react-icons/md";
import Notification from "./Notification";
import { Button, FooterDivider } from "flowbite-react";
import useOutsideClick from "../../hooks/useOutsideClick";

const NotificationPanel = ({ handleClose }) => {
  const notifications = [
    {
      _id: "1",
      title: "Notification A",
      description: "some description",
      type: "info",
      date: "2021-10-01",
    },
    {
      _id: "2",
      title: "Notification B",
      description: "some description",
      type: "warning",
      date: "2021-10-11",
    },
    {
      _id: "3",
      title: "Notification C",
      description: "some description",
      type: "error",
      date: "2021-10-21",
    },
    {
      _id: "4",
      title: "Notification D",
      description: "some description",
      type: "success",
      date: "2021-11-01",
    },
  ];

  const ref = useRef(null);
  // useOutsideClick(ref, handleClose);

  const handleReadAll = () => {
    // Logic to mark all notifications as read
  };

  return (
    <div id="notification-panel" ref={ref}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 mx-4 justify-center text-center">
          Notifications
        </h1>
        <button
          className="p-1 mr-2 bg-transparent hover:bg-white rounded-full shadow-md"
          onClick={handleClose}
        >
          <MdClose size={35} />
        </button>
      </div>

      <FooterDivider
        theme={{
          base: "border-gray-200 my-2",
        }}
      />
      <div className="h-screen overflow-scroll p-2">
        <div className="flex justify-end mb-4">
          <Button
            className="flex items-center text-gray-600 hover:text-gray-800"
            color={"gray"}
            onClick={handleReadAll}
          >
            <MdChecklist className="mr-2" />
            Read All
          </Button>
        </div>
        {notifications?.length &&
          notifications.map((notification) => (
            <Notification key={notification._id} notification={notification} />
          ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
