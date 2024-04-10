import React, { useState } from "react";
import { Button, Card, Checkbox, FloatingLabel } from "flowbite-react";
import { Link } from "react-router-dom";
import { societyRegisterAction } from "../../actions/authAction";
import { showToast } from "../../utils/showToast";
import { useDispatch } from "react-redux";

const SocietyRegisterCard = () => {
  const dispatch = useDispatch();

  /*
  {
    "societyName":"Gokuldham society 123",
    "location":"somewhere in mumbai   ",
    "area":20000,
    "name":"bhide master",
    "password":"bhindi123",
    "email":"sk@gmail.com",
    "contact":"1234567890"
  }
  */

  const [societyData, setSocietyData] = useState({
    societyName: "",
    area: 0,
    location: "",
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const handleChange = (e) => {
    setSocietyData({
      ...societyData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(societyData);

    // validation
    if (
      !societyData.societyName ||
      !societyData.area ||
      !societyData.location ||
      !societyData.name ||
      !societyData.email ||
      !societyData.password ||
      !societyData.contact
    ) {
      showToast("Please fill all fields", "error");
      return;
    }

    dispatch(societyRegisterAction(societyData));
  };

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
              name="societyName"
              variant="outlined"
              label="Society Name"
              id="societyName"
              className="rounded-lg"
              // placeholder="Enter society name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <FloatingLabel
              name="area"
              variant="outlined"
              label="Society Area"
              type="number"
              id="area"
              className="rounded-lg"
              onChange={handleChange}
              // placeholder="Enter area"
              required
            />
          </div>
        </div>
        <div className="mt-2">
          <FloatingLabel
            name="location"
            variant="outlined"
            label="Location"
            id="location"
            className="rounded-lg"
            // placeholder="Enter location"
            onChange={handleChange}
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
              name="name"
              variant="outlined"
              label="Secretory name"
              id="name"
              className="rounded-lg"
              // placeholder="Enter secretary name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <FloatingLabel
              name="email"
              variant="outlined"
              label="Secretory email"
              id="email"
              className="rounded-lg"
              // placeholder="name@company.com"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <FloatingLabel
              name="password"
              variant="outlined"
              label="Password"
              id="password"
              className="rounded-lg"
              // placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <FloatingLabel
              name="contact"
              variant="outlined"
              label="Contact number"
              id="contact"
              className="rounded-lg"
              // placeholder="Enter contact number"
              onChange={handleChange}
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
        onClick={handleSubmit}
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
