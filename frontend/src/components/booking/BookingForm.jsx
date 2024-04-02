/* eslint-disable no-unused-vars */

// booking form, which will take name, description, fees per person, property ids, start date, end date with a submit button.

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, FloatingLabel, Modal, Textarea } from "flowbite-react";

import DateRangePicker from "../shared/DateRangePicker";
import Select from "react-select";

const BookingForm = ({
  initialData,
  visible,
  source,
  handleClose,
  onSubmit,
}) => {
  const [bookingData, setBookingData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookingData);
    onSubmit(bookingData);
  };

  const handleDateRangeChange = (date) => {
    if (date.from === "startDate") {
      setBookingData({
        ...bookingData,
        startDate: date.startDate,
      });
    } else {
      setBookingData({
        ...bookingData,
        endDate: date.endDate,
      });
    }
  };

  const closeModal = () => {
    setBookingData({});
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
              value={bookingData?.name}
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
              value={bookingData?.description}
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
              value={bookingData?.feesPerPerson}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <DateRangePicker
              dateRange={{
                startDate: bookingData.startDate || "",
                endDate: bookingData.endDate || "",
              }}
              handleDateChange={handleDateRangeChange}
            />
          </div>

          {/* properties should be multi select dropdown, only editable if we are creating event, not on editing */}
          <div className="my-4">
            <Select
              options={bookingData?.propertyIds}
              isMulti
              onChange={(selectedList) => {
                setBookingData({ ...bookingData, propertyIds: selectedList });
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

BookingForm.propTypes = {
  initialData: PropTypes.object,
  visible: PropTypes.bool,
  source: PropTypes.string,
  handleClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default BookingForm;
