// wing form component for create and edit, which will take wing name, area, location, and a submit button.

import React, { useState } from "react";
import { Button, Card, FloatingLabel } from "flowbite-react";

const WingForm = ({ initialData }) => {
  const [wingData, setWingData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWingData({ ...wingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(wingData);
  };

  return (
    <Card className="w-80">
      <form onSubmit={handleSubmit}>
        <div>
          <FloatingLabel
            label="Name"
            name="name"
            value={wingData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <FloatingLabel
            label="Area"
            name="area"
            value={wingData.area}
            onChange={handleChange}
          />
        </div>
        <div>
          <FloatingLabel
            label="Location"
            name="location"
            value={wingData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit" className="btn btn-blue">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default WingForm;
