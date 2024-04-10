// booking details page, which will display the booking details like booking name, description, booked properties, startDate, endDate, approval status and a delete + edit button.

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { MdDeleteOutline, MdEditCalendar } from "react-icons/md";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  // const [bookingData, setBookingData] = useState({
  //   _id: "1",
  //   name: "booking A",
  //   description: "some description",
  //   feesPerPerson: 1000,
  //   propertyIds: ["1", "2"],
  //   startDate: new Date("2021-10-01"),
  //   endDate: new Date("2021-10-10"),
  //   status: "Pending", // Add the approval status property
  // });

  // const {booking} = user

  // TODO: fetch booking data from backend using bookingId

  useEffect(() => {
    
    

  }, [bookingId]);

  const handleEditBooking = (bookingId) => {
    console.log("edit booking with id: ", bookingId);

    // open the modal with the form to edit the booking
  };

  const handleDeleteBooking = async (bookingId) => {
    console.log("delete booking with id: ", bookingId);

    // delete the booking with the given id

    const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // booking deleted successfully
      console.log("booking deleted successfully");
    }

    // redirect to bookings page
    navigate("/bookings");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full md:w-1/2 p-8">
        <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center">
          {bookingData.name}
        </h1>
        <div>
          <p className="text-gray-600 mb-2">
            Description: {bookingData.description}
          </p>
          <p className="text-gray-600 mb-2">
            Fees per person: {bookingData.feesPerPerson}
          </p>
          <p className="text-gray-600 mb-2">
            Property Ids: {bookingData.propertyIds.join(", ")}
          </p>
          <p className="text-gray-600 mb-2">
            Start Date: {bookingData?.startDate?.toDateString()}
          </p>
          <p className="text-gray-600 mb-2">
            End Date: {bookingData?.endDate?.toDateString()}
          </p>
          <p className="text-gray-600 mb-2">Status: {bookingData.status}</p>
        </div>
        <div className="flex gap-2 justify-between items-center mt-4">
          <Button
            color="red"
            onClick={() => handleDeleteBooking(bookingData?._id)}
          >
            <MdDeleteOutline className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={() => handleEditBooking(bookingData?._id)}>
            <MdEditCalendar className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookingDetailsPage;
