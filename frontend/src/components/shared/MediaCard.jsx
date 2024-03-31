// media card component, for displaying media (images, video, gif) with a delete button on the top right corner of the media (just a cross icon)

import React from "react";
import { MdClose } from "react-icons/md";

const MediaCard = ({ media, mediaType, alt, index, onRemove }) => {
  return (
    <div className="relative">
      {mediaType === "image" ? (
        <img
          src={URL.createObjectURL(media)}
          alt={alt || "image post media"}
          className="w-32 h-32 object-contain rounded-lg"
        />
      ) : mediaType === "video" ? (
        <video
          src={URL.createObjectURL(media)}
          alt={alt || "video post media"}
          className="w-32 h-32 object-contain rounded-lg"
          controls
        />
      ) : mediaType === "gif" ? (
        <img
          src={URL.createObjectURL(media)}
          alt={alt || "gif post media"}
          className="w-32 h-32 object-contain rounded-lg"
        />
      ) : null}
      <button
        className="absolute top-2 right-2 p-1 bg-transparent hover:bg-white rounded-full shadow-md"
        onClick={() => onRemove(index)}
      >
        <MdClose size={20} />
      </button>
    </div>
  );
};

export default MediaCard;