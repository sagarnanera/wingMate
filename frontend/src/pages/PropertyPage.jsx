// property page, which will display all the properties in the society, with add and delete functionality.

/*
  {
    "name":"property A",
    description:"some description",
    "area":8000,
    "location":"somewhere outside society"
    rentPerDay: 1000
  }
*/

import React, { useState, useEffect } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { MdAssignmentAdd, MdOutlineKeyboardBackspace } from "react-icons/md";

import PropertyCard from "../components/property/PropertyCard";
import { useNavigate } from "react-router-dom";
import {
  createPropertyAction,
  getPropertiesAction,
} from "../actions/propertyAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import PropertyForm from "../components/property/PropertyForm";

const PropertyPage = () => {
  const navigate = useNavigate();

  // const [properties, setProperties] = useState([
  //   {
  //     _id: "1",
  //     name: "property A",
  //     area: 8000,
  //     location: "somewhere outside society",
  //     rentPerDay: 1000,
  //   },
  //   {
  //     _id: "2",
  //     name: "property B",
  //     area: 9000,
  //     location: "somewhere inside society",
  //     rentPerDay: 2000,
  //   },
  //   {
  //     _id: "3",
  //     name: "property C",
  //     area: 10000,
  //     location: "somewhere inside society",
  //     rentPerDay: 3000,
  //   },
  //   {
  //     _id: "4",
  //     name: "property D",
  //     area: 11000,
  //     location: "somewhere outside society",
  //     rentPerDay: 4000,
  //   },
  // ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertiesAction({}));
  }, [dispatch]);

  const { properties, loading, error } = useSelector((state) => state.property);
  const { user } = useSelector((state) => state.user);

  const [activePropertyData, setActivePropertyData] = useState({});
  const [isPropertyFormVisible, setPropertyFormVisible] = useState(false);

  // TODO: implement debounce for the search filter
  const [searchFilter, setSearchFilter] = useState("");

  const handleCreateProperty = (data) => {
    console.log(data);

    dispatch(createPropertyAction(data));
  };

  const handlePropertyDelete = () => {};

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
          Error fetching properties
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

          <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center  flex-grow -ml-16">
            Properties
          </h1>

          {user.role === "secretory" ? (
            <Button
              color="green"
              className="my-4 flex justify-around items-center"
              onClick={() => setPropertyFormVisible(true)}
            >
              <MdAssignmentAdd className="lg:mr-2 h-4 w-4" />
              <span className="hidden lg:block">Add Property</span>
            </Button>
          ) : null}
        </div>

        {/* filter */}
        <div className="flex justify-between flex-wrap gap-2 items-center my-2">
          <div className="w-full lg:w-[calc(50%-3rem)]">
            <Label htmlFor="search" className="text-gray-800">
              Search Properties
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

      {/* Display Properties */}
      {properties.length === 0 ? (
        <Card className="w-full flex justify-center items-center p-4 mt-4">
          <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
            No properties available
          </h1>
        </Card>
      ) : (
        <div className="flex gap-2 flex-wrap justify-around mt-4">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              propertyData={property}
              onDelete={handlePropertyDelete}
            />
          ))}
        </div>
      )}

      {isPropertyFormVisible && (
        <PropertyForm
          initialData={activePropertyData}
          visible={isPropertyFormVisible}
          handleClose={() => setPropertyFormVisible(false)}
          onSubmit={(data) => handleCreateProperty(data)}
        />
      )}
    </>
  );
};

export default PropertyPage;
