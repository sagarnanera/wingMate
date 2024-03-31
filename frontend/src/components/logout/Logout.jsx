// logout component

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, []);

  return (
    <div>
      <h1>Logging out...... </h1>
    </div>
  );
};

export default Logout;
