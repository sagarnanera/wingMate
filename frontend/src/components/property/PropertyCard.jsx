// property card, which will display the property details like name, area, location, rent per day and a delete + edit button.

import React from "react";
import { Button, Card } from "flowbite-react";

const PropertyCard = ({ propertyData }) => {
  return (
    <Card className="w-full md:w-[calc(50%-0.5rem)] md:gap-2 lg:w-[calc(33%-1rem)] lg:gap-4 xl:w-[calc(25%-1.5rem)] xl:gap-6 flex items-center p-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
          {propertyData.name}
        </h1>
      </div>
      <div>
        <p>Area: {propertyData.area}</p>
        <p>Location: {propertyData.location}</p>
        <p>Rent per day: {propertyData.rentPerDay}</p>
      </div>
      <div className="flex justify-between items-center">
        <Button variant="primary">Delete</Button>
        <Button variant="secondary">Edit</Button>
      </div>
    </Card>
  );
};

export default PropertyCard;
