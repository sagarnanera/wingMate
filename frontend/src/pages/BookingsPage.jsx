/* eslint-disable no-unused-vars */
// booking page, which will display all the bookings in the society, with create and delete functionality.

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Card, Label, TextInput } from "flowbite-react";
import { MdAssignmentAdd, MdOutlineKeyboardBackspace } from "react-icons/md";
import BookingCard from "../components/booking/BookingCard";
import BookingForm from "../components/booking/BookingForm";
import DateRangePicker from "../components/shared/DateRangePicker";

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

  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });

  // TODO: implement debounce for the search filter
  const [searchFilter, setSearchFilter] = useState("");

  // const fetchBookings = useCallback(async () => {
  //   try {
  //     let url = "/api/bookings";
  //     if (searchFilter || dateFilter.startDate || dateFilter.endDate) {
  //       url += "?";
  //       if (searchFilter) {
  //         url += `searchFilter=${encodeURIComponent(searchFilter)}&`;
  //       }
  //       if (dateFilter.startDate) {
  //         url += `startDate=${encodeURIComponent(dateFilter.startDate)}&`;
  //       }
  //       if (dateFilter.endDate) {
  //         url += `endDate=${encodeURIComponent(dateFilter.endDate)}&`;
  //       }
  //     }
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setBookings(data);
  //     } else {
  //       console.error("Failed to fetch bookings");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching bookings:", error);
  //   }
  // }, [searchFilter, dateFilter]);

  // Fetch bookings from the backend
  // useEffect(() => {
  //   // TODO: fetch the booking based on the filters
  //   fetchBookings();
  // }, [searchFilter, dateFilter, fetchBookings]);

  // useEffect(() => {
  //     fetchBookings();
  // }, []);

  const handleCreateBooking = (bookingData) => {
    setBookings([...bookings, { _id: bookings.length + 1, ...bookingData }]);
    setBookingFormVisible(false);
  };

  const handleDeleteBooking = (bookingId) => {
    // delete the booking with the given id
    setBookings(bookings.filter((booking) => booking._id !== bookingId));
  };

  const handleEditBooking = (bookingId) => {
    // pass the booking data to the form
    setActiveBookingData(bookings.find((booking) => booking._id === bookingId));
    console.log(activeBookingData);
    // open the modal with the form to edit the booking
    setBookingFormVisible(true);
  };

  const handleDateRangeChange = (date) => {
    if (date.from === "startDate") {
      setDateFilter({ ...dateFilter, startDate: date.startDate });
    } else {
      setDateFilter({ ...dateFilter, endDate: date.endDate });
    }
  };

  return (
    <>
      {/* header section */}
      <Card
        theme={{
          root: {
            children: "flex h-full flex-col justify-center gap-4 p-3",
          },
        }}
      >
        <div className="flex justify-between items-center gap-2">
          <Button color="gray" className="my-4" onClick={() => navigate(-1)}>
            <MdOutlineKeyboardBackspace className="lg:mr-2 h-4 w-4" />
            <span className="hidden lg:block">Back</span>
          </Button>

          <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center">
            Bookings
          </h1>

          <Button
            color="green"
            className="my-4 flex justify-around items-center"
            onClick={() => setBookingFormVisible(true)}
          >
            <MdAssignmentAdd className="lg:mr-2 h-4 w-4" />
            <span className="hidden lg:block">Create Booking</span>
          </Button>
        </div>

        {/* filter */}
        <div className="flex justify-between flex-wrap gap-2 items-center my-2">
          <div className="w-full lg:w-[calc(50%-3rem)]">
            <Label htmlFor="search" className="text-gray-800">
              Search bookings
            </Label>

            <TextInput
              id="search"
              variant="outlined"
              type="text"
              sizing="md"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center gap-2 w-full lg:w-[calc(50%-3rem)]">
            <DateRangePicker
              dateRange={dateFilter}
              handleDateChange={handleDateRangeChange}
            />
          </div>
        </div>
      </Card>

      {/* Display Bookings */} 
      {bookings.length === 0 ? (
        <Card className="w-full flex justify-center items-center p-4 mt-4">
          <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
            No bookings available
          </h1>
        </Card>
      ) : (
        <div className="flex gap-2 flex-wrap justify-between mt-4">
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
