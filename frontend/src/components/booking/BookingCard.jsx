// booking card, which will display the booking details like property name, description, feesPerPerson, propertyIds, startDate, endDate and a delete + edit button.

// {
//     "name": "some event 2",
//     "description": "this is description of some event 2",
//     "feesPerPerson": 400,
//     "properties": [
          //   {
          //     "_id": "0c13d0c2-b379-4366-ad93-2b54254f7df9",
          //     "name": "terrace of wing A",
          //     "wingId": "4918bf3b-f89b-4a57-a78b-064e29123875",
          //     "societyId": "8426a679-6a38-416a-a6d8-4e9ccadb8744",
          //     "area": 12200,
          //     "location": "somewhere in world",
          //     "rentPerDay": 2000
          // },
//     ],
//     "startDate": "2024-04-04T18:30:00.805Z",
//     "endDate": "2024-04-10T18:30:00.805Z"
//   }

import React from "react";
import { Button, Card } from "flowbite-react";

import { MdDeleteOutline, MdEditCalendar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formateDate } from "../../utils/formateDate";

const BookingCard = ({
  bookingData,
  handleEditBooking,
  handleDeleteBooking,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="w-full mb-2 md:w-[calc(50%-0.5rem)] md:gap-2 lg:w-[calc(33%-1rem)] lg:gap-4 xl:w-[calc(25%-1.5rem)] xl:gap-6 flex items-center p-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
          {bookingData.name}
        </h1>
      </div>
      <div>
        <p className="text-gray-600 mb-2">Description: {bookingData.reason}</p>
        <p className="text-gray-600 mb-2">
          Total rent: {bookingData.totalRent}
        </p>
        <p className="text-gray-600 mb-2">
          Property(s) booked: {bookingData?.propertyIds?.length}
        </p>
        {/* booked property names
        <p className="text-gray-600 mb-2">
          Property(s):{" "}
          {bookingData?.properties?.map((property) => property.name).join(", ")}
        </p> */}
        <p className="text-gray-600 mb-2">
          Start Date: {formateDate(bookingData?.startDate)}
        </p>
        <p className="text-gray-600 mb-2">
          End Date: {formateDate(bookingData?.endDate)}
        </p>
      </div>
      {/* <div className="flex gap-2 justify-between items-center mt-4">
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
      </div> */}

      {/* view more button, which will navigate to booking details page */}
      <Button
        color="blue"
        className="mt-4"
        onClick={() => navigate(`/bookings/${bookingData?._id}`)}
      >
        View More
      </Button>
    </Card>
  );
};

export default BookingCard;
