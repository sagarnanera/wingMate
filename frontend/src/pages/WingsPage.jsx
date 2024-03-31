// wings page, which will display all the wings in the society, with add and delete functionality.

import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import WingCard from "../components/wing/WingCard";

const WingsPage = () => {
  // const [wings, setWings] = useState([]);

  // {
  //     "name":"wing A",
  //     "area":8000,
  //     "location":"somewhere outside society"
  //   }

  const wings = [
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
  ];

  // TODO : Fetch wings from the backend

  // useEffect(() => {
  //     const fetchWings = async () => {
  //         const response = await fetch("/api/wings");
  //         const data = await response.json();
  //         setWings(data);
  //     };

  //     fetchWings();

  // }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center">
        Wings
      </h1>
      <div className="flex gap-2 flex-wrap justify-between">
        {wings.map((wing) => (
          <WingCard key={wing._id} wingData={wing} />
        ))}
      </div>
    </>
  );
};

export default WingsPage;
