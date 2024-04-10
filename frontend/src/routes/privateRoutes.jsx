// higher order component to protect private routes

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  if (user) {
    console.log("here");
    return <Component {...rest} />;
  }
  console.log("flandsfklasdlfnad");
  return <Navigate to="/login" state={location.pathname} />;
};

PrivateRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoutes;
