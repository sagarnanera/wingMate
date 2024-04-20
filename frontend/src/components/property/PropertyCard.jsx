// property card, which will display the property details like name, area, location, rent per day and a delete + edit button.

import React from "react";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline, MdEditCalendar } from "react-icons/md";
import { deletePropertyAction } from "../../actions/propertyAction";

const PropertyCard = ({ propertyData }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleEditProperty = (propertyId) => {
    console.log("edit property with id: ", propertyId);

    // open the modal with the form to edit the property
  };

  const handleDeleteProperty = async (propertyId) => {
    dispatch(deletePropertyAction(propertyId));
  };

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
      {user?.role === "secretory" ? (
        <div className="flex gap-2 justify-between items-center mt-4">
          <Button
            color="red"
            onClick={() => handleDeleteProperty(propertyData?._id)}
          >
            <MdDeleteOutline className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={() => handleEditProperty(propertyData?._id)}>
            <MdEditCalendar className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      ) : null}
      {/* <Button
        color="blue"
        className="mt-4"
        onClick={() => navigate(`/properties/${propertyData?._id}`)}
      >
        View More
      </Button> */}
    </Card>
  );
};

export default PropertyCard;
