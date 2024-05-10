import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, FloatingLabel, Modal } from "flowbite-react";
import {
  MdOutlineAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

import { showToast } from "../../utils/showToast";

const ResidentsForm = ({ visible, handleClose, onSubmit }) => {
  const [residentData, setResidentData] = useState([{ email: "" }]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...residentData];
    updatedData[index][name] = value;
    setResidentData(updatedData);
  };

  const handleAddField = () => {
    setResidentData([...residentData, { email: "" }]);
  };

  const handleRemoveField = (index) => {
    const updatedData = [...residentData];
    updatedData.splice(index, 1);
    setResidentData(updatedData);
  };

  const handleSubmit = () => {
    // validation, residentData should not be empty and should be array of valid emails

    if (!residentData || residentData.length === 0) {
      showToast("Please enter at least one email", "error");
      return;
    }

    const isValid = residentData.every((resident) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resident.email);
    });

    if (!isValid) {
      showToast("Please enter valid emails", "error");
      return;
    }

    // convert residentData to array of emails, distinct emails
    const residentsEmail = Array.from(
      new Set(residentData.map((resident) => resident.email))
    );

    onSubmit({ residents: residentsEmail });  
  };

  const closeModal = () => {
    setResidentData([{ email: "" }]);
    handleClose();
  };

  return (
    <Modal show={visible} onClose={closeModal}>
      <Modal.Header>Add residents</Modal.Header>
      <Modal.Body>
        {residentData.map((resident, index, data) => (
          <div className="flex justify-between items-center" key={index}>
            <div className="flex-grow mr-4 max-w-[80%]">
              <FloatingLabel
                className="mb-2"
                name="email"
                value={resident.email}
                onChange={(e) => handleChange(e, index)}
                variant="outlined"
                label="Resident's email"
                type="text"
                required
              />
            </div>
            <div className="flex gap-2">
              {data.length > 0 && (
                <Button
                  onClick={() => handleRemoveField(index)}
                  className="p-0 m-0 ml-2 mb-2"
                  color={"transparent"}
                  theme={{
                    inner: {
                      base: "p-0 m-0 bg-transparent",
                    },
                    size: {
                      md: "p-0 m-0",
                    },
                  }}
                >
                  <MdRemoveCircleOutline className="h-6 w-6" />
                </Button>
              )}
              <Button
                onClick={handleAddField}
                className="p-0 m-0 mb-2"
                color={"transparent"}
                theme={{
                  inner: {
                    base: "p-0 m-0 bg-transparent",
                  },
                  size: {
                    md: "p-0 m-0",
                  },
                }}
              >
                <MdOutlineAddCircleOutline className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} className="mr-2">
          Add
        </Button>
        <Button onClick={closeModal} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ResidentsForm.propTypes = {
  visible: PropTypes.bool,
  handleClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

ResidentsForm.defaultProps = {
  visible: false,
  handleClose: () => {},
  onSubmit: () => {},
};

export default ResidentsForm;
