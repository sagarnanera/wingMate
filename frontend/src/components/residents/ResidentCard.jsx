// resident card component which will have resident name, email and profile pic

import React from "react";
import { Card } from "flowbite-react";

const ResidentCard = ({ residentData }) => {
  return (
    // width of card is full for small screens, (half - gap) for large screens and (1/3 - gap) for extra large screens
    <Card className="w-full md:w-[calc(50%-0.5rem)] md:gap-2 lg:w-[calc(33%-1rem)] lg:gap-4 xl:w-[calc(25%-1.5rem)] xl:gap-6 flex items-center p-4">
      <img
        src={residentData?.profilePic}
        alt={residentData?.name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h1 className="text-xl font-semibold">{residentData?.name}</h1>
        <p className="text-gray-500">{residentData?.email}</p>
      </div>
    </Card>
  );
};

export default ResidentCard;
