// higher order component to protect private routes

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  console.log("user in private routes", user);
  if (user) {
    console.log("user in private routes if", user);
    return <Component {...rest} />;
  }
  return <Navigate to="/login" state={location.pathname} />;
};

PrivateRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoutes;
