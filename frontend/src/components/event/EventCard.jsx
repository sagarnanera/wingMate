// event card, which will display the event details like name, description, feesPerPerson, propertyIds, startDate, endDate and view more button.

import React from "react";

import { Button, Card } from "flowbite-react";
import { MdEventAvailable } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EventCard = ({ eventData }) => {
  const navigate = useNavigate();
  return (
    <Card className="w-full mb-2 md:w-[calc(50%-0.5rem)] md:gap-2 lg:w-[calc(33%-1rem)] lg:gap-4 xl:w-[calc(25%-1.5rem)] xl:gap-6 flex items-center p-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
          {eventData.name}
        </h1>
      </div>
      <div>
        <p className="text-gray-600 mb-2">
          Description: {eventData.description}
        </p>
        <p className="text-gray-600 mb-2">
          Fees per person: {eventData.feesPerPerson}
        </p>
        <p className="text-gray-600 mb-2">
          Property Ids: {eventData.propertyIds}
        </p>
        <p className="text-gray-600 mb-2">
          Start Date: {eventData?.startDate?.toDateString()}
        </p>
        <p className="text-gray-600 mb-2">
          End Date: {eventData?.endDate?.toDateString()}
        </p>
      </div>
      {/* view more button, which will navigate to event details page */}
      <Button
        color="blue"
        className="mt-4"
        onClick={() => navigate(`/events/${eventData?._id}`)}
      >
        View More
      </Button>
    </Card>
  );
};

export default EventCard;
