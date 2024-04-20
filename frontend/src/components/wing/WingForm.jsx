// wing form component for create and edit, which will take wing name, area, location, and a submit button.

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import PropTypes from "prop-types";

const WingForm = ({ initialData, handleClose, visible, source, onSubmit }) => {
  const [wingData, setWingData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWingData({ ...wingData, [name]: value });
  };

  const handleSubmit = () => {
    // validation

    console.log(wingData);

    onSubmit(wingData);
  };

  const closeModal = () => {
    setWingData({});
    handleClose();
  };

  return (
    <Modal show={visible} onClose={closeModal}>
      <Modal.Header>
        {source === "edit" ? "Edit wing details" : "Add wing"}
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="Wing Name"
              type="text"
              name="name"
              onChange={handleChange}
              required
              value={wingData.name}
            />
          </div>
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="Wing Area"
              type="number"
              name="area"
              value={wingData.area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="Wing Location"
              type="text"
              name="location"
              value={wingData.location}
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
          <Button type="submit" className="w-1/2 mx-1" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

// prop validation
WingForm.prototype = {
  initialData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  source: PropTypes.string,
};

export default WingForm;
