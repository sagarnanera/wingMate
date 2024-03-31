// booking page, which will display all the bookings in the society, with create and delete functionality.

import React, { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import { MdAssignmentAdd } from "react-icons/md";

import BookingCard from "../components/booking/BookingCard";
import BookingForm from "../components/booking/BookingForm";
import { useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([
    {
      _id: "1",
      name: "booking A",
      description: "some description",
      feesPerPerson: 1000,
      propertyIds: ["1", "2"],
      startDate: new Date("2021-10-01"),
      endDate: new Date("2021-10-10"),
    },
    {
      _id: "2",
      name: "booking B",
      description: "some description",
      feesPerPerson: 2000,
      propertyIds: ["3", "4"],
      startDate: new Date("2021-10-11"),
      endDate: new Date("2021-10-20"),
    },
    {
      _id: "3",
      name: "booking C",
      description: "some description",
      feesPerPerson: 3000,
      propertyIds: ["1", "3"],
      startDate: new Date("2021-10-21"),
      endDate: new Date("2021-10-30"),
    },
    {
      _id: "4",
      name: "booking D",
      description: "some description",
      feesPerPerson: 4000,
      propertyIds: ["2", "4"],
      startDate: new Date("2021-11-01"),
      endDate: new Date("2021-11-10"),
    },
  ]);
  const [activeBookingData, setActiveBookingData] = useState({});
  const [isBookingFormVisible, setBookingFormVisible] = useState(false);

  // {
  //     "name":"booking A",
  //     "description":"some description",
  //     "feesPerPerson":1000,
  //     "propertyIds":["1","2"],
  //     "startDate":"2021-10-01",
  //     "endDate":"2021-10-10"
  //   }

  // TODO : Fetch bookings from the backend

  // useEffect(() => {
  //     const fetchBookings = async () => {
  //         const response = await fetch("/api/bookings");
  //         const data = await response.json();
  //         setBookings(data);
  //     };

  //     fetchBookings();

  // }, []);

  const handleCreateBooking = (bookingData) => {
    console.log("Create booking button clicked with data: ", bookingData);
    setBookings([...bookings, { _id: bookings.length + 1, ...bookingData }]);
    setBookingFormVisible(false);
  };

  const handleDeleteBooking = (bookingId) => {
    console.log("Delete booking button clicked for booking id: ", bookingId);
    // delete the booking with the given id
    setBookings(bookings.filter((booking) => booking._id !== bookingId));
  };

  const handleEditBooking = (bookingId) => {
    console.log("Edit booking button clicked for booking id: ", bookingId);

    // pass the booking data to the form
    setActiveBookingData(bookings.find((booking) => booking._id === bookingId));
    console.log(activeBookingData);
    // open the modal with the form to edit the booking
    setBookingFormVisible(true);
  };

  return (
    <>
      {/* go back link */}
      <Button color="gray" className="my-4" onClick={() => navigate(-1)}>
        Go Back
      </Button>

      <div className="flex justify-evenly items-center">
        <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center">
          Bookings
        </h1>

        <Button
          color="green"
          className="my-4 flex justify-around items-center"
          onClick={() => setBookingFormVisible(true)}
        >
          <MdAssignmentAdd className="lg:mr-2 h-4 w-4" />
          <span className="hidden lg:block"> Create Booking</span>
        </Button>
      </div>

      {/* No bookings */}
      {bookings.length === 0 ? (
        <Card className="w-full flex justify-center items-center p-4">
          <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
            No bookings available
          </h1>
        </Card>
      ) : (
        <div className="flex gap-2 flex-wrap justify-start">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              bookingData={booking}
              handleDeleteBooking={handleDeleteBooking}
              handleEditBooking={handleEditBooking}
            />
          ))}
        </div>
      )}

      {/* create booking form */}
      <BookingForm
        initialData={activeBookingData}
        visible={isBookingFormVisible}
        handleClose={() => setBookingFormVisible(false)}
        onSubmit={(data) => handleCreateBooking(data)}
      />
    </>
  );
};

export default BookingsPage;
