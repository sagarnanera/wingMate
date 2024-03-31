// wing card, which will display the wing details like name, area, location, and a delete + edit button.

import React from "react";
import { Button, Card } from "flowbite-react";

const WingCard = ({ wingData }) => {
  return (
    <Card className="w-full md:w-[calc(50%-0.5rem)] md:gap-2 lg:w-[calc(33%-1rem)] lg:gap-4 xl:w-[calc(25%-1.5rem)] xl:gap-6 flex items-center p-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
          {wingData.name}
        </h1>
      </div>
      <div>
        <p>Area: {wingData.area}</p>
        <p>Location: {wingData.location}</p>
      </div>
      <div className="flex justify-between items-center">
        <Button className="btn btn-red" variant="primary">
          Delete
        </Button>
        <Button className="btn btn-blue" variant="secondary">
          Edit
        </Button>
      </div>
    </Card>
  );
};

export default WingCard;
