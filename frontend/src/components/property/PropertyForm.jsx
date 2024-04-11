// property form, which will be used to create or edit an property
/* eslint-disable no-unused-vars */

// property form, which will take name, description, area and location with a submit button.

/*
  {
    "name":"property A",
    description:"some description",
    "area":8000,
    "location":"somewhere outside society"
    rentPerDay: 1000
  }
*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, FloatingLabel, Modal, Textarea } from "flowbite-react";

import DateRangePicker from "../shared/DateRangePicker";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loader from "../shared/Loader";

const PropertyForm = ({
  initialData,
  visible,
  source,
  handleClose,
  onSubmit,
}) => {
  const [propertyData, setPropertyData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const { loading } = useSelector((state) => state.property);

  const handleSubmit = () => {
    // validation

    onSubmit(propertyData);
  };

  const closeModal = () => {
    setPropertyData({});
    handleClose();
  };

  return (
    <Modal show={visible} onClose={closeModal}>
      <Modal.Header>
        {source === "edit" ? "Edit property details" : "Create property"}
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="property name"
              type="text"
              name="name"
              value={propertyData?.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <Textarea
              variant="outlined"
              label="Property description"
              type="text"
              name="description"
              placeholder="property description ?"
              value={propertyData?.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="Property area"
              type="number"
              name="area"
              value={propertyData?.feesPerPerson}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="Rent per day"
              type="number"
              name="rentPerDay"
              value={propertyData?.rentPerDay}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="Property location"
              type="text"
              name="location"
              value={propertyData?.feesPerPerson}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full flex justify-evenly items-center">
          <Button
            type="submit"
            color="red"
            className="w-1/2 mx-1"
            onClick={closeModal}
          >
            cancel
          </Button>
          <Button
            type="submit"
            className="w-1/2 mx-1"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader variant={"tiny"} size={"lg"} /> : "Submit"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

PropertyForm.propTypes = {
  initialData: PropTypes.object,
  visible: PropTypes.bool,
  source: PropTypes.string,
  handleClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default PropertyForm;
