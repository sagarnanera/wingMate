import { FileInput, Label } from "flowbite-react";

const DragNdropFileInput = () => {
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type === "text/csv") {
      console.log("File dropped:", file.name);
      console.log("File size:", file.size);
      console.log("File type:", file.type);
      // Perform additional actions with the file here
    } else {
      console.log("Invalid file type. Only CSV files are allowed.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  return (
    <div
      className="flex w-full items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            CSV files only
          </p>
        </div>
        <FileInput id="dropzone-file" className="hidden" />
      </Label>
    </div>
  );
};

export default DragNdropFileInput;
