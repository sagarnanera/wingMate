// logout component

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/request";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../actions/authAction";

const Logout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");

    // const logout = async (_) => await post("/auth/logout");

    // logout();

    dispatch(logoutAction());

    // navigate("/login");
  }, [dispatch]);

  

  return (
    <div>
      <h1>Logging out...... </h1>
    </div>
  );
};

export default Logout;
