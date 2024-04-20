// event details page, which will display the event details like event name, description, startDate, endDate, approval status and a delete + edit button.

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { MdDeleteOutline, MdEditCalendar } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventAction, getEventAction } from "../actions/eventAction";
import Loader from "../components/shared/Loader";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("fetching event with id: ", eventId);
    dispatch(getEventAction(eventId));
  }, [dispatch, eventId]);

  const {
    activeEventData: eventData,
    loading,
    error,
  } = useSelector((state) => state.event);

  const handleEditEvent = (eventId) => {
    console.log("edit event with id: ", eventId);

    // open the modal with the form to edit the event
  };

  const handleDeleteEvent = async (eventId) => {
    console.log("delete event with id: ", eventId);

    dispatch(deleteEventAction(eventId));

    // redirect to events page
    navigate("/events");
  };

  if (loading) {
    return (
      <Card className="w-full h-full flex justify-center items-center p-4 mt-4">
        <Loader size={"2xl"} />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full flex justify-center items-center p-4 mt-4">
        <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
          Error fetching event details
        </h1>
        <Button className="" onClick={() => location.reload()}>
          {" "}
          Refresh page
        </Button>
      </Card>
    );
  }
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full md:w-1/2 p-8">
        <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center">
          {eventData?.name}
        </h1>
        <div>
          <p className="text-gray-600 mb-2">
            Description: {eventData?.description}
          </p>
          <p className="text-gray-600 mb-2">
            Fees per person: {eventData?.feesPerPerson}
          </p>
          <p className="text-gray-600 mb-2">
            Property Ids: {eventData?.propertyIds.join(", ")}
          </p>
          <p className="text-gray-600 mb-2">
            Start Date: {eventData?.startDate?.toDateString()}
          </p>
          <p className="text-gray-600 mb-2">
            End Date: {eventData?.endDate?.toDateString()}
          </p>
          <p className="text-gray-600 mb-2">Status: {eventData?.status}</p>
        </div>
        <div className="flex gap-2 justify-between items-center mt-4">
          <Button color="red" onClick={() => handleDeleteEvent(eventData?._id)}>
            <MdDeleteOutline className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={() => handleEditEvent(eventData?._id)}>
            <MdEditCalendar className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EventDetailsPage;
