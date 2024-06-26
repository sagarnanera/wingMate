// events page, which will display all the events in the society, with create and view more functionality.

import React, { useState, useEffect } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { MdAssignmentAdd, MdOutlineKeyboardBackspace } from "react-icons/md";

import EventCard from "../components/event/EventCard";
import EventForm from "../components/event/EventForm";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../components/shared/DateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAction } from "../actions/eventAction";
import Loader from "../components/shared/Loader";

const EventsPage = () => {
  const navigate = useNavigate();
  // const [events, setEvents] = useState([
  //   {
  //     _id: "1",
  //     name: "event A",
  //     description: "some description",
  //     feesPerPerson: 1000,
  //     propertyIds: ["1", "2"],
  //     startDate: new Date("2021-10-01"),
  //     endDate: new Date("2021-10-10"),
  //   },
  //   {
  //     _id: "2",
  //     name: "event B",
  //     description: "some description",
  //     feesPerPerson: 2000,
  //     propertyIds: ["3", "4"],
  //     startDate: new Date("2021-10-11"),
  //     endDate: new Date("2021-10-20"),
  //   },
  //   {
  //     _id: "3",
  //     name: "event C",
  //     description: "some description",
  //     feesPerPerson: 3000,
  //     propertyIds: ["1", "3"],
  //     startDate: new Date("2021-10-21"),
  //     endDate: new Date("2021-10-30"),
  //   },
  //   {
  //     _id: "4",
  //     name: "event D",
  //     description: "some description",
  //     feesPerPerson: 4000,
  //     propertyIds: ["2", "4"],
  //     startDate: new Date("2021-11-01"),
  //     endDate: new Date("2021-11-10"),
  //   },
  // ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsAction({}));
  }, [dispatch]);

  const { events, loading, error } = useSelector((state) => state.event);

  const [activeEventData, setActiveEventData] = useState({});
  const [isEventFormVisible, setEventFormVisible] = useState(false);

  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });

  // TODO: implement debounce for the search filter
  const [searchFilter, setSearchFilter] = useState("");

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
    setEventFormVisible(false);
  };

  const handleDeleteEvent = (eventId) => {
    // setEvents(events.filter((event) => event._id !== eventId));
  };

  const handleDateRangeChange = (date) => {
    if (date.from === "startDate") {
      setDateFilter({ ...dateFilter, startDate: date.startDate });
    } else {
      setDateFilter({ ...dateFilter, endDate: date.endDate });
    }
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
          Error fetching events
        </h1>
        <Button className="" onClick={() => location.reload()}>
          {" "}
          Refresh page
        </Button>
      </Card>
    );
  }

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
            Events
          </h1>

          <Button
            color="green"
            className="my-4 flex justify-around items-center"
            onClick={() => setEventFormVisible(true)}
          >
            <MdAssignmentAdd className="lg:mr-2 h-4 w-4" />
            <span className="hidden lg:block">Add Event</span>
          </Button>
        </div>

        {/* filter */}
        <div className="flex justify-between flex-wrap gap-2 items-center my-2">
          <div className="w-full lg:w-[calc(50%-3rem)]">
            <Label htmlFor="search" className="text-gray-800">
              Search events
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

      {/* Display Events */}
      {events.length === 0 ? (
        <Card className="w-full flex justify-center items-center p-4 mt-4">
          <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
            No events available
          </h1>
        </Card>
      ) : (
        <div className="flex gap-2 flex-wrap justify-around mt-4">
          {events.map((event) => (
            <EventCard
              key={event._id}
              eventData={event}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
      )}

      {isEventFormVisible && (
        <EventForm
          initialData={activeEventData}
          visible={isEventFormVisible}
          handleClose={() => setEventFormVisible(false)}
          onSubmit={(data) => handleCreateEvent(data)}
        />
      )}
    </>
  );
};

export default EventsPage;
