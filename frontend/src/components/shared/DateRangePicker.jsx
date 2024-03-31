import React from "react";
import PropTypes from "prop-types";
import { Datepicker, Label } from "flowbite-react";

const DateRangePicker = ({ dateRange, handleDateChange, rest }) => {
  return (
    <>
      <div>
        <Label htmlFor="start-date">Start Date</Label>
        <Datepicker
          {...rest}
          title="Start Date"
          id="start-date"
          sizing="md"
          className="w-full"
          value={dateRange.startDate || "dd/mm/yyyy"}
          onSelectedDateChanged={(date) =>
            handleDateChange({
              from: "startDate",
              startDate: date.toLocaleDateString(),
            })
          }
          maxDate={dateRange.endDate ? new Date(dateRange.endDate) : undefined}
        />
      </div>
      <p className="mt-4">to</p>
      <div>
        <Label htmlFor="end-date">End Date</Label>
        <Datepicker
          {...rest}
          title="End Date"
          id="end-date"
          sizing="md"
          className="w-full"
          value={dateRange.endDate || "dd/mm/yyyy"}
          onSelectedDateChanged={(date) =>
            handleDateChange({
              from: "endDate",
              endDate: date.toLocaleDateString(),
            })
          }
          minDate={
            dateRange.startDate ? new Date(dateRange.startDate) : undefined
          }
        />
      </div>
    </>
  );
};

DateRangePicker.propTypes = {
  dateRange: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  rest: PropTypes.object,
};

export default DateRangePicker;
