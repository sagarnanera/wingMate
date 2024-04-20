// loader component

import React from "react";
import { Spinner } from "flowbite-react";
import PropTypes from "prop-types";

const Loader = ({ size, variant }) => {
  if (variant === "tiny") {
    return <Spinner aria-label="loading...." size={size} />;
  }

  return (
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  );
};


Loader.prototype = {
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default Loader;
