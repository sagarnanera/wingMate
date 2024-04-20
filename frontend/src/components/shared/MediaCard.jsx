// media card component, for displaying media (images, video, gif) with a delete button on the top right corner of the media (just a cross icon)

import React from "react";
import { MdClose, MdModeEdit } from "react-icons/md";

const MediaCard = ({ media, mediaType, alt, index, onRemove, onEdit }) => {
  return (
    <div className="relative bg-gray-100 border border-blue-50 rounded-lg p-1">
      {mediaType === "image" ? (
        <img
          src={URL.createObjectURL(media)}
          alt={alt || "image post media"}
          className="w-32 h-32 object-contain rounded-xl"
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
        className="absolute -top-1 right-1 p-1 bg-transparent hover:bg-white rounded-full shadow-md"
        onClick={() => onRemove(index)}
      >
        <MdClose size={20} />
      </button>

      {mediaType === "image" && (
        <button
          className="absolute bottom-4 right-2 p-1 bg-transparent hover:bg-white rounded-full shadow-md"
          onClick={() => onEdit(index)}
        >
          <MdModeEdit size={20} />
        </button>
      )}
    </div>
  );
};

export default MediaCard;
