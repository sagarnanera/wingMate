/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Card, Button } from "flowbite-react"; // Import Flowbite components

const UserCard = ({ data, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState([...data]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(updatedData);
    setIsEditing(false);
  };

  const handleChange = (index, newValue) => {
    const newData = [...updatedData];
    newData[index] = newValue;
    setUpdatedData(newData);
  };

  return (
    <Card className="bg-white rounded shadow p-4">
      {isEditing ? (
        <>
          {updatedData.map((rowData, index) => (
            <div key={index} className="mb-2">
              <input
                key={index}
                type="text"
                value={rowData}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border border-gray-300 rounded p-1 mb-2 w-full"
              />
            </div>
          ))}
          <Button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          {updatedData.map((rowData, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold">
                {index === 2 ? "Date: " : ""}
              </span>
              {index === 2 ? new Date(rowData).toLocaleDateString() : rowData}
            </div>
          ))}
          <Button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </Button>
        </>
      )}
    </Card>
  );
};

export default UserCard;
