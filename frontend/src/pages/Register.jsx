// register page using tailwind and flowbite-react

import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import SocietyRegisterCard from "../components/society/SocietyRegisterCard";
import { useSelector } from "react-redux";

const Register = () => {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();

  if (user) {
    console.log(location);
    return <Navigate to={location.state || "/"} />;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-col items-center justify-center mx-auto p-2 lg:p-0">
      <Link
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          src="/assets/wingMate-icon.png"
          alt="logo"
          className="w-12 h-10 mr-2"
        />
        wingMate
      </Link>
      <SocietyRegisterCard />
    </section>
  );
};

export default Register;
