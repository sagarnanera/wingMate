// higher order component to protect private routes

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.user);
  if (user) {
    return <Component {...rest} />;
  }
  return <Navigate to="/login" replace />;
};

PrivateRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoutes;
