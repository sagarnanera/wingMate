// booking details page, which will display the booking details like booking name, description, booked properties, startDate, endDate, approval status and a delete + edit button.

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { MdDeleteOutline, MdEditCalendar } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookingAction,
  getBookingAction,
} from "../actions/bookingAction";
import Loader from "../components/shared/Loader";
import { formateDate } from "../utils/formateDate";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { activeBooking, loading, error } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    console.log("fetching booking with id: ", bookingId);
    dispatch(getBookingAction(bookingId));
    console.log("fetching booking with id: ", bookingId, activeBooking);
  }, [dispatch, bookingId]);

  const handleEditBooking = (bookingId) => {
    console.log("edit booking with id: ", activeBooking);

    // open the modal with the form to edit the booking
  };

  const handleDeleteBooking = async (bookingId) => {
    console.log("delete booking with id: ", bookingId);

    dispatch(deleteBookingAction(bookingId));
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
          Error fetching booking details
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
          {activeBooking?.reason === "Event"
            ? "Event Booking"
            : activeBooking?.reason}
        </h1>
        <div>
          <p className="text-gray-600 mb-2">
            Booking type: {activeBooking?.bookingType}
          </p>
          <p className="text-gray-600 mb-2">
            Total rent: {activeBooking?.totalRent}
          </p>
          {/* booked property names */}
          <p className="text-gray-600 mb-2">
            Property(s):{" "}
            {activeBooking?.properties
              ?.map((property) => property.name)
              .join(", ")}
          </p>
          <p className="text-gray-600 mb-2">
            Start Date: {formateDate(activeBooking?.startDate)}
          </p>
          <p className="text-gray-600 mb-2">
            End Date: {formateDate(activeBooking?.endDate)}
          </p>
        </div>
        <div className="flex gap-2 justify-between items-center mt-4">
          <Button
            color="red"
            onClick={() => handleDeleteBooking(activeBooking?._id)}
          >
            <MdDeleteOutline className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={() => handleEditBooking(activeBooking?._id)}>
            <MdEditCalendar className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookingDetailsPage;
