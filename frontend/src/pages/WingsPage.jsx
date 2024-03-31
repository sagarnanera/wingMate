// wings page, which will display all the wings in the society, with add and delete functionality.

import React, { useState, useEffect } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import WingCard from "../components/wing/WingCard";
import { useNavigate } from "react-router-dom";

import { MdAssignmentAdd, MdOutlineKeyboardBackspace } from "react-icons/md";

const WingsPage = () => {
  const navigate = useNavigate();

  const [wings, setWings] = useState([
    {
      _id: "1",
      name: "wing A",
      area: 8000,
      location: "somewhere outside society",
    },
    {
      _id: "2",
      name: "wing B",
      area: 9000,
      location: "somewhere inside society",
    },
    {
      _id: "3",
      name: "wing C",
      area: 10000,
      location: "somewhere inside society",
    },
    {
      _id: "4",
      name: "wing D",
      area: 11000,
      location: "somewhere outside society",
    },
  ]);

  // TODO: implement debounce for the search filter
  const [searchFilter, setSearchFilter] = useState("");

  // {
  //     "name":"wing A",
  //     "area":8000,
  //     "location":"somewhere outside society"
  //   }

  // TODO : Fetch wings from the backend

  // useEffect(() => {
  //     const fetchWings = async () => {
  //         const response = await fetch("/api/wings");
  //         const data = await response.json();
  //         setWings(data);
  //     };

  //     fetchWings();

  // }, []);

  const handleWingDelete = (wingId) => {};

  return (
    <>
      {/* Header section */}
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
            wings
          </h1>

          <Button
            color="green"
            className="my-4 flex justify-around items-center"
            // onClick={() => setPropertyFormVisible(true)}
          >
            <MdAssignmentAdd className="lg:mr-2 h-4 w-4" />
            <span className="hidden lg:block">Add Wing</span>
          </Button>
        </div>

        {/* filter */}
        <div className="flex justify-between flex-wrap gap-2 items-center my-2">
          <div className="w-full lg:w-[calc(50%-3rem)]">
            <Label htmlFor="search" className="text-gray-800">
              Search wings
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

          {/* <div className="flex justify-center items-center gap-2 w-full lg:w-[calc(50%-3rem)]">
            <DateRangePicker
              dateRange={dateFilter}
              handleDateChange={handleDateRangeChange}
            />
          </div> */}
        </div>
      </Card>

      {/* Display Resiwings */}
      {wings.length === 0 ? (
        <Card className="w-full flex justify-center items-center p-4 mt-4">
          <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
            No wings available
          </h1>
        </Card>
      ) : (
        <div className="flex gap-2 flex-wrap justify-between mt-4">
          {wings.map((wing) => (
            <WingCard
              key={wing._id}
              wingData={wing}
              onDelete={handleWingDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default WingsPage;
