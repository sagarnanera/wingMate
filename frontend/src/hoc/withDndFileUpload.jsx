import React, { useState } from "react";

const withDndFileUpload = (Component) => {
  return function WithDndFileUpload(props) {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      setFiles(files);
      setIsDragging(false);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
    };

    return (
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`${isDragging ? "border-2 border-dashed border-black rounded-lg" : ""} `}
      >
        <Component {...props} files={files} />
      </div>
    );
  };
};

export default withDndFileUpload;
