// event form, which will be used to create or edit an event
/* eslint-disable no-unused-vars */

// event form, which will take name, description, fees per person, property ids, start date, end date with a submit button.

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, FloatingLabel, Modal, Textarea } from "flowbite-react";

import DateRangePicker from "../shared/DateRangePicker";
import Select from "react-select";

const EventForm = ({ initialData, visible, source, handleClose, onSubmit }) => {
  const [eventData, setEventData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(eventData);
    onSubmit(eventData);
  };

  const handleDateRangeChange = (date) => {
    if (date.from === "startDate") {
      setEventData({
        ...eventData,
        startDate: date.startDate,
      });
    } else {
      setEventData({
        ...eventData,
        endDate: date.endDate,
      });
    }
  };

  const closeModal = () => {
    setEventData({});
    handleClose();
  };

  return (
    <Modal show={visible} onClose={closeModal}>
      <Modal.Header>
        {source === "edit" ? "Edit event details" : "Create event"}
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="event name"
              type="text"
              name="name"
              value={eventData?.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <Textarea
              variant="outlined"
              label="Description"
              type="text"
              name="description"
              placeholder="event description ?"
              value={eventData?.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <FloatingLabel
              variant="outlined"
              label="Fees per person"
              type="number"
              name="feesPerPerson"
              value={eventData?.feesPerPerson}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <DateRangePicker
              dateRange={{
                startDate: eventData.startDate || "",
                endDate: eventData.endDate || "",
              }}
              handleDateChange={handleDateRangeChange}
            />
          </div>

          {/* properties should be multi select dropdown, only editable if we are creating event, not on editing */}
          <div className="my-4">
            <Select
              options={eventData?.propertyIds}
              isMulti
              onChange={(selectedList) => {
                setEventData({ ...eventData, propertyIds: selectedList });
              }}
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

EventForm.propTypes = {
  initialData: PropTypes.object,
  visible: PropTypes.bool,
  source: PropTypes.string,
  handleClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default EventForm;
