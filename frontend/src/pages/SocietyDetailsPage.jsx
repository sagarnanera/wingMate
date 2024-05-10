// society details page, which will display all the details of the society, with edit functionality.

import React from "react";
import { Button, Card } from "flowbite-react";
import { useSelector } from "react-redux";

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SocietyDetailsPage = () => {
  const navigate = useNavigate();

  const { society: societyData } = useSelector((state) => state.society);
  const { residents } = useSelector((state) => state.resident);

  return (
    <>
      {/* society details */}

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

          <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center flex-grow -ml-16">
            Society Details
          </h1>
        </div>
      </Card>

      <Card className="my-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-medium text-gray-700">Society Name:</p>
            <p className="text-lg text-gray-900">{societyData.name}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Area:</p>
            <p className="text-lg text-gray-900">{societyData.area}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Address:</p>
            <p className="text-lg text-gray-900">{societyData.location}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Total Wings:</p>
            <p className="text-lg text-gray-900">{societyData.totalWings}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Total Properties:
            </p>
            <p className="text-lg text-gray-900">
              {societyData.totalProperties}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Total Residents:
            </p>
            <p className="text-lg text-gray-900">
              {residents?.length || societyData.totalResidents || 0}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SocietyDetailsPage;
