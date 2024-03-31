// events page, which will display all the events in the society, with create and view more functionality.

import React, { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import { MdAssignmentAdd } from "react-icons/md";

import EventCard from "../components/event/EventCard";
import EventForm from "../components/event/EventForm";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([
    {
      _id: "1",
      name: "event A",
      description: "some description",
      feesPerPerson: 1000,
      propertyIds: ["1", "2"],
      startDate: new Date("2021-10-01"),
      endDate: new Date("2021-10-10"),
    },
    {
      _id: "2",
      name: "event B",
      description: "some description",
      feesPerPerson: 2000,
      propertyIds: ["3", "4"],
      startDate: new Date("2021-10-11"),
      endDate: new Date("2021-10-20"),
    },
    {
      _id: "3",
      name: "event C",
      description: "some description",
      feesPerPerson: 3000,
      propertyIds: ["1", "3"],
      startDate: new Date("2021-10-21"),
      endDate: new Date("2021-10-30"),
    },
    {
      _id: "4",
      name: "event D",
      description: "some description",
      feesPerPerson: 4000,
      propertyIds: ["2", "4"],
      startDate: new Date("2021-11-01"),
      endDate: new Date("2021-11-10"),
    },
  ]);
  const [activeEventData, setActiveEventData] = useState({});
  const [isEventFormVisible, setEventFormVisible] = useState(false);

  // {
  //     "name":"event A",
  //     "description":"some description",
  //     "feesPerPerson":1000,
  //     "propertyIds":["1","2"],
  //     "startDate":"2021-10-01",
  //     "endDate":"2021-10-10"
  //   }

  // useEffect(() => {
  //     const fetchEvents = async () => {
  //         const response = await fetch("/api/events");
  //         const data = await response.json();
  //         setEvents(data);
  //     };

  //     fetchEvents();

  // }, []);

  const handleCreateEvent = (eventData) => {
    setEvents([...events, eventData]);
    setEventFormVisible(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event._id !== eventId));
  };

  return (
    <>
      <div className="flex justify-evenly items-center">
        <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center">
          Events
        </h1>

        <Button
          color="green"
          className="my-4 flex justify-around items-center"
          onClick={() => setEventFormVisible(true)}
        >
          <MdAssignmentAdd className="lg:mr-2 h-4 w-4" />
          <span className="hidden lg:block"> Create Event</span>
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap justify-between">
        {events.map((event) => (
          <EventCard
            key={event._id}
            eventData={event}
            onDelete={handleDeleteEvent}
          />
        ))}
      </div>
      {isEventFormVisible && (
        <EventForm
          onCreate={handleCreateEvent}
          onCancel={() => setEventFormVisible(false)}
        />
      )}
    </>
  );
};

export default EventsPage;
