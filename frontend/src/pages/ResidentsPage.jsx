// residents page, which will display all the residents in the society.

import React, { useState, useEffect } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";

import ResidentCard from "../components/residents/ResidentCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createResidentsAction,
  getResidentsAction,
} from "../actions/residentAction";
import Loader from "../components/shared/Loader";
import ResidentsForm from "../components/residents/ResidentForm";

const ResidentsPage = () => {
  const navigate = useNavigate();

  // const [residents, setResidents] = useState([
  //   {
  //     _id: "1",
  //     name: "John Doe",
  //     email: "johndoe@wingmate.com",
  //     profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
  //   },
  //   {
  //     _id: "2",
  //     name: "Jane Doe",
  //     email: "janedoe@wingmate.com",
  //     profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
  //   },
  //   {
  //     _id: "3",
  //     name: "Alice",
  //     email: "alice@wingmate.co",
  //     profilePic: "https://xsgames.co/randomusers/avatar.php?g=female",
  //   },
  //   {
  //     _id: "4",
  //     name: "Bob",
  //     email: "bob@wingmate.co",
  //     profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
  //   },
  // ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResidentsAction({}));
  }, [dispatch]);

  const { residents, error, loading } = useSelector((state) => state.resident);
  const { user } = useSelector((state) => state.user);

  const [isResidentsFormVisible, setResidentsFormVisible] = useState(false);

  // TODO: implement debounce for the search filter
  const [searchFilter, setSearchFilter] = useState("");

  // TODO : Fetch residents from the backend

  const handleResidentDelete = (residentId) => {};

  const handleAddResidents = (data) => {
    dispatch(createResidentsAction(data));
  };

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
          Error fetching Residents
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

          <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center flex-grow -ml-16">
            Residents
          </h1>

          {user.role === "secretory" ? (
            <Button
              color="green"
              className="my-4 flex justify-around items-center"
              onClick={() => setResidentsFormVisible(true)}
            >
              <HiUserAdd className="lg:mr-2 h-4 w-4" />
              <span className="hidden lg:block">Add Residents</span>
            </Button>
          ) : null}
        </div>

        {/* filter */}
        <div className="flex justify-between flex-wrap gap-2 items-center my-2">
          <div className="w-full lg:w-[calc(50%-3rem)]">
            <Label htmlFor="search" className="text-gray-800">
              Search Residents
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
        </div>
      </Card>

      {/* Display Resiresidents */}
      {residents.length === 0 ? (
        <Card className="w-full flex justify-center items-center p-4 mt-4">
          <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
            No residents available
          </h1>
        </Card>
      ) : (
        <div className="flex gap-2 flex-wrap justify-around mt-4">
          {residents.map((resident) => (
            <ResidentCard
              key={resident._id}
              residentData={resident}
              onDelete={handleResidentDelete}
            />
          ))}
        </div>
      )}

      {isResidentsFormVisible && (
        <ResidentsForm
          visible={isResidentsFormVisible}
          handleClose={() => setResidentsFormVisible(false)}
          onSubmit={(data) => handleAddResidents(data)}
        />
      )}
    </>
  );
};

export default ResidentsPage;
