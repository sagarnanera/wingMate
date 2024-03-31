// residents page, which will display all the residents in the society.

import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import ResidentCard from "../components/residents/ResidentCard";

const ResidentsPage = () => {
  // const [residents, setResidents] = useState([]);

  const residents = [
    {
      _id: "1",
      name: "John Doe",
      email: "johndoe@wingmate.com",
      profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
    },
    {
      _id: "2",
      name: "Jane Doe",
      email: "janedoe@wingmate.com",
      profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
    },
    {
      _id: "3",
      name: "Alice",
      email: "alice@wingmate.co",
      profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
    },
    {
      _id: "4",
      name: "Bob",
      email: "bob@wingmate.co",
      profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
    },
  ];

  // TODO : Fetch residents from the backend

  // useEffect(() => {
  //     const fetchResidents = async () => {
  //         const response = await fetch("/api/residents");
  //         const data = await response.json();
  //         setResidents(data);
  //     };

  //     fetchResidents();
  // }, []);

  return (
    <>
      <h1
        className="
        text-3xl
        font-semibold
        text-gray-800
        my-4
        justify-center
        text-center
      "
      >
        Residents
      </h1>
      <div className="flex gap-2 flex-wrap justify-between">
        {residents.map((resident) => (
          <ResidentCard key={resident._id} residentData={resident} />
        ))}
      </div>
    </>
  );
};

export default ResidentsPage;
