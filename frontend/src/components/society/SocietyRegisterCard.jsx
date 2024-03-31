import React from "react";
import { Button, Card, Checkbox, FloatingLabel } from "flowbite-react";
import { Link } from "react-router-dom";

const SocietyRegisterCard = () => {
  return (
    <Card className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg sm:p-0 sm:m-2 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Society registration
      </h1>
      {/* Society Details Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Society Details
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="mt-2">
            <FloatingLabel
              variant="outlined"
              label="Society Name"
              id="societyName"
              className="rounded-lg"
              // placeholder="Enter society name"
              required
            />
          </div>
          <div className="mt-2">
            <FloatingLabel
              variant="outlined"
              label="Society Area"
              type="number"
              id="area"
              className="rounded-lg"
              // placeholder="Enter area"
              required
            />
          </div>
        </div>
        <div className="mt-2">
          <FloatingLabel
            variant="outlined"
            label="Location"
            id="location"
            className="rounded-lg"
            // placeholder="Enter location"
            required
          />
        </div>
      </div>
      {/* Secretary Details Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Secretary Details
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="mt-2">
            <FloatingLabel
              variant="outlined"
              label="Secretory name"
              id="secretaryName"
              className="rounded-lg"
              // placeholder="Enter secretary name"
              required
            />
          </div>
          <div className="mt-2">
            <FloatingLabel
              variant="outlined"
              label="Secretory email"
              id="secretaryEmail"
              className="rounded-lg"
              // placeholder="name@company.com"
              required
            />
          </div>
          <div className="mt-2">
            <FloatingLabel
              variant="outlined"
              label="Password"
              id="password"
              className="rounded-lg"
              // placeholder="••••••••"
              required
            />
          </div>
          <div className="mt-2">
            <FloatingLabel
              variant="outlined"
              label="Contact number"
              id="contact"
              className="rounded-lg"
              // placeholder="Enter contact number"
              required
            />
          </div>
        </div>
      </div>
      {/* Terms and Register Button */}
      <div className="flex items-center mt-4">
        <Checkbox
          id="terms"
          className="ml-1 border-gray-300 rounded bg-gray-50 dark:bg-gray-700"
          required
        />
        <label
          htmlFor="terms"
          className="ml-3 text-sm text-gray-500 dark:text-gray-300"
        >
          I agree to the terms and conditions
        </label>
      </div>
      <Button
        type="submit"
        className="w-full rounded-lg text-sm px-5 py-2.5 text-center"
        variant="primary"
      >
        Register
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login
        </Link>
      </p>
    </Card>
  );
};

export default SocietyRegisterCard;
