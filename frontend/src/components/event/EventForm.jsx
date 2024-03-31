// event form, which will be used to create or edit an event

import React, { useState } from "react";
import { Button, Card, FloatingLabel } from "flowbite-react";

const EventForm = ({ event, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    feesPerPerson: "",
    propertyIds: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <FloatingLabel
          variant="outlined"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="outlined"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="outlined"
          label="Fees Per Person"
          name="feesPerPerson"
          value={formData.feesPerPerson}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="outlined"
          label="Property Ids"
          name="propertyIds"
          value={formData.propertyIds}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="outlined"
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="outlined"
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default EventForm;
