import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import UserCard from "../UserCard";

const UploadCSVComponent = () => {
  const [csvData, setCsvData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const parseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const handleCsvUpload = (data, fileInfo, originalFile) => {
    console.log("Data:", data);
    console.log("FileInfo:", fileInfo);
    console.log("OriginalFile:", originalFile);
    setCsvData(data);
  };

  const handleUpdateData = (index, updatedValue) => {
    const newData = [...updatedData];
    newData[index] = updatedValue;
    setUpdatedData(newData);
  };

  const handleSubmit = () => {
    console.log("Updated data:", updatedData);
  };

  return (
    <div>
      <CSVReader onFileLoaded={handleCsvUpload} parserOptions={parseOptions} />
      {csvData.map((rowData, index) => (
        <UserCard
          key={index}
          data={rowData}
          onUpdate={(updatedValue) => handleUpdateData(index, updatedValue)}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UploadCSVComponent;
