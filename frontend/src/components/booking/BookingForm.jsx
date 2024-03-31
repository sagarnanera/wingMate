// booking form, which will take name, description, fees per person, property ids, start date, end date with a submit button.

import React, { useState } from "react";
import {
  Button,
  Card,
  FloatingLabel,
  Modal,
  Select,
  Textarea,
} from "flowbite-react";

import { Multiselect } from "multiselect-react-dropdown";
import { DateRange, DateRangePicker } from "react-date-range";

const BookingForm = ({
  initialData,
  visible,
  source,
  handleClose,
  onSubmit,
}) => {
  const [bookingData, setBookingData] = useState(initialData);
  const [showDateRange, setShowDateRange] = useState(false); // Add state variable for DateRange visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookingData);
    onSubmit(bookingData);
  };

  const handleDateRangeClick = () => {
    setShowDateRange(!showDateRange); // Toggle DateRange visibility
  };

  const handleDateRangeChange = (item) => {
    console.log(item);
    setShowDateRange(false); // Hide DateRange after selection
    setBookingData({
      ...bookingData,
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
    });
  };

  const closeModal = () => {
    setBookingData({});
    setShowDateRange(false);
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

          <FloatingLabel
            variant="outlined"
            label="Booking dates"
            type="text"
            value={`${bookingData?.startDate?.toDateString() || "dd/mm/yyyy"} 
                   to   
                ${bookingData?.endDate?.toDateString() || "dd/mm/yyyy"}`}
            onClick={handleDateRangeClick}
            readOnly={true}
          />

          <div className="date-range-picker-wrapper">
            {showDateRange && (
              <DateRange
                editableDateInputs={true}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[
                  {
                    startDate: bookingData?.startDate,
                    endDate: bookingData?.endDate,
                    key: "selection",
                  },
                ]}
              />
            )}
          </div>

          {/* properties should be multi select dropdown, only editable if we are creating event, not on editing */}
          <div className="my-4">
            <Multiselect
              isObject={false}
              placeholder="Select properties"
              options={bookingData?.propertyIds}
              selectedValues={bookingData?.propertyIds}
              displayValue="name"
              onSelect={(selectedList) => {
                console.log(selectedList);
              }}
              onRemove={(selectedList) => {
                console.log(selectedList);
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

export default BookingForm;
