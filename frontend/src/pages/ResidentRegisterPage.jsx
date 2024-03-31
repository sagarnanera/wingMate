// resident register page

import React, { useEffect } from "react";
import ResidentRegisterCard from "../components/residents/ResidentRegisterCard";
import { Link, useSearchParams } from "react-router-dom";

const ResidenceRegisterPage = () => {
  // /auth/register?invitationToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NpZXR5SWQiOiI4NDI2YTY3OS02YTM4LTQxNmEtYTZkOC00ZTljY2FkYjg3NDQiLCJfaWQiOiIzZTY2MmFjNy0xYjU5LTQ4ZDItYmQ5ZS0xYjcyODE2OTRlZjEiLCJpYXQiOjE3MDg2MDYxNjgsImV4cCI6MTcwOTQ3MDE2OH0.allBtjEALcuOFLUruZOSZGoYJor6D1Qc6VaCWTOadj8
  const [searchParams, _] = useSearchParams();
  const token = searchParams.get("invitationToken");

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
      <ResidentRegisterCard token={token} />
    </section>
  );
};

export default ResidenceRegisterPage;
