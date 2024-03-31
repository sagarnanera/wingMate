// higher order component to protect private routes

import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  // const { user } = useSelector((state) => state.user);
  const user = { userName: "@johndoe" };
  if (user) {
    return <Component {...rest} />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoutes;
