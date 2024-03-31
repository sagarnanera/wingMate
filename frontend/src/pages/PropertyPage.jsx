// property page, which will display all the properties in the society, with add and delete functionality.

import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";

import PropertyCard from "../components/property/PropertyCard";

const PropertyPage = () => {
  // const [properties, setProperties] = useState([]);

  // {
  //     "name":"property A",
  //     "area":8000,
  //     "location":"somewhere outside society"
  //   }

  const properties = [
    {
      _id: "1",
      name: "property A",
      area: 8000,
      location: "somewhere outside society",
      rentPerDay: 1000,
    },
    {
      _id: "2",
      name: "property B",
      area: 9000,
      location: "somewhere inside society",
      rentPerDay: 2000,
    },
    {
      _id: "3",
      name: "property C",
      area: 10000,
      location: "somewhere inside society",
      rentPerDay: 3000,
    },
    {
      _id: "4",
      name: "property D",
      area: 11000,
      location: "somewhere outside society",
      rentPerDay: 4000,
    },
  ];

  // TODO : Fetch properties from the backend

  // useEffect(() => {
  //     const fetchProperties = async () => {
  //         const response = await fetch("/api/properties");
  //         const data = await response.json();
  //         setProperties(data);
  //     };

  //     fetchProperties();

  // }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center">
        Properties
      </h1>
      <div className="flex flex-wrap gap-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} propertyData={property} />
        ))}
      </div>
    </>
  );
};

export default PropertyPage;
